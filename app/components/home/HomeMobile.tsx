import type {HomeData} from '~/routes/_index';
import {HeroMobile} from './HeroMobile';
import { ProductGridMobile } from './ProductGridMobile';

export function HomeMobile({data}: {data: HomeData}) {
  return (
    <>
      <HeroMobile collection={data.featuredCollection} />
      <ProductGridMobile products={data.featuredCollection?.products.nodes ?? []} />
    </>
  );
}
