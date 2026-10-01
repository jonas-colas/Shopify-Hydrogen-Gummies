import {NavLink} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {CartButton} from './CartButton';

const TABS = [
  {to: '/', label: 'Home', icon: 'home'},
  {to: '/collections/all', label: 'Shop', icon: 'grid_view'},
  {to: '/pages/science', label: 'Science', icon: 'biotech'},
];

type MobileTabBarProps = {
  cart: Promise<CartApiQueryFragment | null>;
};

export function MobileTabBar({cart}: MobileTabBarProps) {
  return (
    <>
      {/* Spacer so the end of the page is not hidden behind the fixed bar */}
      <div aria-hidden="true" className="h-20 md:hidden" />

      <nav
        aria-label="Quick links"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(53,15,84,0.06)]"
      >
        <div className="flex justify-around items-center h-20 px-gutter-mobile">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end
              prefetch="intent"
              className={({isActive}) =>
                `flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
                  isActive
                    ? 'text-primary-container font-semibold'
                    : 'text-on-surface-variant'
                }`
              }
            >
              <span aria-hidden="true" className="icon text-[22px]">
                {tab.icon}
              </span>
              <span className="font-label-sm text-label-sm">{tab.label}</span>
            </NavLink>
          ))}

          <CartButton cart={cart} variant="pill" />
        </div>
      </nav>
    </>
  );
}
