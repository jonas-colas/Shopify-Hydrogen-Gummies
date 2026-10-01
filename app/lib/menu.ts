import type {FooterQuery} from 'storefrontapi.generated';

/**
 * Shopify menu items contain full URLs. Links to this store become
 * paths (/collections/all) so they navigate inside the app.
 */
export function toRelativeUrl(
  url: string,
  primaryDomainUrl: string,
  publicStoreDomain: string,
) {
  if (url.startsWith('/')) return url;

  const isInternal =
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl);

  return isInternal ? new URL(url).pathname : url;
}

/**
 * Footer menu convention (Admin → Content → Menus → Footer menu):
 * - top-level items WITH sub-items become columns (heading + links)
 * - top-level items WITHOUT sub-items become the small bottom links
 */
export function splitFooterMenu(menu: FooterQuery['menu'] | undefined) {
  const items = menu?.items ?? [];

  return {
    columns: items.filter((item) => item.items.length > 0),
    links: items.filter((item) => item.items.length === 0),
  };
}
