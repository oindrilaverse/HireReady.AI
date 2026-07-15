import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Protected routes list
  const protectedRoutes = [
    '/dashboard',
    '/analyzer',
    '/builder',
    '/cover-letter',
    '/interview',
    '/job-match',
    '/scan-history',
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  // Optimization 1: Bypassing public landing pages, assets, and metadata crawlers
  if (!isProtectedRoute && !isAuthRoute) {
    return response;
  }

  let user = null;
  const cookieName = 'sb-hireready-auth-token';

  // Optimization 2: Only attempt token resolution and getUser fetches if auth cookies actually exist.
  // This prevents anonymous or unauthenticated users from causing network timeouts.
  const authCookieExists = request.cookies.getAll().some((c) =>
    c.name.startsWith(cookieName)
  );

  if (authCookieExists) {
    try {
      const authCookie = request.cookies.getAll().find((c) => c.name.startsWith(cookieName))?.value;
      if (authCookie) {
        const tokenData = JSON.parse(decodeURIComponent(authCookie));
        const accessToken = Array.isArray(tokenData) ? tokenData[0] : (tokenData.access_token || tokenData);
        if (accessToken) {
          const payloadPart = accessToken.split('.')[1];
          if (payloadPart) {
            // Decode base64url safely using global atob
            const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            user = {
              id: payload.sub,
              email: payload.email,
              user_metadata: payload.user_metadata || {},
            };
          }
        }
      }
    } catch (cookieErr) {
      console.error("Cookie fallback parsing failed:", cookieErr);
    }

    if (!user) {
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              get(name: string) {
                return request.cookies.get(name)?.value;
              },
              set(name: string, value: string, options: CookieOptions) {
                request.cookies.set({
                  name,
                  value,
                  ...options,
                });
                response = NextResponse.next({
                  request: {
                    headers: request.headers,
                  },
                });
                response.cookies.set({
                  name,
                  value,
                  ...options,
                });
              },
              remove(name: string, options: CookieOptions) {
                request.cookies.set({
                  name,
                  value: '',
                  ...options,
                });
                response = NextResponse.next({
                  request: {
                    headers: request.headers,
                  },
                });
                response.cookies.set({
                  name,
                  value: '',
                  ...options,
                });
              },
            },
          }
        );
        const { data } = await supabase.auth.getUser();
        user = data?.user;
      } catch (err) {
        console.warn("getUser failed (possibly offline):", err);
      }
    }
  }

  // Redirect to login if accessing protected routes without session
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
      });
    });
    return redirectResponse;
  }

  // Redirect to dashboard if accessing login/signup with session
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
      });
    });
    return redirectResponse;
  }

  return response;
}
