/**
 * Static testimonials from the design: placeholders until a reviews app
 * (Judge.me, Shopify Product Reviews…) is connected. Replace with real
 * reviews from your customers before launch.
 */
const SUMMARY = {rating: '4.9', buyers: '13,000+'};

const REVIEWS = [
  {
    name: 'Ernie C.',
    rating: 5,
    onset: 'Felt in 12 mins',
    quote:
      "So good. Love the real fruit flavor. Didn't think it would actually hit so fast, but WOW. 'Fast-acting' is no joke. Perfect when you don't want to wait an hour and a half for relief.",
    product: 'Nano Hybrid Cherry Berry Blaze',
  },
  {
    name: 'David K.',
    rating: 5,
    onset: 'Felt in 14 mins',
    quote:
      'Never had a sativa gummy actually work with this kind of laser clarity until I tried this one! I was able to get into creative flow within 15 minutes without any couch-lock or brain fog.',
    product: 'Nano Sativa Cran-Pomegranate',
  },
  {
    name: 'Camie D.',
    rating: 5,
    onset: 'Felt in 15 mins',
    quote:
      'You already know I pop one of these when I get off work and just melt into the couch. So clean, zero next-day grogginess, and taste exactly like fresh real blackberries.',
    product: 'FX Tranquility Sleep (CBN)',
  },
];

/** Row of 5 stars: filled up to the rating, outlined after */
function Stars({rating, size}: {rating: number; size: string}) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center text-secondary-container"
    >
      {Array.from({length: 5}, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`icon ${size} ${index < rating ? 'icon-filled' : ''}`}
        >
          star
        </span>
      ))}
    </span>
  );
}

export function ReviewsDesktop() {
  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-2xl">
      <div className="text-center max-w-2xl mx-auto mb-space-xl">
        <div className="inline-flex mb-space-xs">
          <Stars rating={5} size="text-[18px]" />
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          {SUMMARY.rating} Stars from {SUMMARY.buyers} Buyers
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Real experiences from verified daily consumers who made the switch to
          nano-absorption.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {REVIEWS.map((review) => (
          <li key={review.name} className="flex">
            <article className="w-full bg-surface-container-lowest rounded p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <p className="flex items-center gap-space-xs">
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {review.name}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs text-[#059669] font-bold">
                      <span aria-hidden="true" className="icon text-[14px]">
                        check_circle
                      </span>
                      Verified
                    </span>
                  </p>
                  <span className="bg-surface-container px-space-xs py-space-2xs rounded-full font-scientific-code text-scientific-code text-primary font-bold">
                    {review.onset}
                  </span>
                </div>
                <div className="mb-space-sm">
                  <Stars rating={review.rating} size="text-[16px]" />
                </div>
                <blockquote className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  “{review.quote}”
                </blockquote>
              </div>
              <p className="pt-space-md mt-space-md text-outline font-scientific-code text-scientific-code">
                Product: {review.product}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ReviewsMobile() {
  return (
    <section className="py-space-md flex flex-col gap-space-sm">
      <div className="px-margin-mobile flex items-center justify-between">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary-container">
            Real 15-Minute Proof
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Validated customer experiences
          </p>
        </div>
        <p className="flex items-center gap-1 text-secondary-container">
          <span aria-hidden="true" className="icon icon-filled text-[20px]">
            star
          </span>
          <span className="font-title-md text-title-md font-bold text-on-surface">
            {SUMMARY.rating}
          </span>
        </p>
      </div>

      {/* Horizontal rail: swipe sideways through the reviews */}
      <ul className="flex gap-space-xs overflow-x-auto no-scrollbar px-margin-mobile pb-1">
        {REVIEWS.map((review) => (
          <li key={review.name} className="flex">
            <article className="min-w-[280px] max-w-[280px] p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-xs">
              <div className="flex flex-col gap-space-2xs">
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} size="text-[15px]" />
                  <span className="py-0.5 px-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-scientific-code text-scientific-code font-bold">
                    {review.onset}
                  </span>
                </div>
                <blockquote className="font-body-sm text-body-sm text-on-surface italic line-clamp-3">
                  “{review.quote}”
                </blockquote>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-md text-label-md font-semibold text-primary-container">
                  {review.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span
                    aria-hidden="true"
                    className="icon text-[14px] text-secondary"
                  >
                    verified
                  </span>
                  Verified Buyer
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
