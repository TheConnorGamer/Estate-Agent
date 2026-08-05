import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What areas does Sterling & Park cover?',
    answer: 'We specialise in Prime Central London including Mayfair, Belgravia, Kensington, Chelsea, Knightsbridge, and Notting Hill, as well as North London areas such as Hampstead, Highgate, and St John\'s Wood. We also cover Richmond, Wimbledon, and select Surrey locations.',
  },
  {
    id: 2,
    question: 'How do you value a property?',
    answer: 'Our valuation process combines extensive market data analysis with our team\'s deep local knowledge. We consider recent comparable sales, current market conditions, unique property features, and renovation potential. Every valuation is personally conducted by a senior team member and is free of charge with no obligation.',
  },
  {
    id: 3,
    question: 'What fees do you charge for selling?',
    answer: 'Our fee structure is tailored to each property and includes a bespoke marketing package. We offer competitive rates with no hidden costs. All fees are agreed upon in writing before we begin marketing your property. Contact us for a personalised quote based on your specific requirements.',
  },
  {
    id: 4,
    question: 'Do you offer lettings and property management?',
    answer: 'Yes, our lettings department manages an exclusive portfolio of high-end rental properties across London. We offer full property management services including tenant sourcing, referencing, rent collection, maintenance coordination, and regular property inspections.',
  },
  {
    id: 5,
    question: 'How long does the buying process take?',
    answer: 'A typical purchase from offer acceptance to completion takes 8-12 weeks, though this can vary depending on the complexity of the transaction and the chain involved. Our team works proactively to keep things moving, liaising with solicitors, surveyors, and all parties involved.',
  },
  {
    id: 6,
    question: 'Can you help with mortgage advice?',
    answer: 'Absolutely. We work with a panel of trusted independent mortgage brokers who specialise in high-value and complex lending. They can advise on the most suitable mortgage products for your circumstances, including high-net-worth lending, international buyers, and self-employed applicants.',
  },
  {
    id: 7,
    question: 'Do you work with international buyers?',
    answer: 'Yes, a significant portion of our clientele are international buyers. We have extensive experience assisting clients relocating from overseas, navigating UK property laws, tax implications, and currency exchange. We can coordinate virtual viewings and provide comprehensive remote support.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-24 lg:py-32 pearl-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Questions & Answers
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-navy mt-3 mb-4">
            Frequently Asked
          </h2>
          <p className="text-slate max-w-xl mx-auto font-body leading-relaxed">
            Everything you need to know about working with Sterling & Park.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className="bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-body font-medium pr-8 transition-colors ${
                    isOpen ? 'text-copper' : 'text-navy group-hover:text-copper'
                  }`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 transition-colors ${
                      isOpen ? 'text-copper' : 'text-slate'
                    }`}
                  >
                    <HiChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate font-body leading-relaxed text-sm border-t border-gray-50 pt-4 mx-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate font-body text-sm mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="#alerts"
            className="btn-dark-outline inline-block"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
