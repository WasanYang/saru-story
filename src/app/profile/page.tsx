
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/providers/language-provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { collection, doc, addDoc, deleteDoc, writeBatch, Timestamp, DocumentData, query, orderBy } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Trash2, Home, Star } from 'lucide-react';
import { addAddress, deleteAddress, setDefaultAddress } from '@/lib/actions/address';

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

function AddressForm({ onSave }: { onSave: () => void }) {
    const { data: user } = useUser();
    const { toast } = useToast();
    const { dictionary } = useLanguage();

    const form = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: user?.displayName || '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
    });

    async function onSubmit(values: AddressFormData) {
        if (!user) return;
        try {
            await addAddress(user.uid, values);
            toast({ title: dictionary.profile.addressAdded });
            form.reset();
            onSave();
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: dictionary.profile.errorSaving,
                description: e.message,
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField name="fullName" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>{dictionary.profile.fullName}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="address" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>{dictionary.profile.address}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField name="city" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>{dictionary.profile.city}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="postalCode" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>{dictionary.profile.postalCode}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField name="country" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>{dictionary.profile.country}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {dictionary.profile.saveAddress}
                </Button>
            </form>
        </Form>
    );
}

function AddressManagement() {
    const { data: user } = useUser();
    const firestore = useFirestore();
    const { dictionary } = useLanguage();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const addressesRef = user && firestore ? collection(firestore, 'users', user.uid, 'addresses') : null;
    const { data: addresses, loading, error } = useCollection<Address>(addressesRef);

    const handleDelete = async (addressId: string) => {
        if (!user) return;
        if (confirm(dictionary.profile.confirmDeleteAddress)) {
            try {
                await deleteAddress(user.uid, addressId);
                toast({ title: dictionary.profile.addressDeleted });
            } catch (e: any) {
                toast({
                    variant: 'destructive',
                    title: dictionary.profile.errorDeleting,
                    description: e.message,
                });
            }
        }
    };
    
    const handleSetDefault = async (addressId: string) => {
        if(!user || !addresses) return;
        try {
            await setDefaultAddress(user.uid, addressId);
            toast({ title: dictionary.profile.defaultAddressSet });
        } catch (e: any) {
             toast({
                variant: 'destructive',
                title: dictionary.profile.errorSettingDefault,
                description: e.message,
            });
        }
    }

    if (loading) {
        return <Skeleton className="h-48 w-full" />
    }

    if (error) {
        return <p className="text-destructive">{dictionary.profile.errorLoadingAddresses}: {error.message}</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{dictionary.profile.shippingAddresses}</CardTitle>
                <CardDescription>{dictionary.profile.manageShippingAddresses}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {addresses && addresses.map(addr => (
                    <div key={addr.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-4">
                             <Home className="h-6 w-6 text-muted-foreground"/>
                             <div>
                                <p className="font-semibold">{addr.fullName} {addr.isDefault && <span className="text-xs font-normal text-primary">({dictionary.profile.default})</span>}</p>
                                <p className="text-sm text-muted-foreground">{addr.address}, {addr.city}, {addr.postalCode}, {addr.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!addr.isDefault && (
                                <Button variant="ghost" size="icon" onClick={() => handleSetDefault(addr.id)}>
                                    <Star className="h-5 w-5"/>
                                    <span className="sr-only">{dictionary.profile.setAsDefault}</span>
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(addr.id)}>
                                <Trash2 className="h-5 w-5" />
                                <span className="sr-only">{dictionary.profile.deleteAddress}</span>
                            </Button>
                        </div>
                    </div>
                ))}

                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {dictionary.profile.addNewAddress}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{dictionary.profile.addNewAddress}</DialogTitle>
                        </DialogHeader>
                        <AddressForm onSave={() => setIsFormOpen(false)} />
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

function OrderHistory() {
    const { dictionary } = useLanguage();
    const { data: user } = useUser();
    const firestore = useFirestore();

    const ordersQuery = user && firestore 
        ? query(collection(firestore, 'users', user.uid, 'orders'), orderBy('orderDate', 'desc'))
        : null;
        
    const { data: orders, loading, error } = useCollection(ordersQuery);

    if (loading) {
        return (
            <Card>
                <CardHeader><CardTitle>{dictionary.profile.orderHistory}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return <p className="text-destructive">Error loading orders: {error.message}</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{dictionary.profile.orderHistory}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders && orders.length > 0 ? orders.map(order => {
                        const typedOrder = order as DocumentData;
                        return (
                         <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                            <div>
                                <p className="font-semibold text-primary">{dictionary.profile.order} #{order.id}</p>
                                <p className="text-sm text-muted-foreground">{dictionary.profile.placedOn} {new Date(typedOrder.orderDate.toDate()).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                               <p className="font-semibold">${typedOrder.total.toFixed(2)}</p>
                               <p className="text-sm text-muted-foreground">{typedOrder.status}</p>
                            </div>
                             <Button asChild variant="outline" size="sm">
                                <Link href={`/profile/orders/${order.id}`}>{dictionary.profile.viewDetails}</Link>
                            </Button>
                        </div>
                    )}) : (
                        <p className="text-muted-foreground">You have no orders yet.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const { dictionary } = useLanguage();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div>
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  if (!dictionary?.profile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user.displayName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="addresses">{dictionary.profile.addresses}</TabsTrigger>
                    <TabsTrigger value="orders">{dictionary.profile.orderHistory}</TabsTrigger>
                </TabsList>
                <TabsContent value="addresses" className="mt-6">
                    <AddressManagement />
                </TabsContent>
                <TabsContent value="orders" className="mt-6">
                    <OrderHistory />
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
