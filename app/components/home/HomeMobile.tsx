import type {HomeData} from '~/routes/_index';

export function HomeMobile({data}: {data: HomeData}) {
  return (
    <section className="px-margin-mobile py-space-2xl">
      <p className="font-label-sm text-label-sm uppercase text-secondary">
        Mobile layout
      </p>
      <h1 className="mt-space-xs font-display-xl-mobile text-display-xl-mobile text-primary">
        Homepage coming soon
      </h1>
      <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">
        Featured Collection: {data.featuredCollection?.title}
      </p>
    </section>
  );
}