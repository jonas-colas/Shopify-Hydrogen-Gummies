import {NavLink} from 'react-router';
import {toRelativeUrl} from '~/lib/menu';

type MenuLinkProps = {
  item: {id: string; title: string; url?: string | null};
  primaryDomainUrl: string;
  publicStoreDomain: string;
  className?: string;
};

/**
 * One Shopify menu item. Links to this store navigate inside the app;
 * links to other sites open in a new tab.
 */
export function MenuLink({
  item,
  primaryDomainUrl,
  publicStoreDomain,
  className,
}: MenuLinkProps) {
  if (!item.url) return null;

  const url = toRelativeUrl(item.url, primaryDomainUrl, publicStoreDomain);

  if (!url.startsWith('/')) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.title}
      </a>
    );
  }

  return (
    <NavLink to={url} end prefetch="intent" className={className}>
      {item.title}
    </NavLink>
  );
}
