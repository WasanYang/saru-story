
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

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const { dictionary } = useLanguage();
  const firestore = useFirestore();
  const { toast } = useToast();

  // Redirect if not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<ProfileFormData>(userProfileRef);

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

  // Update form with user profile data
  useEffect(() => {
    if (userProfile) {
      form.reset(userProfile);
    } else if(user){
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

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
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
  
  if (!user) {
    return null; // Or a loading indicator
  }

  if (!dictionary?.profile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{dictionary.profile.title}</CardTitle>
                <CardDescription>{dictionary.profile.subtitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-lg font-semibold">{dictionary.profile.shippingInfo}</h3>
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
      </div>
    </div>
  );
}

    