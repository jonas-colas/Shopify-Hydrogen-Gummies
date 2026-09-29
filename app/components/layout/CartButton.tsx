import {Suspense} from 'react';
import {Await} from 'react-router';
import { type CartViewPayload, type OptimisticCart, Money, useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

type CartButtonVariant = 'desktop' | 'mobile' | 'pill';

type CartButtonProps = {
  cart: Promise<CartApiQueryFragment | null>;
  variant: CartButtonVariant;
};

export function CartButton({cart, variant}: CartButtonProps) {
  return (
    <Suspense fallback={<CartLink cart={null} variant={variant} />}>
      <Await resolve={cart} errorElement={<CartLink cart={null} variant={variant} />}>
        {(resolvedCart) => (<OptimisticCartLink cart={resolvedCart} variant={variant} />)}
      </Await>
    </Suspense>
  );
}

function OptimisticCartLink({cart, variant}: {cart: CartApiQueryFragment | null; variant: CartButtonVariant}) {

  const optimisticCart = useOptimisticCart(cart);
  return <CartLink cart={optimisticCart} variant={variant} />;
}

function CartLink({cart, variant}: {cart: OptimisticCart<CartApiQueryFragment | null> | null; variant: CartButtonVariant}) {
  const {open} = useAside();
  const {publish, shop, cart: analyticsCart, prevCart} = useAnalytics();
  const count = cart?.totalQuantity ?? 0;
  const total = cart?.cost?.totalAmount;

  function openCart(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    open('cart');
    publish('cart_viewed', {
      cart: analyticsCart,
      prevCart,
      shop,
      url: window.location.href || '',
    } as CartViewPayload);
  }

  if (variant === 'pill') {
    return (
      <a
        href="/cart"
        onClick={openCart}
        aria-label={`Cart, ${count} items`}
        className="flex items-center justify-center gap-space-2xs h-11 px-space-md rounded-full bg-primary-container text-primary-fixed shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] active:scale-95 transition-transform"
      >
       <span aria-hidden="true" className="icon text-[20px] text-secondary-fixed">shopping_bag</span>
        <span className="font-label-md text-label-md font-semibold text-on-primary">
          {count > 0 && total ? <Money data={total} /> : 'Cart'}
        </span>
      </a>
    )
  }
  
  const isDesktop = variant === 'desktop';
  
  return (
    <a
      href="/cart"
      onClick={openCart}
      aria-label={`Cart, ${count} items`}
      className={
        isDesktop
          ? 'relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center'
          : 'relative w-11 h-11 flex items-center justify-center text-primary-container active:scale-95 transition-transform'
      }
    >
      <span aria-hidden="true" className="icon text-[22px]">shopping_bag</span>
      {count > 0 && (
        <span 
          aria-hidden="true"
          className={
            isDesktop
              ? 'absolute -top-1 -right-1 bg-secondary-container text-on-primary font-label-sm text-label-sm w-5 h-5 rounded-full flex items-center justify-center font-bold'
              : 'absolute top-1.5 right-1.5 w-4 h-4 bg-secondary-container text-on-secondary rounded-full font-label-sm text-label-sm flex items-center justify-center font-bold'
          }
        >
          {count}
        </span>
      )}
    </a>
  );
}
