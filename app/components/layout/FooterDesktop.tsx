import {Suspense} from 'react';
import {Await} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {splitFooterMenu} from '~/lib/menu';
import {MenuLink} from './MenuLink';

type FooterDesktopProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
};

const TRUST_BADGES = [
  {icon: 'verified', title: 'VESIsorb® Patented', detail: '5x Bioavailability'},
  {icon: 'science', title: 'cGMP Certified', detail: 'Pharma-Grade Facility'},
  {icon: 'eco', title: '100% Vegan & Gluten-Free', detail: 'Pure Fruit Pectin'},
  {
    icon: 'analytics',
    title: '3rd-Party Tested',
    detail: 'Every Batch COA Verified',
  },
];

// Legal copy from the design. Review it for your own products before launch.
const DISCLAIMER =
  'These statements have not been evaluated by the Food and Drug Administration (FDA). This product is not intended to diagnose, treat, cure, or prevent any disease. For adult use only (21+). Keep out of reach of children and pets. Do not operate machinery or drive a motor vehicle while using cannabis products. Use responsibly and consult your physician before consumption, especially if pregnant, nursing, or taking medications.';

export function FooterDesktop({
  footer,
  header,
  publicStoreDomain,
}: FooterDesktopProps) {
  const {shop} = header;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant pt-space-3xl pb-space-2xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        {/* Newsletter */}
        <div className="bg-surface-container-lowest rounded-lg p-space-xl lg:p-space-2xl mb-space-3xl shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div className="max-w-xl text-center lg:text-left">
            <p className="font-scientific-code text-scientific-code uppercase text-secondary font-bold mb-space-2xs">
              Molecular Precision • Rapid Absorption
            </p>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-bold">
              Unlock 15% Off Your Next Elevation
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Receive exclusive batch drops, terpene research updates, and
              verified lab insights straight to your inbox.
            </p>
          </div>

          {/* Not connected yet: the signup service is chosen in a later step */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-space-sm"
          >
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              aria-label="Email address"
              placeholder="Enter your email address"
              className="w-full sm:w-80 px-space-lg py-space-sm bg-surface-container-low rounded-full font-body-md text-body-md text-on-surface outline-none border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-space-xl py-space-sm bg-primary-container hover:bg-primary text-on-primary rounded-full font-label-lg text-label-lg transition-all shadow-md"
            >
              Claim 15% Off
            </button>
          </form>
        </div>

        {/* Trust badges */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-space-md mb-space-3xl">
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge.title}
              className="flex items-center gap-space-sm p-space-md bg-surface-container rounded"
            >
              <span
                aria-hidden="true"
                className="icon text-secondary-container text-[28px]"
              >
                {badge.icon}
              </span>
              <div>
                <p className="font-label-lg text-label-lg text-primary">
                  {badge.title}
                </p>
                <p className="font-scientific-code text-scientific-code text-on-surface-variant">
                  {badge.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Brand + link columns from the Shopify "footer" menu */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-xl pb-space-2xl">
          <div className="md:col-span-2">
            <div className="flex items-center gap-space-xs mb-space-md">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm tracking-tight"
              >
                {shop.name.charAt(0).toUpperCase()}
              </span>
              <span className="font-headline-sm text-headline-sm tracking-widest text-primary uppercase font-bold">
                {shop.name}
              </span>
            </div>
            {shop.description && (
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-lg">
                {shop.description}
              </p>
            )}
            <p className="flex items-center gap-space-xs text-on-surface-variant font-scientific-code text-scientific-code">
              <span
                aria-hidden="true"
                className="icon text-[18px] text-secondary"
              >
                lock
              </span>
              256-BIT SSL ENCRYPTED SECURE CHECKOUT
            </p>
          </div>

          <Suspense>
            <Await resolve={footer}>
              {(data) =>
                splitFooterMenu(data?.menu).columns.map((column) => (
                  <nav key={column.id} aria-label={column.title}>
                    <h3 className="font-title-lg text-title-lg text-primary font-bold mb-space-md">
                      {column.title}
                    </h3>
                    <ul className="space-y-space-xs font-body-md text-body-md">
                      {column.items.map((item) => (
                        <li key={item.id}>
                          <MenuLink
                            item={item}
                            primaryDomainUrl={shop.primaryDomain.url}
                            publicStoreDomain={publicStoreDomain}
                            className="hover:text-primary transition-colors"
                          />
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))
              }
            </Await>
          </Suspense>
        </div>

        {/* Disclaimer + bottom bar */}
        <div className="pt-space-xl">
          <div className="bg-surface-container-lowest/60 rounded p-space-md mb-space-lg text-on-surface-variant font-scientific-code text-scientific-code leading-relaxed">
            <p className="mb-space-xs font-bold text-on-surface">
              MANDATORY COMPLIANCE &amp; LEGAL DISCLAIMER:
            </p>
            <p className="mb-space-xs">{DISCLAIMER}</p>
            <p>
              © {year} {shop.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm">
            <Suspense>
              <Await resolve={footer}>
                {(data) => (
                  <nav
                    aria-label="Legal"
                    className="flex items-center gap-space-md"
                  >
                    {splitFooterMenu(data?.menu).links.map((item) => (
                      <MenuLink
                        key={item.id}
                        item={item}
                        primaryDomainUrl={shop.primaryDomain.url}
                        publicStoreDomain={publicStoreDomain}
                        className="hover:text-primary transition-colors"
                      />
                    ))}
                  </nav>
                )}
              </Await>
            </Suspense>
            <p className="font-scientific-code text-scientific-code text-outline">
              FAST-ACTING BIO-ABSORPTION SPECIFICATION VERIFIED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}