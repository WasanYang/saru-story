
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
import { CreditCard, ShoppingBag, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { createOrder } from '@/lib/actions/order';
import { useToast } from '@/hooks/use-toast';
import { addAddress } from '@/lib/actions/address';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface Address extends AddressFormData {
  id: string;
  isDefault?: boolean;
}

function PaypalIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.328 20.352c.42.922.992 1.223 1.888 1.223h3.584c.484 0 .914-.336 1.05-.795l.183-1.099c.12-.72.63-1.18 1.24-1.347l.135-.034c.83-.21 1.157-1.054.89-1.848-.282-.83-.873-1.047-1.748-.832l-.128.032c-1.12.28-1.928-1.008-1.5-2.07l1.09-3.264.12-.357c.27-.803.854-1.02 1.73-.808l.128.032c1.12.28 2.219-.482 2.62-1.503.22-.57.17-1.19-.13-1.72-.4-.704-1.1-1.12-1.92-1.12h-3.41c-.51 0-.96.36-1.07.85l-.2 1.15c-.14.79-.7 1.29-1.37 1.48l-.13.03c-.8.19-1.17-.6-1.44-1.42l-.21-.63c-.3-1.02-1.05-1.57-2-1.57h-3.41c-1.28 0-2.41 1.05-2.61 2.31l-1.09 6.55c-.2 1.2.6 2.35 1.8 2.35h3.04zm11.39-12.27c.47 0 .88.24 1.12.63.15.26.17.56.07.84-.25.72-1.01 1.23-1.8 1.02l-3.3-1.1c-.5-.17-.83-.6-.83-1.14v-.03c0-.52.36-.95.86-1.06l3.88-1.1c.06-.02.13-.02.19-.02.48 0 .9.24 1.13.63.15.25.17.56.07.84-.25.72-1.01 1.23-1.8 1.02l-3.3-1.1c-.5-.16-.83-.6-.83-1.13v-.03c0-.52.36-.95.86-1.06l3.88-1.1c.06-.01.13-.02.19-.02.48 0 .89.24 1.13.63.14.25.17.55.07.83-.25.72-1.01 1.23-1.8 1.02L12.9 6.8c-.8.2-1.56-.32-1.8-1.02-.15-.42.06-.88.47-1.15.4-.26.88-.26 1.28 0l5.82 1.94c1.12.38 1.8 1.45 1.5 2.57-.3 1.13-1.39 1.8-2.5 1.5l-5.83-1.94c.02.01-.01 0 0 0z" fill="#0070BA"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.328 3.512c.41.922.982 1.223 1.878 1.223h3.584c.484 0 .914-.336 1.05-.795l.183-1.099c.12-.72.63-1.18 1.24-1.347l.135-.034c.83-.21 1.157-1.054.89-1.848-.282-.83-.873-1.047-1.748-.832l-.128.032c-1.12.28-1.928-1.008-1.5-2.07l1.09-3.264.12-.357c.27-.803.854-1.02 1.73-.808l.128.032c1.12.28 2.219-.482 2.62-1.503.22-.57.17-1.19-.13-1.72-.4-.704-1.1-1.12-1.92-1.12h-3.41c-.51 0-.96.36-1.07.85l-.2 1.15c-.14.79-.7 1.29-1.37 1.48l-.13.03c-.8.19-1.17-.6-1.44-1.42l-.21-.63c-.3-1.02-1.05-1.57-2-1.57h-3.41c-1.28 0-2.41 1.05-2.61 2.31l-1.09 6.55c-.2 1.2.6 2.35 1.8 2.35h3.04z" fill="#0094DE"/>
            <path d="M12.92 6.81c-.8.2-1.56-.32-1.8-1.02-.15-.42.06-.88.47-1.15.4-.26.88-.26 1.28 0l5.82 1.94c1.12.38 1.8 1.45 1.5 2.57-.3 1.13-1.39 1.8-2.5 1.5l-5.82-1.94z" fill="#002069"/>
        </svg>
    )
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const { dictionary } = useLanguage();
  const { data: user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(undefined);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const addressesRef = user && firestore ? collection(firestore, 'users', user.uid, 'addresses') : null;
  const { data: addresses, loading: addressesLoading } = useCollection<Address>(addressesRef);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    if (cartCount === 0 && !isSubmitting) {
      router.push('/products');
    }
  }, [cartCount, router, isSubmitting]);
  
  useEffect(() => {
      if (addresses && !selectedAddressId) {
          const defaultAddress = addresses.find(a => a.isDefault);
          if (defaultAddress) {
              setSelectedAddressId(defaultAddress.id);
          } else if (addresses.length > 0) {
              setSelectedAddressId(addresses[0].id)
          } else {
            setShowNewAddressForm(true);
          }
      }
      if(addresses && addresses.length === 0){
        setShowNewAddressForm(true);
      }
  }, [addresses, selectedAddressId]);

  async function onOrderSubmit(values: AddressFormData) {
    if (!user) {
        toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to place an order.' });
        return;
    }

    let shippingAddress: Omit<Address, 'id'> | AddressFormData = values;

    if (showNewAddressForm) {
        // Optionally save the new address to the user's profile
        try {
            await addAddress(user.uid, values);
        } catch (error) {
            console.error("Failed to save new address:", error);
            // Decide if this should block the order or just be a silent failure
        }
    } else {
        const foundAddress = addresses?.find(a => a.id === selectedAddressId);
        if (!foundAddress) {
            toast({ variant: 'destructive', title: 'Address Error', description: 'Please select a valid shipping address.' });
            return;
        }
        shippingAddress = foundAddress;
    }
    
    setIsSubmitting(true);

    try {
        await createOrder(user.uid, {
            shippingAddress,
            items: cartItems,
            total: cartTotal,
            paymentMethod,
        });

        toast({
            title: 'Order Placed!',
            description: 'Your order has been successfully placed.',
        });
        clearCart();
        router.push('/profile/orders');
    } catch (error: any) {
        console.error('Failed to create order:', error);
        toast({
            variant: 'destructive',
            title: 'Order Failed',
            description: error.message || 'There was an error placing your order.',
        });
    } finally {
        setIsSubmitting(false);
    }
}


  if (!dictionary?.checkout) {
    return null;
  }

  if (cartCount === 0 && !isSubmitting) {
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

          {addressesLoading && (
              <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
              </div>
          )}

          {!addressesLoading && addresses && addresses.length > 0 && (
            <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium">{dictionary.checkout.selectAddress}</h3>
                <RadioGroup value={selectedAddressId} onValueChange={(id) => {
                    setSelectedAddressId(id)
                    setShowNewAddressForm(false)
                }} className="gap-4">
                    {addresses.map((addr) => (
                        <Label key={addr.id} htmlFor={addr.id} className={cn("flex flex-col p-4 border rounded-lg gap-2 cursor-pointer hover:bg-secondary/50", { "border-primary ring-2 ring-primary": selectedAddressId === addr.id && !showNewAddressForm })}>
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value={addr.id} id={addr.id} />
                                <div className="flex-1">
                                    <p className="font-semibold">{addr.fullName} {addr.isDefault && <span className="text-xs font-normal text-primary">({dictionary.profile.default})</span>}</p>
                                    <p className="text-sm text-muted-foreground">{addr.address}, {addr.city}, {addr.postalCode}, {addr.country}</p>
                                </div>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 border-t"></div>
                    <span className="text-muted-foreground text-sm">{dictionary.checkout.or}</span>
                    <div className="flex-1 border-t"></div>
                </div>

            </div>
          )}

          {!showNewAddressForm && addresses && addresses.length > 0 && (
             <Button variant="outline" className="w-full" onClick={() => {
                setShowNewAddressForm(true);
                setSelectedAddressId(undefined);
            }}>
                 <PlusCircle className="mr-2 h-4 w-4" />
                 {dictionary.checkout.addNewAddress}
             </Button>
          )}

          {(showNewAddressForm || (addresses && addresses.length === 0)) && (
            <Form {...form}>
              <form className="space-y-4">
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
              </form>
            </Form>
          )}

          <h2 className="text-2xl font-semibold pt-12 pb-4">{dictionary.checkout.paymentMethod}</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <Label htmlFor="payment-card" className={cn("p-4 border rounded-lg cursor-pointer hover:bg-secondary/50", {"border-primary ring-2 ring-primary": paymentMethod === 'card'})}>
                  <div className="flex items-center gap-4">
                      <RadioGroupItem value="card" id="payment-card" />
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">{dictionary.checkout.creditCard}</span>
                  </div>
              </Label>
              <Label htmlFor="payment-paypal" className={cn("p-4 border rounded-lg cursor-pointer hover:bg-secondary/50", {"border-primary ring-2 ring-primary": paymentMethod === 'paypal'})}>
                  <div className="flex items-center gap-4">
                      <RadioGroupItem value="paypal" id="payment-paypal" />
                      <PaypalIcon className="h-6 w-6" />
                      <span className="font-semibold">PayPal</span>
                  </div>
              </Label>
          </RadioGroup>

          {paymentMethod === 'card' && (
              <Card className="mt-4">
                  <CardContent className="pt-6 space-y-4">
                       <div className="space-y-1">
                           <Label htmlFor="card-number">{dictionary.checkout.cardNumber}</Label>
                           <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="expiry-date">{dictionary.checkout.expiryDate}</Label>
                                <Input id="expiry-date" placeholder="MM / YY" />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor="cvc">{dictionary.checkout.cvc}</Label>
                                <Input id="cvc" placeholder="CVC" />
                            </div>
                       </div>
                  </CardContent>
              </Card>
          )}

          <Button onClick={form.handleSubmit(onOrderSubmit)} size="lg" className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {dictionary.checkout.placeOrder}
          </Button>
        </div>
        
        <div className="bg-secondary/50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">{dictionary.checkout.orderSummary}</h2>
          <div className="space-y-4">
            {cartItems.map(item => {
                const itemImage = getImage(item.images[0]);
                const itemKey = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                return (
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
