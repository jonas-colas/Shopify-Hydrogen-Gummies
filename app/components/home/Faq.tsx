const FAQS = [
  {
    question: 'How fast do KANHA Nano gummies kick in?',
    answer:
      'Most users begin noticing effects within 10 to 15 minutes of chewing. Thanks to the VESIsorb® colloidal lipid technology, cannabinoids are absorbed directly through oral mucosal membranes and the upper gastrointestinal tract, completely avoiding the conventional 60–90 minute liver-metabolism bottleneck.',
  },
  {
    question: 'What is the recommended beginner dosage?',
    answer:
      'Each gummy contains 10mg of active THC. If you are new to fast-acting edibles, we advise taking half a gummy (5mg) or one gummy. Because the onset is swift (under 15 minutes), you do not need to wait hours to assess how your body responds.',
  },
  {
    question: 'How does VESIsorb® differ from standard water-soluble nano?',
    answer:
      'Standard water-soluble nano technology uses harsh synthetic surfactants that degrade quickly and leave a bitter metallic aftertaste. VESIsorb® is a pharmaceutical-grade, self-assembling colloidal system utilizing natural lipids. It yields droplets under 100nm that mirror human digestive micelle formation for 300% higher bioavailability and natural fruit taste.',
  },
  {
    question: 'Are KANHA gummies 100% vegan and gluten-free?',
    answer:
      'Yes. All KANHA gummies are made exclusively with pure citrus pectin, real fruit puree, and organic botanical terpenes. We never use animal gelatin, high-fructose corn syrup, or artificial food colorings.',
  },
];

/*
 * Native <details> accordions: they open and close without JavaScript.
 * All <details> with the same `name` form one group, so opening one
 * question closes the others.
 */

export function FaqDesktop() {
  return (
    <section className="max-w-[960px] mx-auto px-margin-mobile lg:px-margin py-space-2xl">
      <div className="text-center mb-space-xl">
        <p className="font-scientific-code text-scientific-code uppercase text-secondary font-bold tracking-wider mb-space-2xs">
          Knowledge Base
        </p>
        <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
          Everything you need to know about our patented nano-emulsion process.
        </p>
      </div>

      <div className="space-y-space-sm">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            name="faq-desktop"
            className="group bg-surface-container-lowest rounded p-space-md shadow-sm"
          >
            <summary className="flex items-center justify-between gap-space-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden font-title-lg text-title-lg text-primary font-bold">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="icon text-outline group-hover:text-primary transition-transform duration-200 group-open:rotate-180"
              >
                expand_more
              </span>
            </summary>
            <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs border-t border-surface-container">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FaqMobile() {
  return (
    <section className="px-margin-mobile py-space-md flex flex-col gap-space-sm">
      <h2 className="font-headline-sm text-headline-sm text-primary-container">
        Frequently Asked
      </h2>
      <div className="flex flex-col gap-space-2xs">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            name="faq-mobile"
            className="group rounded bg-surface-container-lowest p-space-sm shadow-sm"
          >
            <summary className="flex items-center justify-between gap-space-xs cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none font-title-md text-title-md text-primary-container font-semibold">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="icon transition-transform group-open:rotate-180 text-secondary"
              >
                expand_more
              </span>
            </summary>
            <p className="pt-space-xs font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}