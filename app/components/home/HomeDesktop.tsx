import type {HomeData} from '~/routes/_index';
import {HeroDesktop} from './HeroDesktop';
import {ProductGridDesktop} from './ProductGridDesktop';
import { TrustStripDesktop } from './TrustStrip';
import { ScienceDesktop } from './ScienceSection';

export function HomeDesktop({data}: {data: HomeData}) {
  return (
    <>
      <HeroDesktop collection={data.featuredCollection} />
      <TrustStripDesktop />
      <ProductGridDesktop products={data.featuredCollection?.products.nodes ?? []} />
      <ScienceDesktop />
    </>
  );
}
