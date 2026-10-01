import {Link} from 'react-router';

const SHOP_URL = '/collections/all';
const CTA = 'Try KANHA Risk-Free';

export function GuaranteeDesktop() {
  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
      <div className="bg-gradient-to-r from-primary-container via-tertiary-container to-secondary rounded-lg p-space-xl lg:p-space-2xl text-on-primary shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl relative overflow-hidden">
        <div className="max-w-xl text-center lg:text-left">
          <p className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs bg-surface-container-lowest/20 rounded-full mb-space-sm">
            <span
              aria-hidden="true"
              className="icon text-[18px] text-secondary-fixed"
            >
              verified_user
            </span>
            <span className="font-scientific-code text-scientific-code font-bold tracking-wider">
              30-DAY BIO-PROMISE
            </span>
          </p>
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg font-bold mb-space-xs">
            100% Satisfaction Guaranteed.
          </h2>
          <p className="font-body-lg text-body-lg text-surface-container-highest">
            Triple lab-tested, doctor-formulated. Try KANHA Nano Risk-Free for
            30 Days. If you do not feel the onset in 15 minutes, your order is
            completely refunded.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            to={SHOP_URL}
            prefetch="intent"
            className="px-space-2xl py-space-md bg-surface-container-lowest text-primary hover:bg-surface-container rounded-full font-label-lg text-label-lg shadow-lg hover:scale-105 transition-all inline-block font-bold"
          >
            {CTA}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function GuaranteeMobile() {
  return (
    <section className="px-margin-mobile py-space-sm">
      <div className="w-full rounded-lg bg-surface-container-high p-space-md flex flex-col gap-space-xs">
        <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
          <span aria-hidden="true" className="icon text-[22px]">
            health_and_safety
          </span>
        </span>
        <h2 className="font-title-lg text-title-lg text-primary-container font-bold">
          100% Onset Guarantee
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          If you do not feel noticeable, elevated effects within 20 minutes, we
          will promptly refund your order or replace it with a customized
          formulation. No hurdles.
        </p>
        <div className="pt-space-2xs">
          <Link
            to={SHOP_URL}
            prefetch="intent"
            className="inline-block py-2.5 px-space-md rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold active:scale-95 transition-transform"
          >
            {CTA}
          </Link>
        </div>
      </div>
    </section>
  );
}