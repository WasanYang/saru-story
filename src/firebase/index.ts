
import {
  initializeApp,
  getApp,
  getApps,
  FirebaseApp,
} from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

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
  const firebaseConfig = {
    projectId: 'studio-4977338751-3a7b4',
    appId: '1:113183137665:web:f170f64c8cce7b948c5280',
    storageBucket: 'studio-4977338751-3a7b4.appspot.com',
    apiKey: 'AIzaSyAE-7S0LMMXwJRJb_Y-cLM2QlpECj5RhAU',
    authDomain: 'studio-4977338751-3a7b4.firebaseapp.com',
    messagingSenderId: '113183137665',
    measurementId: 'G-7P4C02513P'
  };

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
