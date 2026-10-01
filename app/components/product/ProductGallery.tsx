import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import type {ProductFragment} from 'storefrontapi.generated';

type GalleryImage = ProductFragment['images']['nodes'][number];

type ProductGalleryProps = {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
};

// Same `sizes` on both galleries, so the browser picks the same file once
const MAIN_IMAGE_SIZES = '(min-width: 1024px) 55vw, 100vw';

/**
 * All product images, plus which one is shown. When the shopper picks
 * another variant, the gallery jumps to that variant's image.
 */
function useGallery({product, selectedVariant}: ProductGalleryProps) {
  const variantImage = selectedVariant?.image;
  const images: GalleryImage[] = product.images.nodes.length
    ? product.images.nodes
    : variantImage
      ? [variantImage]
      : [];

  const [selectedId, setSelectedId] = useState(variantImage?.id);

  // "Adjust state when a prop changes" (react.dev): no effect needed
  const [shownVariantImageId, setShownVariantImageId] = useState(
    variantImage?.id,
  );
  if (variantImage?.id !== shownVariantImageId) {
    setShownVariantImageId(variantImage?.id);
    if (variantImage?.id) setSelectedId(variantImage.id);
  }

  const active = images.find((image) => image.id === selectedId) ?? images[0];

  return {images, active, select: setSelectedId};
}

export function ProductGalleryDesktop(props: ProductGalleryProps) {
  const {product} = props;
  const {images, active, select} = useGallery(props);

  return (
    <div className="relative bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-md overflow-hidden group">
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"
      />

      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[540px] rounded overflow-hidden bg-surface-container-low flex items-center justify-center">
        {active && (
          <Image
            data={active}
            alt={active.altText || product.title}
            sizes={MAIN_IMAGE_SIZES}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        {product.dosage?.value && (
          <span className="absolute top-space-md left-space-md z-10 inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm font-scientific-code text-scientific-code text-primary uppercase font-bold tracking-wide">
            <span
              aria-hidden="true"
              className="icon text-[15px] text-secondary-container"
            >
              bolt
            </span>
            {product.dosage.value}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <ul className="relative grid grid-cols-4 gap-space-xs sm:gap-space-sm mt-space-md">
          {images.map((image, index) => {
            const isActive = image.id === active?.id;
            return (
              <li key={image.id}>
                <button
                  type="button"
                  onClick={() => select(image.id)}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={isActive}
                  className={`w-full rounded overflow-hidden p-space-2xs shadow-sm transition-all ${
                    isActive
                      ? 'bg-surface-container-high ring-2 ring-primary-container'
                      : 'bg-surface-container-lowest hover:bg-surface-container-high'
                  }`}
                >
                  <Image
                    data={image}
                    alt=""
                    sizes="140px"
                    className="w-full h-20 sm:h-24 object-cover rounded"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function ProductGalleryMobile(props: ProductGalleryProps) {
  const {product} = props;
  const {images, active, select} = useGallery(props);

  return (
    <div className="flex flex-col gap-space-sm">
      <div className="relative w-full aspect-square rounded-lg bg-surface-container-low overflow-hidden shadow-sm flex items-center justify-center">
        {active && (
          <Image
            data={active}
            alt={active.altText || product.title}
            sizes={MAIN_IMAGE_SIZES}
            loading="eager"
            className="w-full h-full object-cover"
          />
        )}
        {product.dosage?.value && (
          <span className="absolute top-3 left-3 flex items-center gap-space-2xs px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"
            />
            <span className="font-scientific-code text-scientific-code text-primary-container uppercase tracking-wider font-bold">
              {product.dosage.value}
            </span>
          </span>
        )}
      </div>

      {images.length > 1 && (
        <ul className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pb-1">
          {images.map((image, index) => {
            const isActive = image.id === active?.id;
            return (
              <li key={image.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => select(image.id)}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={isActive}
                  className={`w-16 h-16 rounded p-1 transition-all ${
                    isActive
                      ? 'bg-surface-container-lowest shadow-md ring-2 ring-primary-container'
                      : 'bg-surface-container opacity-70'
                  }`}
                >
                  <Image
                    data={image}
                    alt=""
                    sizes="64px"
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}