import type {HomeData} from '~/routes/_index';
import {HeroMobile} from './HeroMobile';

export function HomeMobile({data}: {data: HomeData}) {
  return (
    <>
      <HeroMobile collection={data.featuredCollection} />
      {/* Next sections go here */}
    </>
  );
}
