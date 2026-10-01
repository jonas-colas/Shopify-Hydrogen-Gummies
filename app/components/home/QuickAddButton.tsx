import type {FetcherWithComponents} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

type QuickAddButtonProps = {
  variantId?: string;
  available: boolean;
  productTitle: string;
  className: string;
};

/** Round "+" button that adds one unit of a variant and opens the cart. */
export function QuickAddButton({
  variantId,
  available,
  productTitle,
  className,
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
            <span aria-hidden="true" className="icon text-[20px]">
              {isAdding ? 'hourglass_bottom' : 'add'}
            </span>
          </button>
        );
      }}
    </CartForm>
  );
}