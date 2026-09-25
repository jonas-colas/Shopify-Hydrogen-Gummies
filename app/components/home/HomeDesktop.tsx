import type {HomeData} from '~/routes/_index';

export function HomeDesktop({data}: {data: HomeData}) {
  return (
    <section className="mx-auto max-w-[1440px] px-margin py-space-3xl">
      <p className="font-label-sm text-label-sm uppercase text-secondary">
        Desktop layout
      </p>
      <h1 className="mt-space-xs font-display-xl text-display-xl text-primary">
        Homepage coming soon
      </h1>
      <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">
        Featured Collection: {data.featuredCollection?.title}
      </p>
    </section>
  );
}