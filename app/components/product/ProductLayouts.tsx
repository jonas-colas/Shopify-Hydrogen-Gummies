import {Link} from 'react-router';
import type {MappedProductOptions} from '@shopify/hydrogen';
import type {ProductFragment} from 'storefrontapi.generated';
import {BuyBoxDesktop, BuyBoxMobile} from './BuyBox';
import {ProductGalleryDesktop, ProductGalleryMobile} from './ProductGallery';
import {ProductSummaryDesktop, ProductSummaryMobile} from './ProductSummary';

type ProductLayoutProps = {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  productOptions: MappedProductOptions[];
};

// Marketing claims from the design. Keep only what is true for your products.
const TRUST_ITEMS = [
  {
    icon: 'local_shipping',
    title: 'Ships in 24h',
    detail: 'Vacuum & Discreetly Packaged',
    mobile: 'Discreet Cold Pack',
  },
  {
    icon: 'eco',
    title: 'Real Fruit Puree',
    detail: '100% Vegan Pectin Base',
    mobile: 'Real Fruit Puree',
  },
  {
    icon: 'verified',
    title: 'Triple Lab Tested',
    detail: '0.0% Heavy Metals / Impurities',
    mobile: 'Triple Lab Certified',
  },
];

function Description({html}: {html: string}) {
  if (!html) return null;
  return (
    <div
      className="font-body-md text-body-md text-on-surface-variant leading-relaxed [&_p]:mb-space-sm [&_ul]:list-disc [&_ul]:pl-space-lg [&_strong]:text-on-surface"
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}

export function ProductDesktop({
  product,
  selectedVariant,
  productOptions,
}: ProductLayoutProps) {
  const collection = product.collections.nodes[0];

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-surface-container-low py-space-sm"
      >
        <ol className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex flex-wrap items-center gap-space-2xs text-on-surface-variant font-label-md text-label-md">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          {collection && (
            <li className="flex items-center gap-space-2xs">
              <span
                aria-hidden="true"
                className="icon text-[14px] text-outline"
              >
                chevron_right
              </span>
              <Link
                to={`/collections/${collection.handle}`}
                prefetch="intent"
                className="hover:text-primary transition-colors"
              >
                {collection.title}
              </Link>
            </li>
          )}
          <li className="flex items-center gap-space-2xs">
            <span aria-hidden="true" className="icon text-[14px] text-outline">
              chevron_right
            </span>
            <span
              aria-current="page"
              className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none"
            >
              {product.title}
            </span>
          </li>
        </ol>
      </nav>

      <section className="w-full py-space-xl lg:py-space-2xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-start">
          {/* Left: gallery, trust badges, description */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <ProductGalleryDesktop
              product={product}
              selectedVariant={selectedVariant}
            />

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="bg-surface-container-lowest rounded p-space-md flex items-center gap-space-sm shadow-sm"
                >
                  <span className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <span aria-hidden="true" className="icon text-[20px]">
                      {item.icon}
                    </span>
                  </span>
                  <div>
                    <p className="font-label-lg text-label-lg text-primary font-bold">
                      {item.title}
                    </p>
                    <p className="font-scientific-code text-scientific-code text-on-surface-variant">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Description html={product.descriptionHtml} />
          </div>

          {/* Right: buy box, pinned while the left column scrolls */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <div className="bg-surface-container-lowest rounded-lg p-space-lg sm:p-space-xl shadow-md flex flex-col gap-space-md">
              <ProductSummaryDesktop
                product={product}
                selectedVariant={selectedVariant}
              />
              {/* key: a fresh quantity (1) on every product */}
              <BuyBoxDesktop
                key={product.id}
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductMobile({
  product,
  selectedVariant,
  productOptions,
}: ProductLayoutProps) {
  const collection = product.collections.nodes[0];

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <nav
        aria-label="Breadcrumb"
        className="px-margin-mobile py-space-xs flex items-center gap-space-2xs text-on-surface-variant font-label-md text-label-md min-w-0"
      >
        {collection && (
          <>
            <Link
              to={`/collections/${collection.handle}`}
              prefetch="intent"
              className="shrink-0"
            >
              {collection.title}
            </Link>
            <span aria-hidden="true" className="icon text-[14px]">
              chevron_right
            </span>
          </>
        )}
        <span
          aria-current="page"
          className="text-primary-container font-semibold truncate"
        >
          {product.title}
        </span>
      </nav>

      <div className="px-margin-mobile flex flex-col gap-space-sm">
        <ProductGalleryMobile
          product={product}
          selectedVariant={selectedVariant}
        />
        <ul className="grid grid-cols-3 gap-2 pt-1">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-center justify-center p-2 rounded bg-surface-container text-center"
            >
              <span
                aria-hidden="true"
                className="icon text-secondary text-[18px]"
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold mt-1">
                {item.mobile}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-margin-mobile pt-space-lg flex flex-col gap-space-md">
        <ProductSummaryMobile
          product={product}
          selectedVariant={selectedVariant}
        />
        <BuyBoxMobile
          key={product.id}
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />
        <Description html={product.descriptionHtml} />
      </div>
    </div>
  );
}