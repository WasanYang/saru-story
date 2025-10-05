
'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
import { doc, collection, type DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    selectedSize: string;
    selectedColor: string;
}

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id as string;
    const { data: user } = useUser();
    const firestore = useFirestore();

    const orderRef = user && firestore ? doc(firestore, 'users', user.uid, 'orders', orderId) : null;
    const { data: order, loading: orderLoading } = useDoc(orderRef);

    const itemsRef = user && firestore ? collection(firestore, 'users', user.uid, 'orders', orderId, 'items') : null;
    const { data: items, loading: itemsLoading } = useCollection<OrderItem>(itemsRef);

    if (orderLoading || itemsLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-10 w-36 mb-4" />
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <Skeleton className="h-4 w-40 mb-1" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <Skeleton className="h-4 w-full mb-1" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                            <Separator className="my-8" />
                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="space-y-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!order) {
        notFound();
    }

    const subtotal = items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const typedOrder = order as DocumentData;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/profile/orders">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Order #{orderId}</CardTitle>
                        <CardDescription>
                            Placed on {new Date(typedOrder.orderDate.toDate()).toLocaleDateString()} | Status: {typedOrder.status}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                                <div className="text-muted-foreground">
                                    <p>{typedOrder.shippingAddress.fullName}</p>
                                    <p>{typedOrder.shippingAddress.address}</p>
                                    <p>{typedOrder.shippingAddress.city}, {typedOrder.shippingAddress.postalCode}</p>
                                    <p>{typedOrder.shippingAddress.country}</p>
                                </div>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
                                <div className="space-y-2 text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes</span>
                                        <span>$0.00</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-semibold text-foreground">
                                        <span>Total</span>
                                        <span>${typedOrder.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />
                        
                        <h3 className="font-semibold text-lg mb-4">Items in this order</h3>
                        <div className="space-y-4">
                            {items && items.map(item => {
                                const itemImage = getImage(item.images[0]);
                                return (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 rounded-md border bg-background overflow-hidden">
                                        {itemImage && <Image src={itemImage.imageUrl} alt={item.name} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Size: {item.selectedSize} / Color: {item.selectedColor}
                                        </p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            )})}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
