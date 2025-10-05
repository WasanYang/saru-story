'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { generateProductDescription } from '@/ai/flows/generate-product-descriptions';

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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productCategory: z.string().min(1, 'Category is required.'),
  productFeatures: z.string().min(1, 'Features are required.'),
  targetAudience: z.string().min(1, 'Target audience is required.'),
  styleKeywords: z.string().min(1, 'Style keywords are required.'),
});

type FormData = z.infer<typeof formSchema>;

export default function GenerateDescriptionPage() {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productCategory: 'clothing',
      productFeatures: '',
      targetAudience: 'women aged 25-40 who value comfort and sustainability',
      styleKeywords: 'minimalist, natural, comfortable, eco-friendly',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateProductDescription(values);
      setGeneratedDescription(result.description);
    } catch (error) {
      console.error('Error generating description:', error);
      setGeneratedDescription('Failed to generate description. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Product Description</CardTitle>
            <CardDescription>Fill in the product details to generate a description with AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="productName" render={({ field }) => (
                  <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input placeholder="e.g., The Essential Muslin Shirt" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="productCategory" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="e.g., Shirts" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="productFeatures" render={({ field }) => (
                  <FormItem><FormLabel>Features</FormLabel><FormControl><Textarea placeholder="e.g., double-gauze organic muslin, soft, breathable, relaxed silhouette" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="targetAudience" render={({ field }) => (
                  <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="styleKeywords" render={({ field }) => (
                  <FormItem><FormLabel>Style Keywords</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></Formian>
                )} />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate Description
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>AI Generated Description</CardTitle>
                <CardDescription>The generated product description will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {isLoading ? (
                    <div className="flex flex-col space-y-3 h-full">
                        <Skeleton className="h-[20px] w-full rounded-md" />
                        <Skeleton className="h-[20px] w-full rounded-md" />
                        <Skeleton className="h-[20px] w-[80%] rounded-md" />
                    </div>
                ) : (
                    <Textarea
                        readOnly
                        value={generatedDescription}
                        className="h-full min-h-[300px] text-base"
                        placeholder="Your generated description will be displayed here."
                    />
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}