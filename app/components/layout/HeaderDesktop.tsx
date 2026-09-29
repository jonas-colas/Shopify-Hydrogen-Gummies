import {Form, NavLink} from 'react-router';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartButton} from './CartButton';

type HeaderDesktopProps = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  publicStoreDomain: string;
};

export function HeaderDesktop({header, cart, publicStoreDomain}: HeaderDesktopProps) {
  const {shop, menu} = header;
  const {open} = useAside();

  return (
    <header className="bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Announcement bar */}
      <div className="bg-primary-container text-on-primary py-space-xs px-margin-mobile lg:px-margin text-center font-scientific-code text-scientific-code tracking-wider uppercase flex items-center justify-center gap-space-xs">
        <span aria-hidden="true" className="icon text-[16px] text-secondary-container">bolt</span>
        <span>BOGO 50% OFF SITEWIDE • FAST 15-MIN ABSORPTION • FREE DISCREET SHIPPING ON $50+</span>
        {/* <span>Free shipping on orders over $50</span> */}
      </div>
      <div className="h-20 max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          {/* Below 1280px the pill menu is hidden, so open the menu drawer */}
          <button 
            type="button"
            aria-label="Open menu"
            onClick={() => open('mobile')}
            className="xl:hidden p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
          >
            <span aria-hidden="true" className="icon text-[24px]"> menu </span>
          </button>
          <NavLink to="/" end prefetch="intent" className="flex items-center gap-space-xs group">
            <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md tracking-tight shadow-md group-hover:scale-105 transition-transform">
              {shop?.name?.charAt(0).toUpperCase()}
            </span>
            <span className="font-headline-md text-headline-md tracking-widest text-primary uppercase font-bold">
              {shop.name}
            </span>
          </NavLink>
          <nav
            aria-label="Main"
            className="hidden xl:flex items-center gap-space-2xs p-space-2xs bg-surface-container-low/60 rounded-full"
          >
            {menu?.items.map((item) => {
              if(!item.url) return null;
              return (
                <NavLink 
                  key={item.id}
                  to={toRelativeUrl(item.url, shop.primaryDomain.url, publicStoreDomain)}
                  end
                  prefetch='intent'
                  className={({isActive}) => 
                    `px-space-md py-space-xs font-label-lg text-label-lg rounded-full transition-all ${
                      isActive
                        ? 'bg-surface-container-high text-on-surface'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              )
            })}
          </nav>
        </div>
        
        <div className='flex items-center gap-space-sm md:gap-space-md'>
          <Form method='get' action='/search' role='search' className='hidden md:flex items-center bg-surface-container-lowest rounded-full px-space-md py-space-xs shadow-[0_1px_4px_rgba(0,0,0,0.03)] focus-within:shadow-[0_0_0_2px_rgba(53,15,84,0.15)] transition-all w-52 lg:w-64'>
            <span aria-hidden='true' className='icon text-[18px] text-outline mr-space-xs'>
              search
            </span>
            <input
              name='q'
              type='search'
              aria-label='Search products'
              placeholder='Search nano-gummies, sleep, focus'
              className='bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full'
            />
          </Form>
          <NavLink 
            to='/account'
            prefetch='intent'
            aria-label='Account'
            className='p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center'
          >
            <span aria-hidden className='icon text-[22px]'>person</span>
          </NavLink>
          <CartButton cart={cart} variant='desktop' />
        </div>
      </div>
    </header>
  );
}
        

function toRelativeUrl(url: string, primaryDomainUrl: string, publicStoreDomain: string) {
  if(url.startsWith('/')) return url;
  const isInternal = url.includes('myshopify.com') || url.includes(publicStoreDomain) || url.includes(primaryDomainUrl);

  return isInternal ? new URL(url).pathname : url;
}