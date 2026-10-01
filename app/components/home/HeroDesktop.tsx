import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

// Marketing claims from the design. Keep only what is true for your products.
const RATING = {score: '4.9 / 5.0', reviews: '(13,000+ Reviews)'};
const AWARD = 'Voted Best Fast-Acting Edible 2024';
const STRAINS = [
  {label: 'Sativa', flavor: 'Cran-Pome', labelColor: 'text-secondary'},
  {
    label: 'Hybrid',
    flavor: 'Cherry Berry',
    labelColor: 'text-secondary-container',
  },
  {label: 'Indica', flavor: 'Marionberry', labelColor: 'text-primary'},
];

type HeroDesktopProps = {
  /** The homepage's featured collection: its image and link drive the hero */
  collection?: FeaturedCollectionFragment;
};

export function HeroDesktop({collection}: HeroDesktopProps) {
  const shopUrl = collection
    ? `/collections/${collection.handle}`
    : '/collections/all';

  return (
    <section className="relative max-w-[1440px] mx-auto px-margin-mobile lg:px-margin pt-space-xl lg:pt-space-3xl pb-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
        {/* Text and buttons */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-space-md">
          <p className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-surface-container-high/80 backdrop-blur-md rounded-full text-primary shadow-sm">
            <span
              aria-hidden="true"
              className="icon icon-filled text-[18px] text-secondary-container"
            >
              bolt
            </span>
            <span className="font-scientific-code text-scientific-code uppercase tracking-wider font-bold">
              PATENTED VESIsorb® NANOTECHNOLOGY • 15-MIN RAPID ONSET
            </span>
          </p>

          <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl text-primary tracking-tight font-bold">
            Elevate Your State in{' '}
            <span className="bg-gradient-to-r from-secondary-container via-tertiary-container to-primary bg-clip-text text-transparent">
              15 Minutes
            </span>
            .
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Award-winning vegan gummies engineered with microscopic lipid
            encapsulation for 300% faster, up to 90% bioavailable absorption.
            Real fruit puree, zero delay, and predictable elevation every single
            time.
          </p>

          <div className="pt-space-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm w-full sm:w-auto">
            <Link
              to={shopUrl}
              prefetch="intent"
              className="h-[52px] px-space-xl bg-primary-container hover:bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
            >
              <span>Shop Bestsellers</span>
              <span aria-hidden="true" className="icon text-[18px]">
                arrow_forward
              </span>
            </Link>
            <a
              href="#science"
              className="h-[52px] px-space-lg bg-surface-container-lowest hover:bg-surface-container text-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-sm hover:-translate-y-0.5 transition-all"
            >
              <span
                aria-hidden="true"
                className="icon text-[18px] text-secondary"
              >
                science
              </span>
              <span>Explore The Science</span>
            </a>
          </div>

          {/* Social proof */}
          <div className="pt-space-md flex flex-wrap items-center gap-space-md">
            <p className="flex items-center gap-space-2xs bg-surface-container-lowest px-space-sm py-space-xs rounded-full shadow-sm">
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
              <span className="font-label-md text-label-md text-primary font-bold ml-1">
                {RATING.score}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                {RATING.reviews}
              </span>
            </p>
            <p className="flex items-center gap-space-xs text-on-surface-variant font-scientific-code text-scientific-code">
              <span
                aria-hidden="true"
                className="icon text-[18px] text-secondary"
              >
                workspace_premium
              </span>
              {AWARD}
            </p>
          </div>
        </div>

        {/* Visual card */}
        <div className="lg:col-span-5 relative">
          <div className="relative bg-gradient-to-br from-surface-container-high/90 via-surface-container-lowest to-surface-container rounded-lg p-space-lg shadow-xl overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 flex items-center justify-between pb-space-md">
              <p className="flex items-center gap-space-xs">
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full bg-secondary-container animate-pulse"
                />
                <span className="font-scientific-code text-scientific-code uppercase text-primary font-bold">
                  Fast-Acting Nano Matrix
                </span>
              </p>
              <span className="bg-surface-container-lowest/80 backdrop-blur-sm px-space-xs py-space-2xs rounded-full font-scientific-code text-scientific-code text-secondary font-bold">
                BATCH #KH-984
              </span>
            </div>

            <div className="relative z-10 rounded overflow-hidden shadow-md group">
              {collection?.image ? (
                <Image
                  data={collection.image}
                  alt={collection.image.altText || collection.title}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-80 bg-surface-container" />
              )}

              <div className="absolute bottom-space-md left-space-md right-space-md bg-surface-container-lowest/90 backdrop-blur-md p-space-sm rounded shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                    <span aria-hidden="true" className="icon text-[20px]">
                      timer
                    </span>
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm uppercase text-secondary">
                      Onset Rate
                    </p>
                    <p className="font-title-md text-title-md text-primary font-bold">
                      15-Minute Peak
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-outline">
                    Traditional
                  </p>
                  <p className="font-scientific-code text-scientific-code text-on-surface-variant line-through">
                    60-90 Mins
                  </p>
                </div>
              </div>
            </div>

            <ul className="relative z-10 grid grid-cols-3 gap-space-xs pt-space-md">
              {STRAINS.map((strain) => (
                <li
                  key={strain.label}
                  className="p-space-xs bg-surface-container-lowest/90 rounded text-center shadow-sm"
                >
                  <p
                    className={`font-label-sm text-label-sm uppercase font-bold ${strain.labelColor}`}
                  >
                    {strain.label}
                  </p>
                  <p className="font-body-sm text-body-sm text-primary font-semibold truncate">
                    {strain.flavor}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
