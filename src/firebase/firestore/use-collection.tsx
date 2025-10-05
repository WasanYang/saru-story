
'use client';

import { useCollection as useReactFirebaseCollection } from 'react-firebase-hooks/firestore';
import type { Query } from 'firebase/firestore';

export function useCollection<T>(query: Query<T> | null) {
  const [snapshot, loading, error] = useReactFirebaseCollection(query);

  const data = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { data, loading, error };
}

    