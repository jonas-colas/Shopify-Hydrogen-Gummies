import { Link, useLoaderData } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type { Route } from './+types/lab';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Gummies | Lab' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  const { shop, products } = await context.storefront.query(LAB_QUERY, {
    variables: { first: 3 },
  });

  return {shop, products: products.nodes};
}

export default function Lab() {
  const {shop, products } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{shop.name} Lab</h1>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.handle}`}>
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  alt={product.title}
                  aspectRatio="1/1"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              )}
              <h2 className="mt-2 font-semibold">{product.title}</h2>
              <Money data={product.priceRange.minVariantPrice} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LAB_QUERY = `#graphql
  query Lab($first: Int!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      name
    }
    products(first: $first) {
      nodes {
        id
        handle
        title
        featuredImage {
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
      }
    }
  }
` as const;