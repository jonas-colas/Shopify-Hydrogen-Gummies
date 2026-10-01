import {useState} from 'react';
import {Link, useNavigate, type FetcherWithComponents} from 'react-router';
import {CartForm, Money, type MappedProductOptions} from '@shopify/hydrogen';
import type {ProductFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {savePercent} from '~/lib/product';

type SelectedVariant = ProductFragment['selectedOrFirstAvailableVariant'];
type OptionValue = MappedProductOptions['optionValues'][number];

type BuyBoxProps = {
  productOptions: MappedProductOptions[];
  selectedVariant: SelectedVariant;
};

// Marketing claim from the design. Keep only what is true for your store.
const GUARANTEE = '30-Day Money-Back Guarantee';

/* ------------------------------------------------------------------ */
/* Option cards (pack size, flavour…): only options with 2+ values      */
/* ------------------------------------------------------------------ */

function OptionCards({
  productOptions,
  cardClassName,
}: {
  productOptions: MappedProductOptions[];
  cardClassName: string;
}) {
  // A product without variants has one option "Title" with one value
  const options = productOptions.filter(
    (option) => option.optionValues.length > 1,
  );

  return options.map((option, index) => {
    const headingId = `option-${option.name}`.replace(/\W+/g, '-');
    const selected = option.optionValues.find((value) => value.selected);

    return (
      <div key={option.name} className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between gap-space-xs">
          <span
            id={headingId}
            className="font-label-lg text-label-lg text-primary font-bold"
          >
            {index + 1}. Select {option.name}
          </span>
          {selected && (
            <span className="font-scientific-code text-scientific-code text-secondary uppercase font-semibold truncate">
              {selected.name}
            </span>
          )}
        </div>
        <div
          role="group"
          aria-labelledby={headingId}
          className="grid grid-cols-2 gap-space-xs"
        >
          {option.optionValues.map((value) => (
            <OptionCard
              key={option.name + value.name}
              value={value}
              className={cardClassName}
            />
          ))}
        </div>
      </div>
    );
  });
}

function OptionCard({
  value,
  className,
}: {
  value: OptionValue;
  className: string;
}) {
  const navigate = useNavigate();
  const {name, handle, variantUriQuery, selected, available, exists} = value;
  // The variant this card switches to (typed as complete, but only has
  // the fields from PRODUCT_VARIANT_FRAGMENT)
  const variant = value.variant as SelectedVariant | undefined;
  const save = savePercent(variant?.price, variant?.compareAtPrice);

  const content = (
    <>
      {save > 0 && (
        <span className="absolute -top-2 right-2 px-space-xs py-[2px] rounded-full bg-primary text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wider">
          Save {save}%
        </span>
      )}
      <span className="flex items-center gap-space-xs min-w-0">
        {value.swatch?.color && (
          <span
            aria-hidden="true"
            className="w-3.5 h-3.5 rounded-full shrink-0"
            style={{backgroundColor: value.swatch.color}}
          />
        )}
        <span className="font-label-lg text-label-lg text-primary font-bold truncate">
          {name}
        </span>
      </span>
      <span className="flex items-center justify-between gap-space-2xs mt-space-2xs">
        {variant?.price && (
          <Money
            as="span"
            data={variant.price}
            className="font-label-md text-label-md text-on-surface-variant"
          />
        )}
        {!available && (
          <span className="font-scientific-code text-scientific-code text-outline uppercase">
            Sold out
          </span>
        )}
        {selected && (
          <span className="ml-auto w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
            <span aria-hidden="true" className="icon text-[14px]">
              check
            </span>
          </span>
        )}
      </span>
    </>
  );

  const classes = `relative text-left flex flex-col justify-between transition-all ${className} ${
    selected
      ? 'bg-surface-container-high shadow-sm ring-2 ring-primary-container'
      : 'bg-surface-container-low hover:bg-surface-container'
  } ${available ? '' : 'opacity-50'}`;

  // Combined listings: the value is another product, so a real link (SEO)
  if (value.isDifferentProduct) {
    return (
      <Link
        to={`/products/${handle}?${variantUriQuery}`}
        prefetch="intent"
        preventScrollReset
        replace
        aria-current={selected ? 'true' : undefined}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  // Same product: update ?Option=Value without adding history entries,
  // as a button so search engines don't index every variant URL
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={!exists}
      onClick={() => {
        if (!selected) {
          void navigate(`?${variantUriQuery}`, {
            replace: true,
            preventScrollReset: true,
          });
        }
      }}
      className={classes}
    >
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Quantity stepper + Add to bag                                        */
/* ------------------------------------------------------------------ */

function QuantityStepper({
  quantity,
  setQuantity,
  buttonClassName,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
  buttonClassName: string;
}) {
  return (
    <div className="flex items-center justify-between bg-surface-container rounded-full p-1 shadow-sm shrink-0">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className={`${buttonClassName} rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high disabled:opacity-40 transition-colors flex items-center justify-center`}
      >
        <span aria-hidden="true" className="icon text-[20px]">
          remove
        </span>
      </button>
      <span
        aria-live="polite"
        aria-label={`Quantity ${quantity}`}
        className="min-w-10 text-center font-label-lg text-label-lg text-primary font-bold"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity(quantity + 1)}
        className={`${buttonClassName} rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors flex items-center justify-center`}
      >
        <span aria-hidden="true" className="icon text-[20px]">
          add
        </span>
      </button>
    </div>
  );
}

function AddToBagButton({
  selectedVariant,
  quantity,
  variant,
}: {
  selectedVariant: SelectedVariant;
  quantity: number;
  variant: 'desktop' | 'mobile';
}) {
  const {open} = useAside();
  const available = Boolean(selectedVariant?.availableForSale);
  const price = selectedVariant?.price;
  const total = price && {
    amount: (Number(price.amount) * quantity).toFixed(2),
    currencyCode: price.currencyCode,
  };

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: selectedVariant
          ? [{merchandiseId: selectedVariant.id, quantity, selectedVariant}]
          : [],
      }}
    >
      {(fetcher: FetcherWithComponents<unknown>) => {
        const isAdding = fetcher.state !== 'idle';
        const label = !available ? (
          'SOLD OUT'
        ) : isAdding ? (
          'ADDING…'
        ) : (
          <>
            ADD<span className="max-[359px]:hidden"> TO BAG</span>
          </>
        );

        return (
          <button
            type="submit"
            onClick={() => open('cart')}
            disabled={!available || isAdding}
            className={`w-full rounded-full whitespace-nowrap flex items-center transition-all disabled:opacity-60 disabled:shadow-none ${
              variant === 'desktop'
                ? 'h-[52px] justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-title-lg text-title-lg font-bold shadow-lg hover:shadow-xl group'
                : 'h-12 justify-between gap-space-xs px-5 max-[359px]:px-4 bg-gradient-to-r from-secondary-container to-on-tertiary-container text-on-secondary font-label-lg text-label-lg font-bold shadow-md active:scale-[0.98]'
            }`}
          >
            {variant === 'desktop' && (
              <span
                aria-hidden="true"
                className="icon text-[20px] text-secondary-container group-hover:scale-110 transition-transform"
              >
                {isAdding ? 'hourglass_bottom' : 'shopping_bag'}
              </span>
            )}
            <span>
              {label}
              {variant === 'desktop' && available && !isAdding && total && (
                <>
                  {' • '}
                  <Money as="span" data={total} />
                </>
              )}
            </span>
            {variant === 'mobile' && available && total && (
              <Money
                as="span"
                data={total}
                className="font-scientific-code font-bold"
              />
            )}
          </button>
        );
      }}
    </CartForm>
  );
}

function TrustLine() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-space-md gap-y-space-2xs text-on-surface-variant font-scientific-code text-scientific-code">
      <span className="flex items-center gap-1">
        <span aria-hidden="true" className="icon text-[16px] text-secondary">
          verified_user
        </span>
        Secure Checkout
      </span>
      <span aria-hidden="true">•</span>
      <span className="flex items-center gap-1">
        <span aria-hidden="true" className="icon text-[16px] text-secondary">
          replay
        </span>
        {GUARANTEE}
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Layouts                                                              */
/* ------------------------------------------------------------------ */

export function BuyBoxDesktop({productOptions, selectedVariant}: BuyBoxProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-space-md">
      <OptionCards
        productOptions={productOptions}
        cardClassName="p-space-sm rounded"
      />
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-space-sm pt-space-xs">
        <QuantityStepper
          quantity={quantity}
          setQuantity={setQuantity}
          buttonClassName="w-10 h-10"
        />
        <div className="flex-1">
          <AddToBagButton
            selectedVariant={selectedVariant}
            quantity={quantity}
            variant="desktop"
          />
        </div>
      </div>
      <TrustLine />
    </div>
  );
}

export function BuyBoxMobile({productOptions, selectedVariant}: BuyBoxProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-space-md">
      <OptionCards
        productOptions={productOptions}
        cardClassName="p-3.5 rounded-lg"
      />
      <div className="flex items-center gap-space-xs">
        <QuantityStepper
          quantity={quantity}
          setQuantity={setQuantity}
          buttonClassName="w-9 h-9"
        />
        <div className="flex-1 min-w-0">
          <AddToBagButton
            selectedVariant={selectedVariant}
            quantity={quantity}
            variant="mobile"
          />
        </div>
      </div>
      <TrustLine />
    </div>
  );
}