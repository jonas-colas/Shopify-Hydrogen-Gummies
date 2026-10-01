import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FavoriteProductFragment,
  HomeFavoritesQuery,
} from 'storefrontapi.generated';
import {QuickAddButton} from './QuickAddButton';

type FavoritesProps = {
  /** Deferred: the page renders first, these products stream in after */
  favorites: Promise<HomeFavoritesQuery | null>;
};

const BADGE_COLORS = [
  'bg-secondary-container text-on-primary',
  'bg-primary text-on-primary',
  'bg-secondary text-on-secondary',
];

/** Products tagged "bundle" get the highlighted multi-pack card */
function isBundle(product: FavoriteProductFragment) {
  return product.tags.some((tag) => tag.toLowerCase() === 'bundle');
}

/** "Save 18%" from the variant's price and compare-at price */
function savePercent(product: FavoriteProductFragment) {
  const variant = product.variants.nodes[0];
  const price = Number(variant?.price.amount);
  const compareAt = Number(variant?.compareAtPrice?.amount);
  if (!price || !compareAt || compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

/**
 * Shopify's standard review metafields (filled by review apps):
 * reviews.rating = {"value": "4.9", ...}, reviews.rating_count = "8400"
 */
function getRating(product: FavoriteProductFragment) {
  if (!product.rating?.value) return null;
  try {
    const {value} = JSON.parse(product.rating.value) as {value: string};
    const count = Number(product.ratingCount?.value ?? 0);
    return {
      value: String(Number(value)),
      count: count
        ? new Intl.NumberFormat('en', {notation: 'compact'})
            .format(count)
            .toLowerCase()
        : null,
    };
  } catch {
    return null;
  }
}

function subtitle(product: FavoriteProductFragment) {
  return (
    [product.dosage?.value, product.packSize?.value]
      .filter(Boolean)
      .join(' • ') || product.description
  );
}

export function FavoritesDesktop({favorites}: FavoritesProps) {
  return (
    <Suspense fallback={null}>
      <Await resolve={favorites}>
        {(data) => {
          const collection = data?.collection;
          if (!collection?.products.nodes.length) return null;

          return (
            <section className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
                <div>
                  <p className="font-scientific-code text-scientific-code uppercase text-secondary font-bold tracking-wider mb-space-2xs">
                    Crafted with Real Fruit Puree
                  </p>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    Customer Favorites &amp; Multi-Packs
                  </h2>
                </div>
                <Link
                  to={`/collections/${collection.handle}`}
                  prefetch="intent"
                  className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-secondary transition-colors font-bold"
                >
                  <span>View All Formulations</span>
                  <span aria-hidden="true" className="icon text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {collection.products.nodes.map((product, index) => (
                  <li key={product.id} className="flex">
                    <FavoriteCard product={product} index={index} />
                  </li>
                ))}
              </ul>
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}

function FavoriteCard({
  product,
  index,
}: {
  product: FavoriteProductFragment;
  index: number;
}) {
  const variant = product.variants.nodes[0];
  const bundle = isBundle(product);
  const save = savePercent(product);
  const rating = getRating(product);
  const url = `/products/${product.handle}`;

  return (
    <article
      className={`w-full bg-surface-container-lowest rounded p-space-md transition-all flex flex-col justify-between group relative overflow-hidden ${
        bundle ? 'shadow-md hover:shadow-xl' : 'shadow-sm hover:shadow-lg'
      }`}
    >
      {bundle && save > 0 && (
        <p className="absolute top-0 right-0 z-10 bg-secondary-container text-on-primary px-space-sm py-1 font-label-sm text-label-sm uppercase font-bold rounded-bl">
          Save {save}%
        </p>
      )}

      <div>
        <Link
          to={url}
          prefetch="intent"
          tabIndex={-1}
          aria-hidden="true"
          className="relative block w-full h-56 rounded overflow-hidden bg-surface-container mb-space-sm"
        >
          {product.badge?.value && (
            <span
              className={`absolute top-2 left-2 z-10 px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm font-bold ${
                bundle
                  ? 'bg-primary-container text-on-primary'
                  : BADGE_COLORS[index % BADGE_COLORS.length]
              }`}
            >
              {product.badge.value}
            </span>
          )}
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              alt={product.featuredImage.altText || product.title}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </Link>

        {rating && (
          <p className="flex items-center gap-1 text-secondary-container mb-1">
            <span aria-hidden="true" className="icon icon-filled text-[14px]">
              star
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              {rating.value}
            </span>
            {rating.count && (
              <span className="font-scientific-code text-scientific-code text-outline">
                ({rating.count})
              </span>
            )}
          </p>
        )}
        <h3 className="font-title-lg text-title-lg text-primary font-bold">
          <Link to={url} prefetch="intent">
            {product.title}
          </Link>
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {subtitle(product)}
        </p>
      </div>

      <div className="pt-space-md flex items-center justify-between">
        {variant && (
          <p>
            <Money
              as="span"
              data={variant.price}
              className="font-title-md text-title-md text-primary font-bold"
            />
            {bundle && variant.compareAtPrice && save > 0 && (
              <Money
                as="span"
                data={variant.compareAtPrice}
                className="font-body-sm text-body-sm text-outline line-through ml-1"
              />
            )}
          </p>
        )}
        <QuickAddButton
          variantId={variant?.id}
          available={Boolean(variant?.availableForSale)}
          productTitle={product.title}
          icon={null}
          label={bundle ? 'Add Bundle' : 'Quick Add'}
          className={`px-space-md py-space-xs text-on-primary rounded-full font-label-md text-label-md transition-colors shadow-sm disabled:opacity-60 ${
            bundle
              ? 'bg-secondary-container hover:bg-secondary font-bold'
              : 'bg-primary-container hover:bg-primary'
          }`}
        />
      </div>
    </article>
  );
}

/** Mobile shows only the bundle card from the favorites collection */
export function FavoritesMobile({favorites}: FavoritesProps) {
  return (
    <Suspense fallback={null}>
      <Await resolve={favorites}>
        {(data) => {
          const bundle = data?.collection?.products.nodes.find(isBundle);
          if (!bundle) return null;

          const variant = bundle.variants.nodes[0];
          const save = savePercent(bundle);

          return (
            <section className="px-margin-mobile py-space-md">
              <article className="w-full rounded-lg bg-surface-container-lowest p-space-md shadow-md flex flex-col gap-space-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="py-1 px-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Best Value{save > 0 ? ` • Save ${save}%` : ''}
                  </span>
                  {bundle.packSize?.value && (
                    <span className="font-scientific-code text-scientific-code text-secondary font-semibold">
                      {bundle.packSize.value}
                    </span>
                  )}
                </div>

                <div className="flex gap-space-sm items-center">
                  <Link
                    to={`/products/${bundle.handle}`}
                    prefetch="intent"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="w-28 h-28 rounded bg-surface-container overflow-hidden shrink-0"
                  >
                    {bundle.featuredImage && (
                      <Image
                        data={bundle.featuredImage}
                        alt={bundle.featuredImage.altText || bundle.title}
                        sizes="112px"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </Link>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="font-title-lg text-title-lg text-primary-container leading-tight">
                      <Link to={`/products/${bundle.handle}`} prefetch="intent">
                        {bundle.title}
                      </Link>
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {bundle.description}
                    </p>
                    {variant && (
                      <p className="flex items-baseline gap-space-xs pt-1">
                        <Money
                          as="span"
                          data={variant.price}
                          className="font-headline-sm text-headline-sm font-bold text-primary-container"
                        />
                        {variant.compareAtPrice && save > 0 && (
                          <Money
                            as="span"
                            data={variant.compareAtPrice}
                            className="font-body-sm text-body-sm text-on-surface-variant line-through"
                          />
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <QuickAddButton
                  variantId={variant?.id}
                  available={Boolean(variant?.availableForSale)}
                  productTitle={bundle.title}
                  icon="shopping_bag"
                  label={
                    variant ? (
                      <>
                        Add to Cart •{' '}
                        <Money
                          as="span"
                          data={variant.price}
                          withoutTrailingZeros
                        />
                      </>
                    ) : (
                      'Add to Cart'
                    )
                  }
                  className="w-full h-12 rounded-full bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs active:scale-95 transition-transform shadow-md disabled:opacity-60"
                />
              </article>
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}
