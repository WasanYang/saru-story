
'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../provider';
import { useEffect, useState } from 'react';

// A workaround for https://github.com/CSFrequency/react-firebase-hooks/issues/224
export function useUser() {
  const auth = useAuth();
  const [user, loading, error] = useAuthState(auth ?? undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  return {
    data: user,
    isLoading: !isReady || loading,
    error,
  };
}

    