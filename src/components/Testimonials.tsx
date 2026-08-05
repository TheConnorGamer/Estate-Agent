import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FaQuoteLeft } from 'react-icons/fa'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
  rating: number
  property: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Lord & Lady Cavendish',
    role: 'Buyers, Belgravia',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote: 'Sterling & Park handled our acquisition of a Grade II listed townhouse on Eaton Square with the utmost discretion and professionalism. Their knowledge of the area and negotiation skills were simply unparalleled.',
    rating: 5,
    property: 'Eaton Square Townhouse',
  },
  {
    id: 2,
    name: 'Jonathan Beaumont',
    role: 'Seller, Hampstead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    quote: 'After interviewing five agents, we chose Sterling & Park for their honest valuation and strategic approach. They achieved £750,000 above our asking price within four weeks.',
    rating: 5,
    property: 'Hampstead Modernist Villa',
  },
  {
    id: 3,
    name: 'The Montgomery Family',
    role: 'Buyers, Richmond',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'Victoria and her team made what could have been a stressful relocation from New York completely seamless. They understood exactly what we were looking for and delivered beyond our expectations.',
    rating: 5,
    property: 'Richmond Park Estate',
  },
  {
    id: 4,
    name: 'Sir David Whitmore',
    role: 'Seller, Mayfair',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'Exceptional service from start to finish. The team\'s network of international buyers meant we had competing offers within days. I would not hesitate to recommend Sterling & Park.',
    rating: 5,
    property: 'Mayfair Penthouse',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  const t = testimonials[current]

  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Client Stories
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-white mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-body leading-relaxed">
            Discretion, dedication, and results - hear from those who have trusted us with their most valuable assets.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote icon */}
              <FaQuoteLeft className="text-copper text-4xl mx-auto mb-8 opacity-50" />

              {/* Quote */}
              <blockquote className="font-heading text-2xl lg:text-3xl text-white leading-relaxed italic mb-10 max-w-2xl mx-auto">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <HiStar key={i} className="text-copper" size={20} />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-copper/30"
                />
                <div className="text-left">
                  <p className="text-white font-body font-medium">{t.name}</p>
                  <p className="text-white/50 text-sm font-body">{t.role}</p>
                </div>
              </div>

              <p className="text-copper text-xs font-body tracking-wider uppercase mt-4">
                {t.property}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 text-white/60 flex items-center justify-center hover:bg-white hover:text-navy transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <HiChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 text-white/60 flex items-center justify-center hover:bg-white hover:text-navy transition-all duration-300"
            aria-label="Next testimonial"
          >
            <HiChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-[2px] bg-copper' : 'w-2 h-[2px] bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
