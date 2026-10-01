import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

// Marketing claims from the design. Keep only what is true for your products.
const RATING = {score: '4.9 / 5', reviews: '(13,840+)'};
const AWARD = 'Voted #1 Fast-Acting';
const STRAINS = [
  {label: 'Sativa', dot: 'bg-secondary-container'},
  {label: 'Hybrid', dot: 'bg-on-tertiary-container'},
  {label: 'Indica', dot: 'bg-primary-container'},
];

type HeroMobileProps = {
  /** The homepage's featured collection: its image and link drive the hero */
  collection?: FeaturedCollectionFragment;
};

export function HeroMobile({collection}: HeroMobileProps) {
  const shopUrl = collection
    ? `/collections/${collection.handle}`
    : '/collections/all';

  return (
    <section className="relative px-margin-mobile pt-space-md pb-space-lg flex flex-col gap-space-md overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-28 -right-12 w-48 h-48 bg-on-tertiary-container/10 rounded-full blur-2xl pointer-events-none"
      />

      <p className="inline-flex self-start items-center gap-space-2xs py-1 px-space-sm rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-sm">
        <span
          aria-hidden="true"
          className="icon icon-filled text-secondary-container text-[16px]"
        >
          bolt
        </span>
        <span className="font-scientific-code text-scientific-code uppercase font-semibold text-primary-container tracking-wider">
          Patented VESIsorb® • 15-Min Onset
        </span>
      </p>

      <div className="flex flex-col gap-space-xs relative z-10">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary-container leading-tight">
          Elevate Your State in{' '}
          <span className="bg-gradient-to-r from-secondary-container via-secondary to-on-tertiary-container bg-clip-text text-transparent drop-shadow-sm">
            15 Minutes.
          </span>
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Microscopic lipid encapsulation delivering 300% faster, up to 90%
          bioavailable absorption. No 90-minute guessing game.
        </p>
      </div>

      <div className="flex flex-col gap-space-xs pt-space-2xs relative z-10">
        <Link
          to={shopUrl}
          prefetch="intent"
          className="w-full h-12 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md active:scale-95 transition-transform"
        >
          <span>Shop Bestsellers</span>
          <span aria-hidden="true" className="icon text-[18px]">
            arrow_forward
          </span>
        </Link>
        <a
          href="#science-mobile"
          className="w-full h-11 rounded-full bg-surface-container-low text-primary-container font-label-md text-label-md flex items-center justify-center gap-space-xs active:bg-surface-container-high transition-colors"
        >
          <span
            aria-hidden="true"
            className="icon text-[16px] text-primary-container"
          >
            science
          </span>
          <span>Explore The Science</span>
        </a>
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-between py-space-xs px-space-sm rounded-lg bg-surface-container-low/70 backdrop-blur-sm">
        <p className="flex items-center gap-space-2xs">
          <span
            aria-hidden="true"
            className="flex items-center text-secondary-container"
          >
            {Array.from({length: 5}, (_, index) => (
              <span key={index} className="icon icon-filled text-[16px]">
                star
              </span>
            ))}
          </span>
          <span className="font-label-sm text-label-sm font-bold text-on-surface">
            {RATING.score}
          </span>
          <span className="font-scientific-code text-scientific-code text-on-surface-variant">
            {RATING.reviews}
          </span>
        </p>
        <p className="flex items-center gap-1 text-on-surface-variant">
          <span aria-hidden="true" className="icon text-[15px] text-secondary">
            verified
          </span>
          <span className="font-label-sm text-label-sm font-medium">
            {AWARD}
          </span>
        </p>
      </div>

      {/* Showcase card */}
      <div className="relative w-full rounded-lg bg-surface-container-lowest p-space-md shadow-md flex flex-col gap-space-sm overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-secondary-container/15 via-tertiary-container/5 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none"
        />

        <div className="flex items-center justify-between z-10">
          <span className="py-1 px-space-xs rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold flex items-center gap-1">
            <span aria-hidden="true" className="icon text-[14px]">
              timer
            </span>
            15-Min Onset Peak
          </span>
          <span className="font-scientific-code text-scientific-code text-on-surface-variant font-semibold">
            VESIsorb® N-01
          </span>
        </div>

        <div className="relative w-full h-48 rounded overflow-hidden bg-surface-container-high/40 flex items-center justify-center">
          {collection?.image && (
            <Image
              data={collection.image}
              alt={collection.image.altText || collection.title}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          )}
          <span className="absolute bottom-2 left-2 py-1 px-space-xs rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm flex items-center gap-1">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"
            />
            Clinical Bioavailability
          </span>
        </div>

        <ul className="flex items-center justify-between gap-space-2xs pt-space-2xs">
          {STRAINS.map((strain, index) => (
            <li
              key={strain.label}
              className={`flex-1 py-1.5 px-space-xs rounded-full font-label-sm text-label-sm flex items-center justify-center gap-1 ${
                index === 0
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant font-medium'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full ${strain.dot}`}
              />
              {strain.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
