import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {HomeDesktop} from '~/components/home/HomeDesktop';
import {HomeMobile} from '~/components/home/HomeMobile';

export type HomeData = Route.ComponentProps['loaderData'];

export const meta: Route.MetaFunction = () => {
  return [{title: 'Gummies | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const {collection} = await context.storefront.query(
    FEATURED_COLLECTION_QUERY,
    {variables: {handle: FEATURED_COLLECTION}},
  );

  return {
    featuredCollection: collection ?? undefined,
  };
}

/**
 * Data below the fold, streamed in after the first render.
 * Never throw here: a failed query should not turn the page into a 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  // "Customer Favorites" section: products of this collection
  const favorites = context.storefront
    .query(FAVORITES_QUERY, {variables: {handle: FAVORITES_COLLECTION}})
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {favorites};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="md:hidden">
        <HomeMobile data={data} />
      </div>
      <div className="hidden md:block">
        <HomeDesktop data={data} />
      </div>
    </>
  );
}

/** Collection behind the homepage hero and product grid */
const FEATURED_COLLECTION = 'kanha-gummies';


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment HomeGridProduct on Product {
    id
    title
    handle
    description
    tags
    availableForSale
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
    badge: metafield(namespace: "custom", key: "badge") {
      value
    }
    dosage: metafield(namespace: "custom", key: "dosage") {
      value
    }
    highlight: metafield(namespace: "custom", key: "highlight") {
      value
    }
    packSize: metafield(namespace: "custom", key: "pack_size") {
      value
    }
  }
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 4) {
      nodes {
        ...HomeGridProduct
      }
    }
  }
  query FeaturedCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...FeaturedCollection
    }
  }
` as const;

/** Collection behind the homepage "Customer Favorites" section */
const FAVORITES_COLLECTION = 'customer-favorites';

const FAVORITES_QUERY = `#graphql
  fragment FavoriteProduct on Product {
    id
    title
    handle
    description
    tags
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
    badge: metafield(namespace: "custom", key: "badge") {
      value
    }
    dosage: metafield(namespace: "custom", key: "dosage") {
      value
    }
    packSize: metafield(namespace: "custom", key: "pack_size") {
      value
    }
    rating: metafield(namespace: "reviews", key: "rating") {
      value
    }
    ratingCount: metafield(namespace: "reviews", key: "rating_count") {
      value
    }
  }
  query HomeFavorites(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      handle
      products(first: 4) {
        nodes {
          ...FavoriteProduct
        }
      }
    }
  }
` as const;
