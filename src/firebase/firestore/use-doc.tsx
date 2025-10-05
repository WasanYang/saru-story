
'use client';

import { useDocument } from 'react-firebase-hooks/firestore';
import type { DocumentReference } from 'firebase/firestore';

export function useDoc<T>(ref: DocumentReference<T> | null) {
  const [snapshot, loading, error] = useDocument(ref);

  const data = snapshot?.exists() ? snapshot.data() : undefined;

  return { data, loading, error };
}

    