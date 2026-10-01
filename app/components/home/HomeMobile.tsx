import type {HomeData} from '~/routes/_index';
import {HeroMobile} from './HeroMobile';
import { ProductGridMobile } from './ProductGridMobile';
import { TrustStripMobile } from './TrustStrip';
import { ScienceMobile } from './ScienceSection';
import { FavoritesMobile } from './Favorites';

export function HomeMobile({data}: {data: HomeData}) {
  return (
    <>
      <HeroMobile collection={data.featuredCollection} />
      <TrustStripMobile />
      <ProductGridMobile products={data.featuredCollection?.products.nodes ?? []} />
      <ScienceMobile />
      <FavoritesMobile favorites={data.favorites} />
    </>
  );
}
