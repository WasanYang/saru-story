
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/providers/language-provider';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

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
import { errorEmitter } from '@/firebase/error-emitter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { FirestorePermissionError } from '@/firebase/errors';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function ProfileForm() {
  const { data: user } = useUser();
  const { dictionary } = useLanguage();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
  const { data: userProfile } = useDoc<ProfileFormData>(userProfileRef);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    // Only reset the form if it hasn't been touched by the user yet.
    // This prevents overwriting user input or causing a loop on save.
    if (userProfile && !form.formState.isDirty) {
      form.reset(userProfile);
    } else if(user && !form.formState.isDirty){
        form.reset({
            fullName: user.displayName || '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
        })
    }
  }, [userProfile, user, form]);

  async function onSubmit(values: ProfileFormData) {
    if (!userProfileRef) return;
    
    setDoc(userProfileRef, values, { merge: true })
      .then(() => {
        toast({
          title: dictionary.profile.changesSaved,
        });
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userProfileRef.path,
          operation: 'update',
          requestResourceData: values,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: dictionary.profile.errorSaving,
          description: permissionError.toString(),
        });
      });
  }

  if (!dictionary?.profile) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.profile.shippingInfo}</CardTitle>
      </CardHeader>
      <CardContent>
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
              {dictionary.profile.saveChanges}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function OrderHistory() {
    const { dictionary } = useLanguage();
    // Dummy data for now
    const orders = [
        { id: 'SARU1001', date: '2024-05-20', total: 163.00, status: 'Delivered' },
        { id: 'SARU1002', date: '2024-06-15', total: 75.00, status: 'Shipped' },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>{dictionary.profile.orderHistory}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map(order => (
                         <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                            <div>
                                <p className="font-semibold text-primary">{dictionary.profile.order} #{order.id}</p>
                                <p className="text-sm text-muted-foreground">{dictionary.profile.placedOn} {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                               <p className="font-semibold">${order.total.toFixed(2)}</p>
                               <p className="text-sm text-muted-foreground">{order.status}</p>
                            </div>
                             <Button asChild variant="outline" size="sm">
                                <Link href={`/profile/orders/${order.id}`}>{dictionary.profile.viewDetails}</Link>
                            </Button>
                        </div>
                    ))}
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

            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">{dictionary.profile.title}</TabsTrigger>
                    <TabsTrigger value="orders">{dictionary.profile.orderHistory}</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="orders" className="mt-6">
                    <OrderHistory />
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
