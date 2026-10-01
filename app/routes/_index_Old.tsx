import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
// import {MockShopNotice} from '~/components/MockShopNotice';
import {HomeMobile} from '~/components/home/HomeMobile';
import {HomeDesktop} from '~/components/home/HomeDesktop';

export type HomeData = Route.ComponentProps['loaderData'];

export const meta: Route.MetaFunction = () => {
  return [{title: 'Gummies | Home'}];
};

// export async function loader(args: Route.LoaderArgs) {
//   const deferredData = loadDeferredData(args);

//   const criticalData = await loadCriticalData(args);

//   return {...deferredData, ...criticalData};
// }

// async function loadCriticalData({context}: Route.LoaderArgs) {
//   const [{collections}] = await Promise.all([
//     context.storefront.query(FEATURED_COLLECTION_QUERY),
//   ]);

//   return {
//     isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
//     featuredCollection: collections.nodes[0],
//   };
// }

// function loadDeferredData({context}: Route.LoaderArgs) {
//   const recommendedProducts = context.storefront
//     .query(RECOMMENDED_PRODUCTS_QUERY)
//     .catch((error: Error) => {
//       console.error(error);
//       return null;
//     });

//   //   return {
//   //     recommendedProducts,
//   //   };
//   // }
//   // "Customer Favorites" section: products of this collection
//   const favorites = context.storefront
//     .query(FAVORITES_QUERY, {variables: {handle: FAVORITES_COLLECTION}})
//     .catch((error: Error) => {
//       console.error(error);
//       return null;
//     });

//   return {
//     recommendedProducts,
//     favorites,
//   };
// }

// export default function Homepage() {
//   const data = useLoaderData<typeof loader>();
//   return (
//     <>
//       <div className="md:hidden"> <HomeMobile data={data} /> </div>
//       <div className="hidden md:block"> <HomeDesktop data={data} /> </div>
//     </>
//     // <div className="home">
//     //   {data.isShopLinked ? null : <MockShopNotice />}
//     //   <FeaturedCollection collection={data.featuredCollection} />
//     //   <RecommendedProducts products={data.recommendedProducts} />
//     // </div>
//   );
// }

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image
//             data={image}
//             sizes="100vw"
//             alt={image.altText || collection.title}
//           />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     <section
//       className="recommended-products"
//       aria-labelledby="recommended-products"
//     >
//       <h2 id="recommended-products">Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </section>
//   );
// }

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
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
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
