
import {
  initializeApp,
  getApp,
  getApps,
  FirebaseApp,
} from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import {
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';

export function initializeFirebase(): {
  firebaseApp: FirebaseApp,
  auth: Auth,
  firestore: Firestore,
} {
  const firebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

export * from './provider';
export {
  useCollection,
  useDoc,
  useUser,
  useFirebaseApp,
  useFirestore,
  useAuth,
};

    