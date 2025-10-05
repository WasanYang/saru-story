
'use client';

import { useRouter } from 'next/navigation';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useUser } from '@/firebase/auth/use-user';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/providers/language-provider';
import { useFirebaseApp } from '@/firebase';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        {...props}
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.244,44,30.034,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    );
}

export default function LoginPage() {
  const { dictionary } = useLanguage();
  const firebaseApp = useFirebaseApp();
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/profile');
    }
  }, [user, router]);

  if (isLoading || user) {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center">
            <Card className="w-full max-w-sm"><CardHeader><CardTitle className="text-center">Loading...</CardTitle></CardHeader></Card>
        </div>
    );
  }

  const handleGoogleSignIn = async () => {
    if (!firebaseApp) return;
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error) {
      console.error('Error signing in with Google', error);
      alert('Failed to sign in with Google.');
    }
  };

  if (!dictionary?.login) {
    return null;
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{dictionary.login.title}</CardTitle>
          <CardDescription>{dictionary.login.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
              <GoogleIcon className="mr-2 h-5 w-5" />
              {dictionary.login.signInWithGoogle}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
