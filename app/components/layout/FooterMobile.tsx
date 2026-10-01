import {Fragment, Suspense} from 'react';
import {Await} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {splitFooterMenu} from '~/lib/menu';
import {MenuLink} from './MenuLink';

type FooterMobileProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
};

// Legal copy from the design. Review it for your own products before launch.
const DISCLAIMER =
  '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Keep out of reach of children. Must be 21+ to purchase.';

export function FooterMobile({
  footer,
  header,
  publicStoreDomain,
}: FooterMobileProps) {
  const {shop} = header;
  const year = new Date().getFullYear();

  return (
    <>
      {/* Newsletter */}
      <section className="px-margin-mobile py-space-md">
        <div className="w-full rounded-lg bg-primary-container text-on-primary p-space-md shadow-md flex flex-col gap-space-xs text-center relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-12 -left-12 w-32 h-32 bg-secondary-container/20 rounded-full blur-xl pointer-events-none"
          />
          <p className="font-scientific-code text-scientific-code uppercase tracking-wider text-secondary-fixed font-semibold">
            Private Access
          </p>
          <h2 className="font-headline-sm text-headline-sm text-on-primary">
            Take 15% Off Your First Order
          </h2>
          <p className="font-body-sm text-body-sm text-surface-container-high pb-space-2xs">
            Join the {shop.name} Wellness Circle for scientific drop releases,
            onset guides, and private member pricing.
          </p>

          {/* Not connected yet: the signup service is chosen in a later step */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-space-2xs"
          >
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              aria-label="Email address"
              placeholder="Enter your email address"
              className="w-full h-12 rounded-full bg-surface-container-lowest text-on-surface px-space-md font-body-md text-body-md placeholder:text-outline focus:outline-none"
            />
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold active:scale-95 transition-transform shadow-md"
            >
              Claim 15% Discount
            </button>
          </form>
        </div>
      </section>

      <footer className="px-margin-mobile pt-space-xs pb-space-lg flex flex-col gap-space-xs text-center text-on-surface-variant">
        <Suspense>
          <Await resolve={footer}>
            {(data) => (
              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-center gap-x-space-xs font-label-sm text-label-sm text-primary-container font-semibold"
              >
                {splitFooterMenu(data?.menu).links.map((item, index) => (
                  <Fragment key={item.id}>
                    {index > 0 && <span aria-hidden="true">•</span>}
                    <MenuLink
                      item={item}
                      primaryDomainUrl={shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                    />
                  </Fragment>
                ))}
              </nav>
            )}
          </Await>
        </Suspense>
        <p className="font-scientific-code text-scientific-code text-on-surface-variant/80 leading-relaxed">
          {DISCLAIMER}
        </p>
        <p className="font-scientific-code text-scientific-code text-on-surface-variant/60">
          © {year} {shop.name}. All rights reserved.
        </p>
      </footer>
    </>
  );
}