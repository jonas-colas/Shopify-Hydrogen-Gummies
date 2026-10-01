import {Link} from 'react-router';

const WHITEPAPER_URL = '/pages/science';
const COA_URL = '/pages/lab-results';

const DESKTOP_STATS = [
  {
    value: '15 Min',
    label: 'Verified Peak Onset',
    color: 'text-secondary-container',
  },
  {value: '300%', label: 'Higher Bio-Availability', color: 'text-on-primary'},
  {
    value: '<100nm',
    label: 'Colloidal Particle Size',
    color: 'text-primary-fixed-dim',
  },
];

const MOBILE_STATS = [
  {value: '15m', label: 'Onset Peak', color: 'text-secondary-fixed'},
  {value: '300%', label: 'Bioactivity', color: 'text-primary-fixed'},
  {value: '<100nm', label: 'Micelle Size', color: 'text-on-tertiary-container'},
];

// Chart colours, same values as the design tokens
const NANO = '#fb7800'; // secondary-container
const TRADITIONAL = '#7c7480'; // outline

/** id="science" is the target of the hero's "Explore The Science" button */
export function ScienceDesktop() {
  return (
    <section
      id="science"
      className="scroll-mt-32 max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-2xl"
    >
      <div className="bg-primary text-on-primary rounded-xl p-space-lg lg:p-space-2xl relative overflow-hidden shadow-2xl">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
          {/* Text */}
          <div className="lg:col-span-6 space-y-space-md">
            <p className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs bg-primary-container text-on-primary-fixed rounded-full">
              <span
                aria-hidden="true"
                className="icon text-[16px] text-secondary-container"
              >
                biotech
              </span>
              <span className="font-scientific-code text-scientific-code uppercase font-bold tracking-wider">
                Patented VESIsorb® Delivery System
              </span>
            </p>

            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg tracking-tight font-bold">
              Why Nano Changes Everything You Know About Edibles.
            </h2>
            <p className="font-body-md text-body-md text-surface-container-highest leading-relaxed">
              Cannabinoids are naturally hydrophobic oil molecules that your
              body struggles to absorb through the stomach, resulting in the
              dreaded 60–90 minute lag and 80% waste in liver metabolism.
            </p>
            <p className="font-body-md text-body-md text-surface-container-highest leading-relaxed">
              KANHA utilizes patented Swiss VESIsorb® nanotech to envelop active
              molecules in microscopic self-assembling colloidal droplets
              (&lt;100nm). This unlocks rapid sublingual and direct intestinal
              mucosal bypass.
            </p>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-sm">
              {DESKTOP_STATS.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`p-space-sm bg-primary-container/60 rounded ${
                    index === 2 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <p
                    className={`font-headline-md text-headline-md font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </p>
                  <p className="font-scientific-code text-scientific-code text-surface-container-highest">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>

            <div className="pt-space-xs flex items-center gap-space-md">
              <Link
                to={WHITEPAPER_URL}
                prefetch="intent"
                className="inline-flex items-center gap-space-xs text-secondary-container hover:text-on-secondary-fixed-variant font-label-lg text-label-lg transition-colors"
              >
                <span>Read Clinical Whitepaper</span>
                <span aria-hidden="true" className="icon text-[16px]">
                  arrow_forward
                </span>
              </Link>
              <span aria-hidden="true" className="text-outline">
                /
              </span>
              <Link
                to={COA_URL}
                prefetch="intent"
                className="inline-flex items-center gap-space-xs text-on-primary hover:text-primary-fixed-dim font-label-lg text-label-lg transition-colors"
              >
                <span>Download Batch COAs</span>
                <span aria-hidden="true" className="icon text-[16px]">
                  download
                </span>
              </Link>
            </div>
          </div>

          {/* Chart */}
          <figure className="lg:col-span-6 bg-surface-container-lowest/10 backdrop-blur-xl p-space-lg rounded-lg shadow-inner">
            <figcaption className="flex items-center justify-between pb-space-md">
              <span className="font-title-md text-title-md text-on-primary font-bold">
                Blood Plasma Concentration Curve
              </span>
              <span className="font-scientific-code text-scientific-code text-secondary-container bg-primary-container/80 px-space-xs py-space-2xs rounded">
                Clinical Pharmacokinetic Data
              </span>
            </figcaption>

            <div className="relative w-full h-64 flex items-end">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
                role="img"
                aria-label="Nano gummies peak at 15 minutes; traditional gummies peak after about 60 minutes"
              >
                <defs>
                  <linearGradient id="nanoGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={NANO} />
                    <stop offset="100%" stopColor={NANO} stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[20, 80, 140].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    x2="380"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeDasharray="3 3"
                  />
                ))}
                <line
                  x1="40"
                  x2="380"
                  y1="170"
                  y2="170"
                  stroke="rgba(255,255,255,0.3)"
                />

                {/* Traditional gummy: slow, late peak */}
                <path
                  d="M 40 170 Q 120 168 180 140 T 260 90 T 320 130 T 380 165"
                  fill="none"
                  stroke={TRADITIONAL}
                  strokeDasharray="4 4"
                  strokeWidth="2.5"
                />

                {/* Nano gummy: fast 15-minute peak */}
                <path
                  d="M 40 170 Q 70 30 110 35 T 200 70 T 300 130 T 380 168"
                  fill="none"
                  stroke={NANO}
                  strokeWidth="4"
                />
                <path
                  d="M 40 170 Q 70 30 110 35 T 200 70 T 300 130 T 380 168 L 380 170 Z"
                  fill="url(#nanoGradient)"
                  opacity="0.3"
                />
                <circle
                  cx="100"
                  cy="35"
                  r="5"
                  fill="#ffffff"
                  stroke={NANO}
                  strokeWidth="3"
                />
              </svg>

              <span className="absolute top-4 left-24 bg-secondary-container text-on-primary px-space-xs py-space-2xs rounded font-scientific-code text-scientific-code font-bold shadow-md">
                15-Min Peak Cmax (300% Higher)
              </span>
            </div>

            <div className="flex items-center justify-between pt-space-sm text-surface-container-highest font-scientific-code text-scientific-code">
              <span>0m</span>
              <span>15m (Rapid Peak)</span>
              <span>60m (Traditional Lag)</span>
              <span>120m</span>
              <span>180m</span>
            </div>

            <div className="flex items-center gap-space-lg pt-space-md">
              <p className="flex items-center gap-space-xs">
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full bg-secondary-container"
                />
                <span className="font-body-sm text-body-sm text-on-primary font-semibold">
                  KANHA Nano (VESIsorb®)
                </span>
              </p>
              <p className="flex items-center gap-space-xs">
                <span
                  aria-hidden="true"
                  className="w-3 h-1 bg-outline rounded"
                />
                <span className="font-body-sm text-body-sm text-surface-container-highest">
                  Traditional Sugar Gummy
                </span>
              </p>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** id="science-mobile" is the target of the mobile hero's science button */
export function ScienceMobile() {
  return (
    <section
      id="science-mobile"
      className="scroll-mt-24 px-margin-mobile py-space-sm"
    >
      <div className="w-full rounded-lg bg-primary-container text-on-primary p-space-md shadow-xl flex flex-col gap-space-md relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-56 h-56 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 -bottom-16 w-48 h-48 bg-on-tertiary-container/20 rounded-full blur-2xl pointer-events-none"
        />

        <div className="flex flex-col gap-1 relative z-10">
          <p className="inline-flex items-center gap-1.5 text-secondary-fixed">
            <span aria-hidden="true" className="icon text-[16px]">
              biotech
            </span>
            <span className="font-scientific-code text-scientific-code uppercase tracking-wider font-semibold">
              Pharmacokinetics
            </span>
          </p>
          <h2 className="font-headline-sm text-headline-sm text-on-primary tracking-tight">
            Why Nano Changes Everything
          </h2>
          <p className="font-body-sm text-body-sm text-surface-container-high/90">
            Standard edibles bypass direct mucosal pathways, losing up to 80%
            potency in the liver. VESIsorb® breaks cannabinoid molecules into
            self-assembling colloidal droplets under 100nm.
          </p>
        </div>

        {/* Chart */}
        <figure className="w-full bg-primary/60 rounded p-space-sm relative z-10 flex flex-col gap-space-xs">
          <figcaption className="flex items-center justify-between text-surface-container-high">
            <span className="font-scientific-code text-scientific-code">
              Blood Plasma Cannabinoid Level
            </span>
            <span className="font-scientific-code text-scientific-code font-bold text-secondary-fixed">
              15 MIN PEAK
            </span>
          </figcaption>

          <div className="w-full h-32 flex items-center justify-center relative">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 320 120"
              role="img"
              aria-label="Nano gummies peak at 15 minutes; traditional gummies peak after 60 to 90 minutes"
            >
              <defs>
                <linearGradient id="nanoCurveGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={NANO} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={NANO} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[30, 70].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="320"
                  y1={y}
                  y2={y}
                  stroke="#eaedff"
                  strokeDasharray="3,3"
                  strokeOpacity="0.1"
                />
              ))}
              <line
                x1="0"
                x2="320"
                y1="110"
                y2="110"
                stroke="#eaedff"
                strokeOpacity="0.2"
              />

              {/* Time axis */}
              <text
                x="5"
                y="118"
                fill="#dfb7ff"
                fontFamily="Inter"
                fontSize="9"
              >
                0m
              </text>
              <text
                x="65"
                y="118"
                fill={NANO}
                fontFamily="Inter"
                fontSize="9"
                fontWeight="bold"
              >
                15m
              </text>
              <text
                x="170"
                y="118"
                fill="#dfb7ff"
                fontFamily="Inter"
                fontSize="9"
              >
                60m
              </text>
              <text
                x="270"
                y="118"
                fill="#dfb7ff"
                fontFamily="Inter"
                fontSize="9"
              >
                120m
              </text>

              {/* Traditional gummy: slow rise */}
              <path
                d="M 0,110 C 60,110 120,95 190,65 C 240,45 280,60 320,80"
                fill="none"
                stroke={TRADITIONAL}
                strokeDasharray="4,3"
                strokeWidth="2"
              />
              <circle cx="210" cy="60" r="3" fill={TRADITIONAL} />
              <text
                x="180"
                y="52"
                fill="#cdc3d0"
                fontFamily="Inter"
                fontSize="9"
              >
                Traditional (60-90m)
              </text>

              {/* Nano gummy: fast peak */}
              <path
                d="M 0,110 Q 50,15 70,18 T 150,75 T 320,98 L 320,110 L 0,110 Z"
                fill="url(#nanoCurveGrad)"
              />
              <path
                d="M 0,110 Q 50,15 70,18 T 150,75 T 320,98"
                fill="none"
                stroke={NANO}
                strokeWidth="3"
              />
              <circle
                className="animate-pulse"
                cx="68"
                cy="18"
                r="5"
                fill={NANO}
              />
              <text
                x="50"
                y="12"
                fill="#ffdbc8"
                fontFamily="Outfit"
                fontSize="10"
                fontWeight="bold"
              >
                KANHA Nano Peak
              </text>
            </svg>
          </div>
        </figure>

        <ul className="grid grid-cols-3 gap-space-2xs relative z-10">
          {MOBILE_STATS.map((stat) => (
            <li
              key={stat.label}
              className="p-space-xs rounded bg-primary/50 text-center flex flex-col justify-center"
            >
              <span
                className={`font-headline-sm text-headline-sm font-bold ${stat.color}`}
              >
                {stat.value}
              </span>
              <span className="font-label-sm text-label-sm text-surface-container-high">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to={WHITEPAPER_URL}
          prefetch="intent"
          className="inline-flex items-center justify-between py-2 px-space-sm rounded bg-primary/70 text-primary-fixed font-label-md text-label-md hover:bg-primary transition-colors relative z-10"
        >
          <span>Read Full Clinical Whitepaper &amp; Lab Data</span>
          <span aria-hidden="true" className="icon text-[18px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}