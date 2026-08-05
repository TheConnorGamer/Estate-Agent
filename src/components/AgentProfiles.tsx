import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiPhone, HiMail } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'

interface Agent {
  id: number
  name: string
  role: string
  image: string
  phone: string
  email: string
  bio: string
  deals: number
  experience: string
  speciality: string
}

const agents: Agent[] = [
  {
    id: 1,
    name: 'Alexander Sterling',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    phone: '+44 20 7123 4501',
    email: 'alexander@sterlingpark.co.uk',
    bio: 'With over 20 years in prime central London property, Alexander has overseen some of the most significant transactions in Mayfair and Belgravia.',
    deals: 340,
    experience: '22 years',
    speciality: 'Prime Central London',
  },
  {
    id: 2,
    name: 'Victoria Park',
    role: 'Sales Director',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
    phone: '+44 20 7123 4502',
    email: 'victoria@sterlingpark.co.uk',
    bio: 'Victoria leads our sales team with a reputation for discretion and achieving record prices in Kensington, Chelsea, and Notting Hill.',
    deals: 280,
    experience: '18 years',
    speciality: 'West London Estates',
  },
  {
    id: 3,
    name: 'James Harrington',
    role: 'Senior Negotiator',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    phone: '+44 20 7123 4503',
    email: 'james@sterlingpark.co.uk',
    bio: 'James specialises in Hampstead and Highgate, bringing an architectural background that helps clients see the potential in every property.',
    deals: 195,
    experience: '12 years',
    speciality: 'North London',
  },
  {
    id: 4,
    name: 'Sophie Chen',
    role: 'Lettings Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    phone: '+44 20 7123 4504',
    email: 'sophie@sterlingpark.co.uk',
    bio: 'Sophie manages our luxury lettings portfolio, matching exceptional tenants with extraordinary homes across the capital.',
    deals: 420,
    experience: '10 years',
    speciality: 'Luxury Lettings',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export default function AgentProfiles() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="agents" className="py-24 lg:py-32 pearl-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Our Team
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-navy mt-3 mb-4">
            Trusted Advisors
          </h2>
          <p className="text-slate max-w-xl mx-auto font-body leading-relaxed">
            Meet the experienced professionals dedicated to guiding you through every step of your property journey.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {agents.map((agent) => {
            const isExpanded = expandedId === agent.id
            return (
              <motion.div
                key={agent.id}
                variants={cardVariants}
                className="bg-white group cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : agent.id)}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Stats overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex justify-between text-white text-sm">
                      <div>
                        <p className="font-heading text-2xl font-bold">{agent.deals}+</p>
                        <p className="text-xs text-white/70">Deals Closed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-2xl font-bold">{agent.experience.split(' ')[0]}</p>
                        <p className="text-xs text-white/70">Years Exp.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-heading text-xl text-navy group-hover:text-copper transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-copper text-sm font-body font-medium mb-1">{agent.role}</p>
                  <p className="text-slate text-xs font-body">{agent.speciality}</p>

                  {/* Expanded details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-gray-100">
                        <p className="text-slate text-sm font-body leading-relaxed mb-4">
                          {agent.bio}
                        </p>
                        <div className="space-y-2">
                          <a
                            href={`tel:${agent.phone}`}
                            className="flex items-center gap-2 text-navy text-sm font-body hover:text-copper transition-colors"
                          >
                            <HiPhone className="text-copper" size={15} />
                            {agent.phone}
                          </a>
                          <a
                            href={`mailto:${agent.email}`}
                            className="flex items-center gap-2 text-navy text-sm font-body hover:text-copper transition-colors"
                          >
                            <HiMail className="text-copper" size={15} />
                            {agent.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <button
                    className="mt-4 text-xs text-slate font-body tracking-wider uppercase hover:text-copper transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedId(isExpanded ? null : agent.id)
                    }}
                  >
                    {isExpanded ? 'Show Less' : 'View Profile'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
