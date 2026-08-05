import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiSearch, HiLocationMarker } from 'react-icons/hi'
import { BiBed, BiBath, BiArea } from 'react-icons/bi'

interface Property {
  id: number
  image: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  type: string
}

const featuredProperties: Property[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    title: 'Kensington Palace Gardens',
    location: 'Kensington, London W8',
    price: '£12,500,000',
    beds: 6,
    baths: 5,
    sqft: 5200,
    type: 'For Sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    title: 'Belgravia Townhouse',
    location: 'Eaton Square, London SW1',
    price: '£8,950,000',
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: 'For Sale',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
    title: 'Hampstead Modernist Villa',
    location: 'Hampstead, London NW3',
    price: '£5,750,000',
    beds: 4,
    baths: 3,
    sqft: 3800,
    type: 'For Sale',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80',
    title: 'Mayfair Penthouse',
    location: 'Grosvenor Square, London W1',
    price: '£15,200,000',
    beds: 4,
    baths: 4,
    sqft: 4500,
    type: 'For Sale',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [searchBuy, setSearchBuy] = useState<'buy' | 'rent'>('buy')
  const [minBeds, setMinBeds] = useState('Any')
  const [maxPrice, setMaxPrice] = useState('Any')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => setCurrent((p) => (p + 1) % featuredProperties.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + featuredProperties.length) % featuredProperties.length), [])

  useEffect(() => {
    timerRef.current = setInterval(next, 6000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  const prop = featuredProperties[current]

  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prop.image})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,26,46,0.3)_100%)] z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 pt-20">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-copper text-white text-xs tracking-[0.2em] uppercase px-3 py-1 mb-6">
            {prop.type}
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight mb-4">
            {prop.title}
          </h1>
          <p className="flex items-center gap-2 text-white/80 text-lg mb-8">
            <HiLocationMarker className="text-copper" />
            {prop.location}
          </p>

          {/* Property stats */}
          <div className="flex gap-8 mb-8">
            <div className="flex items-center gap-2 text-white">
              <BiBed className="text-copper text-xl" />
              <span className="font-body text-sm">{prop.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <BiBath className="text-copper text-xl" />
              <span className="font-body text-sm">{prop.baths} Baths</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <BiArea className="text-copper text-xl" />
              <span className="font-body text-sm">{prop.sqft.toLocaleString()} sq ft</span>
            </div>
          </div>

          <p className="font-heading text-4xl lg:text-5xl text-white font-light mb-8">
            {prop.price}
          </p>

          <a href="#listings" className="btn-primary inline-block">
            View Property
          </a>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {featuredProperties.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-8 h-[3px] bg-copper' : 'w-[3px] h-[3px] bg-white/50 hover:bg-white'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-navy transition-all duration-300"
          aria-label="Previous slide"
        >
          <HiChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-navy transition-all duration-300"
          aria-label="Next slide"
        >
          <HiChevronRight size={22} />
        </button>
      </div>

      {/* Search Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-30"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12 pb-0">
          <div className="bg-white rounded-t-lg shadow-2xl p-6 lg:p-8">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Buy/Rent toggle */}
              <div className="flex bg-pearl rounded-sm p-1">
                {(['buy', 'rent'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSearchBuy(opt)}
                    className={`px-6 py-2.5 text-sm font-body font-medium tracking-wide uppercase transition-all duration-300 rounded-sm ${
                      searchBuy === opt
                        ? 'bg-navy text-white'
                        : 'text-slate hover:text-navy'
                    }`}
                  >
                    {opt === 'buy' ? 'For Sale' : 'To Rent'}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div className="flex-1 min-w-0 w-full sm:min-w-[200px]">
                <label className="block text-xs text-slate uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Area, postcode or town..."
                  className="w-full border-b border-gray-300 py-2 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors bg-transparent"
                />
              </div>

              {/* Beds */}
              <div className="w-full sm:w-[130px]">
                <label className="block text-xs text-slate uppercase tracking-wider mb-1">Beds</label>
                <select
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors bg-transparent"
                >
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
              </div>

              {/* Price */}
              <div className="w-full sm:w-[160px]">
                <label className="block text-xs text-slate uppercase tracking-wider mb-1">Max Price</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors bg-transparent"
                >
                  <option>Any</option>
                  <option>{'£'}500,000</option>
                  <option>{'£'}1,000,000</option>
                  <option>{'£'}2,000,000</option>
                  <option>{'£'}5,000,000</option>
                  <option>{'£'}10,000,000+</option>
                </select>
              </div>

              {/* Search button */}
              <button className="bg-navy text-white px-8 py-3 flex items-center gap-2 font-body font-medium tracking-wide uppercase text-sm hover:bg-copper transition-all duration-300 w-full sm:w-auto">
                <HiSearch size={18} />
                Search
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
