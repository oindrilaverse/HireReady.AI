"use client";

import { useEffect, useState, useRef } from "react";
import { useCareerStore } from "@/store/careerStore";
import { createClient } from "@/utils/supabase/client";
import { getApiUrl } from "@/lib/utils";

// Shared across all instances to prevent duplicate concurrent API requests
let globalSyncInProgress = false;

export function useAuthSync() {
  const { isSynced, syncedUserId, setSynced, clearStore } = useCareerStore();
  const [user, setUser] = useState<any>(null);
  const [hydrated, setHydrated] = useState(false);
  const supabaseRef = useRef<any>(null);

  if (!supabaseRef.current) {
    supabaseRef.current = createClient();
  }
  const supabase = supabaseRef.current;

  // Ensure Zustand store is fully hydrated from localStorage before checking sync status
  useEffect(() => {
    setHydrated(useCareerStore.persist.hasHydrated());
    const unsub = useCareerStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      const sessionUser = session?.user || null;
      
      if (sessionUser) {
        setUser(sessionUser);
        
        // Sync if not synced yet, or if logged in as a different user
        const needsSync = !isSynced || syncedUserId !== sessionUser.id;
        
        if (needsSync && !globalSyncInProgress) {
          globalSyncInProgress = true;
          try {
            const syncRes = await fetch(getApiUrl("/users/sync"), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                authId: sessionUser.id,
                email: sessionUser.email,
                name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0],
              }),
            });

            if (syncRes.ok) {
              setSynced(true, sessionUser.id);
            }
          } catch (err) {
            console.error("Auth Sync Failed:", err);
          } finally {
            globalSyncInProgress = false;
          }
        }
      } else {
        setUser(null);
        if (isSynced) {
          clearStore();
        }
      }
    }

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      const sessionUser = session?.user || null;
      if (sessionUser) {
        setUser(sessionUser);
        checkUser();
      } else {
        setUser(null);
        if (isSynced) {
          clearStore();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [hydrated, isSynced, syncedUserId]);

  return { user, isSynced: hydrated && isSynced };
}
