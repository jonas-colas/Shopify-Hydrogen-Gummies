const DESKTOP_ITEMS = [
  {
    icon: 'flash_on',
    title: '15-Min Clinical Onset',
    detail: 'Patented VESIsorb® Delivery',
    circle: 'bg-secondary-container/10',
    iconColor: 'text-secondary-container',
  },
  {
    icon: 'nutrition',
    title: '100% Real Fruit Puree',
    detail: 'Vegan Pectin • Zero Dyes',
    circle: 'bg-primary-container/10',
    iconColor: 'text-primary',
  },
  {
    icon: 'biotech',
    title: 'Triple-Batch Tested',
    detail: 'Zero Pesticides • Verified COA',
    circle: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    icon: 'local_shipping',
    title: 'Free Discreet 24h Ship',
    detail: 'Cold-Pack Insulated on $50+',
    circle: 'bg-surface-container-high',
    iconColor: 'text-primary',
  },
];

const MOBILE_ITEMS = [
  {
    icon: 'bolt',
    label: '15-Min Clinical Onset',
    iconColor: 'text-secondary-container',
  },
  {
    icon: 'nutrition',
    label: '100% Real Fruit Puree (Vegan)',
    iconColor: 'text-secondary',
  },
  {
    icon: 'verified_user',
    label: 'Triple-Batch Tested (COA)',
    iconColor: 'text-primary-container',
  },
  {
    icon: 'ac_unit',
    label: 'Discreet Cold-Pack Shipping',
    iconColor: 'text-on-surface-variant',
  },
];

export function TrustStripDesktop() {
  return (
    <section
      aria-label="Why shop with us"
      className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-lg"
    >
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        {DESKTOP_ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-space-sm p-space-md bg-surface-container-lowest rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <span
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.circle}`}
            >
              <span
                aria-hidden="true"
                className={`icon text-[26px] ${item.iconColor}`}
              >
                {item.icon}
              </span>
            </span>
            <div>
              <p className="font-title-md text-title-md text-primary font-bold">
                {item.title}
              </p>
              <p className="font-scientific-code text-scientific-code text-on-surface-variant">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TrustStripMobile() {
  return (
    <section
      aria-label="Why shop with us"
      className="w-full py-space-xs bg-surface-container-low overflow-x-auto no-scrollbar"
    >
      <ul className="flex items-center gap-space-xs px-margin-mobile w-max">
        {MOBILE_ITEMS.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-space-xs py-2 px-space-sm rounded-full bg-surface-container-lowest shadow-sm"
          >
            <span
              aria-hidden="true"
              className={`icon text-[18px] ${item.iconColor}`}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm font-semibold text-on-surface whitespace-nowrap">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}