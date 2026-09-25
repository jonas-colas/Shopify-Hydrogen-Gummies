import type {LinkDescriptor} from 'react-router';

/**
 * Google Fonts for the design system. Allowed by the
 * Content-Security-Policy in app/entry.server.tsx.
 */

const TEXT_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap';

/**
 * Material Symbols Outlined, limited to the icons the designs use
 * (about 8 KB instead of about 4 MB for the full font).
 * When you use a new icon, add its name here, or it shows up as plain text.
 */
const ICON_NAMES = [
  'ac_unit',
  'add',
  'analytics',
  'arrow_back',
  'arrow_forward',
  'autorenew',
  'bed',
  'biotech',
  'blur_on',
  'bolt',
  'check',
  'check_circle',
  'chevron_right',
  'clean_hands',
  'close',
  'download',
  'eco',
  'electric_bolt',
  'expand_more',
  'favorite',
  'favorite_border',
  'flash_on',
  'grid_view',
  'health_and_safety',
  'home',
  'hourglass_bottom',
  'inventory_2',
  'local_fire_department',
  'local_shipping',
  'lock',
  'medication',
  'menu',
  'nature',
  'nutrition',
  'person',
  'remove',
  'replay',
  'schedule',
  'science',
  'search',
  'shopping_bag',
  'show_chart',
  'spa',
  'star',
  'timer',
  'timer_10',
  'trending_down',
  'verified',
  'verified_user',
  'workspace_premium',
];

const ICONS_URL = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=${[...ICON_NAMES].sort().join(',')}&display=block`;

export const fontLinks: LinkDescriptor[] = [
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {rel: 'stylesheet', href: TEXT_FONTS_URL},
  {rel: 'stylesheet', href: ICONS_URL},
];