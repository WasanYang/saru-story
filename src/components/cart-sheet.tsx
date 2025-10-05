'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { getImage } from '@/lib/placeholder-images';
import { useLanguage } from '@/providers/language-provider';

export function CartSheet() {
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const { dictionary } = useLanguage();

  if (!dictionary?.cart) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </div>
          <span className="sr-only">{dictionary.cart.openCart}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>{dictionary.cart.title} ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {cartItems.map((item) => {
                  const itemImage = getImage(item.images[0]);
                  const itemKey = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                  return (
                    <div key={itemKey} className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        {itemImage && (
                          <Image
                            src={itemImage.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            data-ai-hint={itemImage.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dictionary.cart.size}: {item.selectedSize} / {dictionary.cart.color}: {item.selectedColor}
                        </p>
                        <p className="font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(itemKey)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 sm:flex-col sm:items-stretch sm:gap-4">
                <div className="flex justify-between text-lg font-semibold">
                    <span>{dictionary.cart.subtotal}</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground text-center">{dictionary.cart.shippingTaxes}</p>
                <SheetClose asChild>
                    <Button asChild size="lg">
                        <Link href="/checkout">{dictionary.cart.checkout}</Link>
                    </Button>
                </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">{dictionary.cart.empty}</p>
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/products">{dictionary.cart.continueShopping}</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}