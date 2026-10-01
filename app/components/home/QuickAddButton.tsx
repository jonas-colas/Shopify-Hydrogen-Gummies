import type {ReactNode} from 'react';
import type {FetcherWithComponents} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

type QuickAddButtonProps = {
  variantId?: string;
  available: boolean;
  productTitle: string;
  className: string;
  /** Material Symbols icon name, or null for a text-only button */
  icon?: string | null;
  /** Optional visible text, e.g. "Quick Add" */
  label?: ReactNode;
};

/** Round "+" button that adds one unit of a variant and opens the cart. */
export function QuickAddButton({
  variantId,
  available,
  productTitle,
  className,
  icon = 'add',
  label,
}: QuickAddButtonProps) {
  const {open} = useAside();

  if (!variantId || !available) {
    return (
      <span className="font-label-sm text-label-sm uppercase text-outline">
        Sold out
      </span>
    );
  }

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{lines: [{merchandiseId: variantId, quantity: 1}]}}
    >
      {(fetcher: FetcherWithComponents<unknown>) => {
        const isAdding = fetcher.state !== 'idle';
        return (
          <button
            type="submit"
            onClick={() => open('cart')}
            disabled={isAdding}
            aria-label={`Add ${productTitle} to cart`}
            className={className}
          >
            {icon && (
              <span aria-hidden="true" className="icon text-[20px]">
                {isAdding ? 'hourglass_bottom' : icon}
              </span>
            )}
            {label && <span>{isAdding ? 'Adding' : label}</span>}
          </button>
        );
      }}
    </CartForm>
  );
}
