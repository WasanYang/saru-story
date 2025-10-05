
'use client';

import { useMemo, type ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    return { firebaseApp, auth, firestore };
  }, []);

  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}

    