import {Money} from '@shopify/hydrogen';
import type {ProductFragment} from 'storefrontapi.generated';
import {Stars} from '~/components/Stars';
import {parsePackSize, parseRating, savePercent} from '~/lib/product';

type ProductSummaryProps = {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
};

// Marketing claim from the design. Keep only what is true for your products.
const VALUE_HOOK = {
  title: 'Feel good in just 15 minutes.',
  text: 'Our patented nano-vesicle technology ensures 300% faster absorption than traditional edibles.',
};

function usePricing({product, selectedVariant}: ProductSummaryProps) {
  const price = selectedVariant?.price;
  const compareAt = selectedVariant?.compareAtPrice;
  const pack = parsePackSize(product.packSize);
  return {
    price,
    compareAt,
    save: savePercent(price, compareAt),
    rating: parseRating(product.rating, product.ratingCount),
    pack,
    // Price of one gummy, e.g. $39.00 / 60 = $0.65
    perPiece:
      price && pack
        ? {
            amount: (Number(price.amount) / pack.count).toFixed(2),
            currencyCode: price.currencyCode,
          }
        : null,
  };
}

export function ProductSummaryDesktop(props: ProductSummaryProps) {
  const {product} = props;
  const {price, compareAt, save, rating, pack, perPiece} = usePricing(props);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center justify-between gap-space-xs">
          <p className="font-scientific-code text-scientific-code text-secondary uppercase font-bold tracking-wider">
            {product.vendor}
          </p>
          {product.badge?.value && (
            <span className="inline-flex items-center gap-1 px-space-xs py-space-2xs bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-sm text-label-sm font-bold">
              <span aria-hidden="true" className="icon text-[14px]">
                local_fire_department
              </span>
              {product.badge.value}
            </span>
          )}
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          {product.title}
        </h1>
        {rating && (
          <p className="flex items-center gap-space-xs flex-wrap">
            <Stars rating={rating.value} size="text-[18px]" />
            <span className="font-label-lg text-label-lg text-primary font-bold">
              {rating.value} / 5.0
            </span>
            {rating.count > 0 && (
              <>
                <span aria-hidden="true" className="text-outline">
                  •
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {rating.count.toLocaleString('en')} Reviews
                </span>
              </>
            )}
          </p>
        )}
      </div>

      {price && (
        <div className="p-space-md bg-surface-container-low rounded flex items-center justify-between gap-space-sm">
          <p className="flex items-baseline gap-space-xs flex-wrap">
            <Money
              as="span"
              data={price}
              className="font-headline-md text-headline-md text-primary font-bold"
            />
            {compareAt && save > 0 && (
              <>
                <Money
                  as="span"
                  data={compareAt}
                  className="font-title-md text-title-md text-outline line-through"
                />
                <span className="px-space-xs py-space-2xs rounded bg-tertiary-fixed text-on-tertiary-fixed font-scientific-code text-scientific-code font-bold">
                  SAVE {save}%
                </span>
              </>
            )}
          </p>
          {pack && perPiece && (
            <p className="shrink-0 text-right">
              <span className="block font-scientific-code text-scientific-code text-on-surface-variant">
                Cost per {pack.unit}
              </span>
              <span className="font-label-lg text-label-lg text-primary font-bold">
                <Money as="span" data={perPiece} />
              </span>
            </p>
          )}
        </div>
      )}

      <p className="p-space-sm bg-surface-container rounded flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface">
        <span
          aria-hidden="true"
          className="icon text-secondary-container text-[24px]"
        >
          electric_bolt
        </span>
        <span>
          <span className="font-bold text-primary">{VALUE_HOOK.title}</span>{' '}
          {VALUE_HOOK.text}
        </span>
      </p>
    </div>
  );
}

export function ProductSummaryMobile(props: ProductSummaryProps) {
  const {product} = props;
  const {price, compareAt, save, rating, pack, perPiece} = usePricing(props);

  return (
    <div className="flex flex-col gap-space-xs">
      {product.badge?.value && (
        <p>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
            {product.badge.value}
          </span>
        </p>
      )}
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container leading-tight font-bold">
        {product.title}
      </h1>
      {rating && (
        <p className="flex items-center gap-2">
          <Stars rating={rating.value} size="text-[18px]" />
          <span className="font-title-md text-title-md text-on-surface font-bold">
            {rating.value}
          </span>
          {rating.count > 0 && (
            <span className="font-label-md text-label-md text-surface-tint font-medium">
              {rating.count.toLocaleString('en')} Reviews
            </span>
          )}
        </p>
      )}

      {price && (
        <p className="flex items-baseline gap-3 mt-1 flex-wrap">
          <Money
            as="span"
            data={price}
            className="font-headline-md text-headline-md text-primary-container font-bold"
          />
          {compareAt && save > 0 && (
            <>
              <Money
                as="span"
                data={compareAt}
                className="font-title-md text-title-md text-outline line-through"
              />
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                SAVE {save}%
              </span>
            </>
          )}
        </p>
      )}

      {pack && perPiece && (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Cost per {pack.unit}:{' '}
          <strong className="text-on-surface font-semibold">
            <Money as="span" data={perPiece} />
          </strong>{' '}
          • {product.packSize?.value} 
        </p>
      )}

      <p className="mt-2 p-3.5 rounded-lg bg-surface-container-high flex items-start gap-3 shadow-sm font-body-sm text-body-sm text-on-surface leading-snug">
        <span
          aria-hidden="true"
          className="icon text-secondary-container text-[22px] shrink-0"
        >
          bolt
        </span>
        <span>
          <span className="font-semibold text-primary-container">
            {VALUE_HOOK.title}
          </span>{' '}
          {VALUE_HOOK.text}
        </span>
      </p>
    </div>
  );
}