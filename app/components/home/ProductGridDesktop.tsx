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

type ProductGridDesktopProps = {
  products: HomeGridProductFragment[];
};

export function ProductGridDesktop({products}: ProductGridDesktopProps) {
  const [activeMood, setActiveMood] = useState<MoodTag | 'all'>('all');

  const gridProducts = toGridProducts(products);
  const moods = availableMoods(gridProducts);
  const visibleProducts =
    activeMood === 'all'
      ? gridProducts
      : gridProducts.filter((product) => product.mood?.tag === activeMood);

  if (!gridProducts.length) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
        <div>
          <p className="font-scientific-code text-scientific-code uppercase text-secondary font-bold tracking-wider mb-space-2xs">
            Targeted Bio-Chemistry
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Precision Tailored To Your Day
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Select by desired effect, active cannabinoid profile, and botanical
            terpene matrix.
          </p>
        </div>

        {moods.length > 0 && (
          <div
            role="group"
            aria-label="Filter by mood"
            className="flex items-center gap-space-xs bg-surface-container-low p-space-2xs rounded-full shrink-0"
          >
            <MoodTab
              label="All Moods"
              active={activeMood === 'all'}
              onClick={() => setActiveMood('all')}
            />
            {moods.map((mood) => (
              <MoodTab
                key={mood.tag}
                label={mood.label}
                active={activeMood === mood.tag}
                onClick={() => setActiveMood(mood.tag)}
              />
            ))}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MoodTab({
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
      className={`px-space-md py-space-xs font-label-lg text-label-lg rounded-full transition-colors ${
        active
          ? 'bg-surface-container-lowest text-primary shadow-sm'
          : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function ProductCard({product}: {product: GridProduct}) {
  const variant = product.variants.nodes[0];
  const url = `/products/${product.handle}`;

  return (
    <article className="group h-full bg-surface-container-lowest rounded p-space-md shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between relative overflow-hidden">
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-1.5 ${product.theme.accent}`}
      />

      <div>
        <div className="flex min-h-6 items-center justify-between mb-space-sm pt-space-2xs">
          {product.badge?.value ? (
            <span
              className={`px-space-xs py-space-2xs font-label-sm text-label-sm uppercase rounded-full ${product.theme.badge}`}
            >
              {product.badge.value}
            </span>
          ) : (
            <span />
          )}
          {product.dosage?.value && (
            <span className="font-scientific-code text-scientific-code text-outline font-semibold">
              {product.dosage.value}
            </span>
          )}
        </div>

        <Link
          to={url}
          prefetch="intent"
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full h-48 rounded overflow-hidden mb-space-md relative bg-surface-container-low"
        >
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              alt={product.featuredImage.altText || product.title}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {product.highlight?.value && (
            <span className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm text-primary">
              {product.highlight.value}
            </span>
          )}
        </Link>

        <h3 className="font-title-lg text-title-lg text-primary font-bold">
          <Link to={url} prefetch="intent">
            {product.title}
          </Link>
        </h3>
        {product.description && (
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs line-clamp-2">
            {product.description}
          </p>
        )}
      </div>

      <div className="pt-space-md mt-space-md bg-surface-container-low/40 rounded p-space-xs flex items-center justify-between">
        <div>
          <Money
            data={product.priceRange.minVariantPrice}
            className="font-title-md text-title-md text-primary font-bold"
          />
          {product.packSize?.value && (
            <span className="font-scientific-code text-scientific-code text-outline block">
              {product.packSize.value}
            </span>
          )}
        </div>
        <QuickAddButton
          variantId={variant?.id}
          available={Boolean(variant?.availableForSale)}
          productTitle={product.title}
          className="w-10 h-10 rounded-full bg-primary-container hover:bg-primary text-on-primary flex items-center justify-center transition-colors shadow-sm disabled:opacity-60"
        />
      </div>
    </article>
  );
}