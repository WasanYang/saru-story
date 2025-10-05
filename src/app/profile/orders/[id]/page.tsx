
'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';

// This is dummy data. In a real app, you'd fetch this from your database.
const getOrderById = (id: string) => {
    const orders = [
        { 
            id: 'SARU1001', 
            date: '2024-05-20', 
            total: 163.00, 
            status: 'Delivered',
            shippingAddress: {
                fullName: 'Jane Doe',
                address: '123 Blossom St',
                city: 'Springfield',
                postalCode: '12345',
                country: 'USA'
            },
            items: [
                { id: 'saru-shirt-olive', name: 'The Essential Muslin Shirt', price: 68.0, quantity: 1, images:['product-shirt-1'], selectedSize: 'M', selectedColor: 'Olive' },
                { id: 'saru-dress-sienna', name: 'The Flowy Muslin Dress', price: 95.0, quantity: 1, images:['product-dress-1'], selectedSize: 'S', selectedColor: 'Sienna' }
            ]
        },
        { 
            id: 'SARU1002', 
            date: '2024-06-15', 
            total: 75.00, 
            status: 'Shipped',
            shippingAddress: {
                fullName: 'Jane Doe',
                address: '123 Blossom St',
                city: 'Springfield',
                postalCode: '12345',
                country: 'USA'
            },
            items: [
                { id: 'saru-pants-white', name: 'The Relaxed Muslin Pants', price: 75.0, quantity: 1, images:['product-pants-1'], selectedSize: 'L', selectedColor: 'Off-White' }
            ]
        },
    ];
    return orders.find(order => order.id === id);
}


export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id as string;
    const order = getOrderById(orderId);

    if (!order) {
        notFound();
    }

    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/profile">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Profile
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Order #{order.id}</CardTitle>
                        <CardDescription>
                            Placed on {new Date(order.date).toLocaleDateString()} | Status: {order.status}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                                <div className="text-muted-foreground">
                                    <p>{order.shippingAddress.fullName}</p>
                                    <p>{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                    <p>{order.shippingAddress.country}</p>
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
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />
                        
                        <h3 className="font-semibold text-lg mb-4">Items in this order</h3>
                        <div className="space-y-4">
                            {order.items.map(item => {
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
