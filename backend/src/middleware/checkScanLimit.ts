import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';

/**
 * Middleware: checkScanLimit
 *
 * Blocks free-tier users who have reached their 3-scan limit.
 * Expects the authenticated user's ID to be present in:
 *   - req.body.authId  (multipart/form-data uploads)
 *   - req.body.userId  (JSON body fallback)
 *
 * If the user is on the 'free' tier and scan_count >= 3,
 * responds with 403 and stops the request chain.
 * Otherwise calls next() to continue to the route handler.
 */
export async function checkScanLimit(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const userId: string | undefined = req.body.authId || req.body.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { message: 'Unauthorized: no user ID provided', code: 'UNAUTHORIZED' },
    });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('scan_count, tier')
      .eq('auth_id', userId)   // matches the auth_id column used in the rest of the codebase
      .single();

    if (error || !user) {
      // If we can't find the user, fail open — let the route handle it
      return next();
    }

    const tier: string = user.tier ?? 'free';
    const scanCount: number = user.scan_count ?? 0;

    if (tier === 'free' && scanCount >= 3) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Scan limit reached. Upgrade to Pro for unlimited scans.',
          code: 'SCAN_LIMIT_REACHED',
        },
      });
    }

    // Within limit — continue
    return next();
  } catch (err) {
    console.error('[checkScanLimit] Unexpected error:', err);
    // Fail open so a middleware error never blocks a paying user
    return next();
  }
}
