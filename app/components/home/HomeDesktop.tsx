import type {HomeData} from '~/routes/_index';
import {HeroDesktop} from './HeroDesktop';
import {ProductGridDesktop} from './ProductGridDesktop';

export function HomeDesktop({data}: {data: HomeData}) {
  return (
    <>
      <HeroDesktop collection={data.featuredCollection} />
      <ProductGridDesktop products={data.featuredCollection?.products.nodes ?? []} />
    </>
  );
}
