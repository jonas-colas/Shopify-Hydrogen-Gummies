import type {HomeData} from '~/routes/_index';
import {HeroDesktop} from './HeroDesktop';

export function HomeDesktop({data}: {data: HomeData}) {
  return (
    <>
      <HeroDesktop collection={data.featuredCollection} />
      {/* Next sections go here */}
    </>
  );
}
