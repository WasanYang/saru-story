
'use server';

import { initializeFirebase } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import type { CartItem } from '@/lib/types';
import { collection, writeBatch, serverTimestamp, doc } from 'firebase/firestore';

const getClientFirestore = () => {
    return initializeFirebase().firestore;
}

type OrderPayload = {
    shippingAddress: any;
    items: CartItem[];
    total: number;
    paymentMethod: string;
}

export async function createOrder(userId: string, payload: OrderPayload) {
    const db = getClientFirestore();
    const batch = writeBatch(db);

    const orderRef = doc(collection(db, 'users', userId, 'orders'));

    try {
        // 1. Create the main order document
        batch.set(orderRef, {
            orderDate: serverTimestamp(),
            total: payload.total,
            status: 'Pending',
            shippingAddress: payload.shippingAddress,
            paymentMethod: payload.paymentMethod
        });

        // 2. Create a document for each item in the order
        payload.items.forEach(item => {
            const itemRef = doc(collection(db, orderRef.path, 'items'));
            const { id: cartId, quantity, selectedColor, selectedSize, ...productData } = item;
            batch.set(itemRef, {
                ...productData,
                productId: cartId,
                quantity,
                selectedColor,
                selectedSize,
            });
        });

        await batch.commit();
        
        return { orderId: orderRef.id };

    } catch (e: any) {
        const permissionError = new FirestorePermissionError({
            path: `users/${userId}/orders`,
            operation: 'create',
            requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}
