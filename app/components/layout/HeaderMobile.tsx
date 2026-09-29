import {NavLink} from 'react-router';
import type { CartApiQueryFragment, HeaderQuery } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
// import { CartButton } from './CartButton';

type HeaderMobileProps = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
};

export function HeaderMobile({header, cart}: HeaderMobileProps) {
  const {shop} = header;
  const {open} = useAside();

  return (
    <header className="pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      {/* Announcement bar */}
      <div className="bg-primary-container text-on-primary text-center py-space-2xs px-margin-mobile flex items-center justify-center gap-space-xs">
        <span aria-hidden className="icon text-[14px] text-secondary-container"> bolt </span>
        <p className="font-label-sm text-label-sm tracking-wide uppercase font-semibold text-primary-fixed">BOGO 50% OFF SITEWIDE • FAST 15-MIN ONSET</p>
      </div>
      <div className="h-16 px-margin-mobile flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <button type='button' aria-label="Open menu"
           onClick={() => open('mobile')}
           className="w-11 h-11 flex items-center justify-center text-primary-container active:scale-95 transition-transform"
          >
            <span aria-hidden className="icon text-[24px]"> menu </span>
          </button>
          <NavLink
            to="/"
            end
            prefetch="intent"
            className="flex items-center gap-space-2xs"
          >
            <span className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed">
              <span
                aria-hidden="true"
                className="icon text-[16px]"
              >
                spa
              </span>
            </span>
            <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary-container">
              {shop.name}
            </span>
          </NavLink>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => open('search')}
            className="w-11 h-11 flex items-center justify-center text-primary-container active:scale-95 transition-transform"
          >
            <span
              aria-hidden="true"
              className="icon text-[22px]"
            >
              search
            </span>
          </button>

          {/* <CartButton cart={cart} variant="mobile" /> */}

          <NavLink
            to="/account"
            prefetch="intent"
            aria-label="Account"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-2xs"
          >
            <span
              aria-hidden="true"
              className="icon text-on-primary text-[18px]"
            >
              person
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  )

}