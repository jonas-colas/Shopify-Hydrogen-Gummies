import {useState} from 'react';
import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {HomeGridProductFragment} from 'storefrontapi.generated';
import {
  availableMoods,
  toGridProducts,
  type GridProduct,
  type MoodTag,
} from './productGrid';
import {QuickAddButton} from './QuickAddButton';

// Marketing claim from the design. Keep only what is true for your products.
const DOSE_NOTE = '10mg THC / Dose';

type ProductGridMobileProps = {
  products: HomeGridProductFragment[];
};

export function ProductGridMobile({products}: ProductGridMobileProps) {
  const [activeMood, setActiveMood] = useState<MoodTag | 'all'>('all');

  const gridProducts = toGridProducts(products);
  const moods = availableMoods(gridProducts);
  const visibleProducts =
    activeMood === 'all'
      ? gridProducts
      : gridProducts.filter((product) => product.mood?.tag === activeMood);

  if (!gridProducts.length) return null;

  return (
    <section className="px-margin-mobile py-space-xl flex flex-col gap-space-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-scientific-code text-scientific-code uppercase tracking-wider text-secondary font-bold">
            Pharmacological Precision
          </p>
          <p className="font-label-sm text-label-sm text-primary-container font-semibold">
            {DOSE_NOTE}
          </p>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-primary-container tracking-tight">
          Tailored By Desired State
        </h2>
      </div>

      {moods.length > 0 && (
        <div
          role="group"
          aria-label="Filter by mood"
          className="flex items-center gap-space-2xs overflow-x-auto no-scrollbar pb-1"
        >
          <MoodPill
            label="All States"
            active={activeMood === 'all'}
            onClick={() => setActiveMood('all')}
          />
          {moods.map((mood) => (
            <MoodPill
              key={mood.tag}
              label={mood.mobileLabel}
              active={activeMood === mood.tag}
              onClick={() => setActiveMood(mood.tag)}
            />
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-space-xs">
        {visibleProducts.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MoodPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`py-1.5 px-space-md rounded-full font-label-sm text-label-sm whitespace-nowrap ${
        active
          ? 'bg-primary-container text-on-primary font-semibold'
          : 'bg-surface-container-high text-on-surface-variant font-medium'
      }`}
    >
      {label}
    </button>
  );
}

function ProductCard({product}: {product: GridProduct}) {
  const variant = product.variants.nodes[0];
  const url = `/products/${product.handle}`;
  const details = [product.dosage?.value, product.packSize?.value]
    .filter(Boolean)
    .join(' • ');

  return (
    <article className="flex w-full flex-col rounded-lg bg-surface-container-lowest p-space-xs shadow-sm relative overflow-hidden">
      <Link
        to={url}
        prefetch="intent"
        tabIndex={-1}
        aria-hidden="true"
        className="relative block w-full h-36 rounded bg-surface-container overflow-hidden"
      >
        {product.featuredImage && (
          <Image
            data={product.featuredImage}
            alt={product.featuredImage.altText || product.title}
            sizes="50vw"
            className="w-full h-full object-cover"
          />
        )}
        {product.badge?.value && (
          <span
            className={`absolute top-2 left-2 py-0.5 px-2 rounded-full font-label-sm text-label-sm font-bold uppercase ${product.theme.mobileBadge}`}
          >
            {product.badge.value}
          </span>
        )}
        {product.highlight?.value && (
          <span className="absolute bottom-2 right-2 py-0.5 px-2 rounded-full bg-primary-container/90 text-primary-fixed font-scientific-code text-scientific-code font-bold backdrop-blur-sm">
            {product.highlight.value}
          </span>
        )}
      </Link>

      <div className="flex flex-col pt-space-xs pb-space-2xs flex-1 justify-between">
        <div className="flex flex-col">
          {product.mood && (
            <p
              className={`font-label-sm text-label-sm font-semibold uppercase tracking-wider ${product.theme.mobileLabel}`}
            >
              {product.mood.mobileLabel}
            </p>
          )}
          <h3 className="font-title-md text-title-md text-primary-container leading-snug">
            <Link to={url} prefetch="intent">
              {product.title}
            </Link>
          </h3>
          {details && (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {details}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-space-xs">
          <Money
            data={product.priceRange.minVariantPrice}
            className="font-title-lg text-title-lg font-bold text-primary-container"
          />
          <QuickAddButton
            variantId={variant?.id}
            available={Boolean(variant?.availableForSale)}
            productTitle={product.title}
            className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center active:scale-90 transition-transform shadow-sm disabled:opacity-60"
          />
        </div>
      </div>
    </article>
  );
}