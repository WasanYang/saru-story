'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getImage } from '@/lib/placeholder-images';
import { CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLanguage } from '@/providers/language-provider';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const { dictionary } = useLanguage();

  useEffect(() => {
    if(cartCount === 0){
        router.push('/products')
    }
  },[cartCount, router])

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    console.log({ shippingAddress: values, items: cartItems, total: cartTotal });
    alert('Order placed successfully! (Check console for details)');
    clearCart();
    router.push('/');
  }

  if (!dictionary?.checkout) {
    return null;
  }

  if (cartCount === 0) {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold">{dictionary.checkout.emptyCartTitle}</h1>
            <p className="text-muted-foreground">{dictionary.checkout.emptyCartSubtitle}</p>
            <Button asChild>
                <Link href="/products">{dictionary.checkout.startShopping}</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{dictionary.checkout.title}</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">{dictionary.checkout.shippingInfo}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>{dictionary.checkout.fullName}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="address" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>{dictionary.checkout.address}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <div className="grid sm:grid-cols-2 gap-4">
                  <FormField name="city" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>{dictionary.checkout.city}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="postalCode" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>{dictionary.checkout.postalCode}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
              <FormField name="country" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>{dictionary.checkout.country}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <h2 className="text-2xl font-semibold pt-8 pb-4">{dictionary.checkout.paymentMethod}</h2>
              <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4 p-4 border rounded-md bg-secondary/50">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <p className="text-muted-foreground">{dictionary.checkout.paymentNotImplemented}</p>
                    </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                {dictionary.checkout.placeOrder}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="bg-secondary/50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">{dictionary.checkout.orderSummary}</h2>
          <div className="space-y-4">
            {cartItems.map(item => {
                const itemImage = getImage(item.images[0]);
                const itemKey = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                return(
                    <div key={itemKey} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md border bg-background overflow-hidden">
                            {itemImage && <Image src={itemImage.imageUrl} alt={item.name} fill className="object-cover" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{dictionary.checkout.quantity}: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                )
            })}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>{dictionary.checkout.subtotal}</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>{dictionary.checkout.shipping}</p>
              <p>{dictionary.checkout.free}</p>
            </div>
             <div className="flex justify-between">
              <p>{dictionary.checkout.taxes}</p>
              <p>{dictionary.checkout.calculatedAtNextStep}</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-between font-bold text-lg">
            <p>{dictionary.checkout.total}</p>
            <p>${cartTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}