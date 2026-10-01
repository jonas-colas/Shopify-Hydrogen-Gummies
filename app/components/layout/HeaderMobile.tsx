import {NavLink} from 'react-router';
import type {HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

type HeaderMobileProps = {
  header: HeaderQuery;
};

export function HeaderMobile({header}: HeaderMobileProps) {
  const {shop} = header;
  const {open} = useAside();

  return (
    <header className="pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      {/* Announcement bar */}
      <div className="bg-primary-container text-on-primary text-center py-space-2xs px-margin-mobile flex items-center justify-center gap-space-xs">
        <span
          aria-hidden="true"
          className="icon text-[14px] text-secondary-container"
        >
          bolt
        </span>
        <p className="font-label-sm text-label-sm tracking-wide uppercase font-semibold text-primary-fixed">
          BOGO 50% OFF SITEWIDE • FAST 15-MIN ONSET
        </p>
      </div>

      {/* 3 columns: the outer two share the leftover space equally,
          which keeps the logo exactly in the middle */}
      <div className="h-16 px-margin-mobile max-[359px]:px-space-sm grid grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-space-xs max-[359px]:gap-space-2xs">
        <div className="flex items-center gap-space-2xs">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => open('mobile')}
            className="w-11 h-11 flex items-center justify-center text-primary-container active:scale-95 transition-transform"
          >
            <span aria-hidden="true" className="icon text-[24px]">
              menu
            </span>
          </button>

          <button
            type="button"
            aria-label="Search products"
            onClick={() => open('search')}
            className="w-11 h-11 flex items-center justify-center text-primary-container active:scale-95 transition-transform"
          >
            <span aria-hidden="true" className="icon text-[22px]">
              search
            </span>
          </button>
        </div>

        <NavLink
          to="/"
          end
          prefetch="intent"
          className="flex min-w-0 items-center gap-space-2xs"
        >
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed">
            <span aria-hidden="true" className="icon text-[16px]">
              spa
            </span>
          </span>
          <span className="truncate font-headline-sm text-headline-sm font-bold tracking-tight text-primary-container">
            {shop.name}
          </span>
        </NavLink>

        <div className="flex items-center justify-end gap-space-xs">
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
  );
}
