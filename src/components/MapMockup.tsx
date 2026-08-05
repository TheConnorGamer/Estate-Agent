import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiLocationMarker, HiArrowRight } from 'react-icons/hi'

interface Area {
  id: string
  name: string
  avgPrice: string
  properties: number
  description: string
  x: number
  y: number
}

const areas: Area[] = [
  { id: 'mayfair', name: 'Mayfair', avgPrice: '£8.2M', properties: 24, description: 'Prestigious garden squares and elegant Georgian townhouses in the heart of the West End.', x: 55, y: 48 },
  { id: 'kensington', name: 'Kensington', avgPrice: '£5.6M', properties: 38, description: 'White stucco terraces, garden squares and world-class museums on your doorstep.', x: 38, y: 55 },
  { id: 'chelsea', name: 'Chelsea', avgPrice: '£4.1M', properties: 42, description: 'Artistic heritage meets riverside living on the King\'s Road and Cheyne Walk.', x: 42, y: 65 },
  { id: 'hampstead', name: 'Hampstead', avgPrice: '£3.8M', properties: 29, description: 'Village charm with the Heath on your doorstep - a countryside escape within London.', x: 48, y: 28 },
  { id: 'belgravia', name: 'Belgravia', avgPrice: '£9.5M', properties: 18, description: 'The epitome of grandeur - white stucco embassies and Eaton Square gardens.', x: 52, y: 58 },
  { id: 'nottinghill', name: 'Notting Hill', avgPrice: '£3.2M', properties: 35, description: 'Pastel-coloured townhouses, the famous Portobello Market, and leafy communal gardens.', x: 34, y: 48 },
  { id: 'stjohnswood', name: "St John's Wood", avgPrice: '£4.5M', properties: 22, description: 'Leafy avenues, the iconic Lord\'s Cricket Ground, and a relaxed village atmosphere.', x: 42, y: 38 },
  { id: 'richmond', name: 'Richmond', avgPrice: '£2.8M', properties: 31, description: 'Riverside splendour with Richmond Park\'s 2,500 acres of ancient woodland.', x: 25, y: 72 },
]

export default function MapMockup() {
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  const active = areas.find((a) => a.id === (hoveredArea || activeArea))

  return (
    <section id="map" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Our Coverage
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-navy mt-3 mb-4">
            Prime London Areas
          </h2>
          <p className="text-slate max-w-xl mx-auto font-body leading-relaxed">
            From the elegance of Mayfair to the charm of Richmond, explore the neighbourhoods where we operate.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Map visualization */}
          <div className="lg:col-span-2 relative">
            <div
              className="relative aspect-[4/3] max-w-2xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #f0ece6 0%, #e8e3da 50%, #dfd9ce 100%)',
                borderRadius: '4px',
                boxShadow: '0 0 0 1px rgba(15,26,46,0.05), 0 20px 60px rgba(15,26,46,0.08)',
              }}
            >
              {/* Water - Thames */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Thames River */}
                <path
                  d="M0 62 Q15 58 30 64 Q45 70 55 58 Q65 46 80 54 Q90 58 100 52"
                  fill="none"
                  stroke="#b8c4d0"
                  strokeWidth="2.5"
                  opacity="0.6"
                />
                <path
                  d="M0 65 Q15 61 30 67 Q45 73 55 61 Q65 49 80 57 Q90 61 100 55"
                  fill="none"
                  stroke="#b8c4d0"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                {/* Grid lines */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1={0}
                    y1={i * 10}
                    x2={100}
                    y2={i * 10}
                    stroke="rgba(15,26,46,0.06)"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 10}
                    y1={0}
                    x2={i * 10}
                    y2={100}
                    stroke="rgba(15,26,46,0.06)"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Area markers */}
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  className="absolute z-20 group"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label={area.name}
                >
                  <motion.div
                    animate={{
                      scale: (hoveredArea || activeArea) === area.id ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <HiLocationMarker
                      className={`transition-colors duration-300 ${
                        (hoveredArea || activeArea) === area.id
                          ? 'text-copper'
                          : 'text-navy'
                      }`}
                      size={28}
                    />
                  </motion.div>
                </button>
              ))}

              {/* Label for map */}
              <div className="absolute top-4 left-4">
                <span className="text-navy/40 font-body text-xs tracking-wider uppercase">Greater London</span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="text-navy/25 font-body text-[10px]">For illustration purposes</span>
              </div>
            </div>
          </div>

          {/* Area details panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-pearl p-8 rounded-sm"
                >
                  <span className="text-copper text-[10px] tracking-[0.2em] uppercase font-body font-medium">
                    Area Guide
                  </span>
                  <h3 className="font-heading text-3xl text-navy mt-2 mb-3">{active.name}</h3>
                  <p className="text-slate text-sm font-body leading-relaxed mb-6">
                    {active.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200 mb-6">
                    <div>
                      <p className="text-navy font-heading text-2xl font-bold">{active.avgPrice}</p>
                      <p className="text-slate text-xs font-body">Avg. Price</p>
                    </div>
                    <div>
                      <p className="text-navy font-heading text-2xl font-bold">{active.properties}</p>
                      <p className="text-slate text-xs font-body">Properties</p>
                    </div>
                  </div>

                  <a
                    href="#listings"
                    className="flex items-center gap-2 text-navy font-body text-sm font-medium hover:text-copper transition-colors group"
                  >
                    View properties in {active.name}
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-pearl p-8 rounded-sm text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
                    <HiLocationMarker className="text-slate" size={22} />
                  </div>
                  <h3 className="font-heading text-xl text-navy mb-2">Explore Areas</h3>
                  <p className="text-slate text-sm font-body leading-relaxed">
                    Click on a marker or hover over the map pins to discover property insights for each neighbourhood.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Area quick links */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
              className={`px-4 py-2 text-xs font-body tracking-wider transition-all duration-300 ${
                activeArea === area.id
                  ? 'bg-navy text-white'
                  : 'text-slate border border-gray-200 hover:border-navy hover:text-navy'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
