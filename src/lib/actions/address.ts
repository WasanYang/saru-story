
'use server';

import { firestore } from '@/firebase/admin';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { collection, addDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';

// Note: This uses the client-side SDK. For a real app, you'd use the Admin SDK 
// in a secure backend environment (like a Cloud Function) to manage data.
// For this prototype, we are performing writes directly from the server component
// for simplicity, but this is NOT a secure practice for production.
import { initializeFirebase } from '@/firebase';

const getClientFirestore = () => {
    return initializeFirebase().firestore;
}

export async function addAddress(userId: string, addressData: any) {
    const db = getClientFirestore();
    const addressesRef = collection(db, 'users', userId, 'addresses');
    
    // If this is the first address, set it as default.
    const snapshot = await getDocs(addressesRef);
    if (snapshot.empty) {
        addressData.isDefault = true;
    } else {
        addressData.isDefault = false;
    }
    
    try {
        await addDoc(addressesRef, addressData);
    } catch(e: any) {
        const permissionError = new FirestorePermissionError({
            path: addressesRef.path,
            operation: 'create',
            requestResourceData: addressData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}

export async function deleteAddress(userId: string, addressId: string) {
    const db = getClientFirestore();
    const addressRef = doc(db, 'users', userId, 'addresses', addressId);
    try {
        await deleteDoc(addressRef);
    } catch (e: any) {
        const permissionError = new FirestorePermissionError({
            path: addressRef.path,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}

export async function setDefaultAddress(userId: string, newDefaultAddressId: string) {
    const db = getClientFirestore();
    const addressesRef = collection(db, 'users', userId, 'addresses');
    const batch = writeBatch(db);

    try {
        // First, find the current default and unset it
        const querySnapshot = await getDocs(addressesRef);
        querySnapshot.forEach(documentSnapshot => {
            const id = documentSnapshot.id;
            const data = documentSnapshot.data();
            if (data.isDefault && id !== newDefaultAddressId) {
                batch.update(doc(db, 'users', userId, 'addresses', id), { isDefault: false });
            }
        });

        // Then, set the new default
        const newDefaultRef = doc(db, 'users', userId, 'addresses', newDefaultAddressId);
        batch.update(newDefaultRef, { isDefault: true });

        await batch.commit();

    } catch (e: any) {
         const permissionError = new FirestorePermissionError({
            path: addressesRef.path,
            operation: 'update',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}
