import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiBed, BiBath, BiArea, BiHeart } from 'react-icons/bi'
import { HiLocationMarker, HiFilter } from 'react-icons/hi'

interface Property {
  id: number
  image: string
  title: string
  location: string
  price: string
  type: 'sale' | 'rent'
  beds: number
  baths: number
  sqft: number
  featured: boolean
}

const properties: Property[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', title: 'Kensington Palace Gardens', location: 'Kensington, London W8', price: '£12,500,000', type: 'sale', beds: 6, baths: 5, sqft: 5200, featured: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Belgravia Townhouse', location: 'Eaton Square, London SW1', price: '£8,950,000', type: 'sale', beds: 5, baths: 4, sqft: 4100, featured: true },
  { id: 3, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', title: 'Hampstead Modernist Villa', location: 'Hampstead, London NW3', price: '£5,750,000', type: 'sale', beds: 4, baths: 3, sqft: 3800, featured: false },
  { id: 4, image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', title: 'Mayfair Penthouse', location: 'Grosvenor Square, London W1', price: '£15,200,000', type: 'sale', beds: 4, baths: 4, sqft: 4500, featured: true },
  { id: 5, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Chelsea Riverside Apartment', location: 'Cheyne Walk, London SW3', price: '£3,950,000', type: 'sale', beds: 3, baths: 2, sqft: 2200, featured: false },
  { id: 6, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', title: 'Notting Hill Mews House', location: 'Notting Hill, London W11', price: '£4,200,000', type: 'sale', beds: 3, baths: 3, sqft: 2400, featured: false },
  { id: 7, image: 'https://images.unsplash.com/photo-1600566753086-5a5e3aa2e42b?w=800&q=80', title: 'Richmond Park Estate', location: 'Richmond, London TW10', price: '£6,850,000', type: 'sale', beds: 5, baths: 4, sqft: 4500, featured: false },
  { id: 8, image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80', title: 'St Johns Wood Mansion', location: 'St Johns Wood, London NW8', price: '£9,750,000', type: 'sale', beds: 6, baths: 5, sqft: 5500, featured: false },
  { id: 9, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', title: 'Knightsbridge Duplex', location: 'Knightsbridge, London SW1', price: '£7,500,000', type: 'sale', beds: 3, baths: 3, sqft: 2800, featured: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Listings() {
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all')
  const [bedFilter, setBedFilter] = useState<number>(0)
  const [priceSort, setPriceSort] = useState<'default' | 'low' | 'high'>('default')
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    let result = [...properties]
    if (filter !== 'all') result = result.filter((p) => p.type === filter)
    if (bedFilter > 0) result = result.filter((p) => p.beds >= bedFilter)
    if (priceSort === 'low') result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')))
    if (priceSort === 'high') result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')))
    return result
  }, [filter, bedFilter, priceSort])

  return (
    <section id="listings" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Curated Portfolio
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-navy mt-3 mb-4">
            Exceptional Properties
          </h2>
          <p className="text-slate max-w-xl mx-auto font-body leading-relaxed">
            Discover our hand-picked selection of the finest homes across London&apos;s most desirable neighbourhoods.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { value: 'all', label: 'All Properties' },
              { value: 'sale', label: 'For Sale' },
              { value: 'rent', label: 'To Rent' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={`px-5 py-2 text-sm font-body transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-navy text-white'
                    : 'text-slate hover:text-navy border border-gray-200 hover:border-navy'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={bedFilter}
              onChange={(e) => setBedFilter(Number(e.target.value))}
              className="text-sm font-body text-slate border border-gray-200 px-3 py-2 focus:outline-none focus:border-copper"
            >
              <option value={0}>All Beds</option>
              <option value={2}>2+ Beds</option>
              <option value={3}>3+ Beds</option>
              <option value={4}>4+ Beds</option>
              <option value={5}>5+ Beds</option>
            </select>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as typeof priceSort)}
              className="text-sm font-body text-slate border border-gray-200 px-3 py-2 focus:outline-none focus:border-copper"
            >
              <option value="default">Sort: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((prop) => (
              <motion.article
                key={prop.id}
                variants={cardVariants}
                layout
                className="group cursor-pointer"
              >
                {/* Image container */}
                <div className="relative overflow-hidden aspect-[4/3] mb-5">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-body text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 font-medium">
                      View Details
                    </span>
                  </div>
                  {/* Status badge */}
                  {prop.featured && (
                    <span className="absolute top-4 left-4 bg-copper text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-body font-medium">
                      Featured
                    </span>
                  )}
                  {/* Type badge */}
                  <span className={`absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-body font-medium ${
                    prop.type === 'sale' ? 'bg-white text-navy' : 'bg-navy text-white'
                  }`}>
                    {prop.type === 'sale' ? 'For Sale' : 'To Rent'}
                  </span>
                  {/* Save button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(prop.id) }}
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      savedIds.has(prop.id)
                        ? 'bg-copper text-white'
                        : 'bg-white text-navy hover:bg-copper hover:text-white'
                    }`}
                    aria-label={savedIds.has(prop.id) ? 'Remove from saved' : 'Save property'}
                  >
                    <BiHeart
                      size={18}
                      className={savedIds.has(prop.id) ? 'fill-current' : ''}
                    />
                  </button>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-1.5 text-slate text-sm mb-1.5">
                    <HiLocationMarker className="text-copper" size={14} />
                    <span className="font-body text-xs">{prop.location}</span>
                  </div>
                  <h3 className="font-heading text-xl text-navy mb-3 group-hover:text-copper transition-colors">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-5 text-slate text-sm mb-4">
                    <span className="flex items-center gap-1.5">
                      <BiBed className="text-copper" /> {prop.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BiBath className="text-copper" /> {prop.baths}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BiArea className="text-copper" /> {prop.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  <p className="font-heading text-2xl text-navy font-medium">
                    {prop.price}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Saved count */}
        {savedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <p className="text-slate font-body text-sm">
              <span className="text-copper font-medium">{savedIds.size}</span> {savedIds.size === 1 ? 'property' : 'properties'} saved to your wishlist
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
