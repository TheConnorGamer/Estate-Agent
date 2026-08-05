import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiCheck } from 'react-icons/hi'

export default function Alerts() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [buyRent, setBuyRent] = useState<'buy' | 'rent' | 'both'>('buy')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [areas, setAreas] = useState('')

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setCooldown(true)
    setTimeout(() => { setSubmitted(false); setCooldown(false) }, 5000)
  }

  return (
    <section id="alerts" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
              Stay Informed
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl text-navy mt-3 mb-6">
              Property Alerts
            </h2>
            <p className="text-slate font-body leading-relaxed mb-8">
              Be the first to know about new listings that match your criteria. Our clients receive
              exclusive early access to off-market properties before they reach the open market.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Early Access', desc: 'Off-market properties before they go public' },
                { title: 'Tailored Matches', desc: 'Only properties that match your exact criteria' },
                { title: 'Market Insights', desc: 'Quarterly reports on price movements and trends' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiCheck className="text-copper" size={16} />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-navy">{item.title}</h4>
                    <p className="text-slate text-sm font-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-pearl p-8 lg:p-10 rounded-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="honeypot" value="" onChange={() => {}} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
                <h3 className="font-heading text-2xl text-navy mb-1">Set Up Your Alert</h3>
                <p className="text-slate text-sm font-body">Fill in your preferences below.</p>

                {/* Name */}
                <div>
                  <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => { const n = { ...p }; delete n.name; return n }) }}
                    placeholder="Your name"
                    className={`w-full bg-white border px-4 py-3 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-body">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => { const n = { ...p }; delete n.email; return n }) }}
                    placeholder="your@email.com"
                    className={`w-full bg-white border px-4 py-3 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 font-body">{errors.email}</p>}
                </div>

                {/* Buy/Rent */}
                <div>
                  <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                    I'm looking to
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'buy', label: 'Buy' },
                      { value: 'rent', label: 'Rent' },
                      { value: 'both', label: 'Both' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBuyRent(opt.value as typeof buyRent)}
                        className={`flex-1 px-4 py-3 text-sm font-body transition-all duration-300 ${
                          buyRent === opt.value
                            ? 'bg-navy text-white'
                            : 'bg-white text-navy border border-gray-200 hover:border-navy'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                      Min Price
                    </label>
                    <select
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors"
                    >
                      <option value="">No min</option>
                      <option value="500000">{'£'}500,000</option>
                      <option value="1000000">{'£'}1,000,000</option>
                      <option value="2000000">{'£'}2,000,000</option>
                      <option value="5000000">{'£'}5,000,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                      Max Price
                    </label>
                    <select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors"
                    >
                      <option value="">No max</option>
                      <option value="1000000">{'£'}1,000,000</option>
                      <option value="2000000">{'£'}2,000,000</option>
                      <option value="5000000">{'£'}5,000,000</option>
                      <option value="10000000">{'£'}10,000,000+</option>
                    </select>
                  </div>
                </div>

                {/* Areas */}
                <div>
                  <label className="block text-xs text-slate uppercase tracking-wider mb-1 font-body">
                    Preferred Areas
                  </label>
                  <input
                    type="text"
                    maxLength={200}
                    value={areas}
                    onChange={(e) => setAreas(e.target.value)}
                    placeholder="e.g. Kensington, Chelsea, Mayfair"
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-navy font-body text-sm focus:outline-none focus:border-copper transition-colors"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={cooldown}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full py-4 font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'bg-copper text-white hover:bg-navy'
                  }`}
                >
                  {submitted ? (
                    <>
                      <HiCheck size={18} />
                      Alert Created Successfully
                    </>
                  ) : (
                    <>
                      <HiMail size={18} />
                      Create Property Alert
                    </>
                  )}
                </motion.button>

                <p className="text-slate/60 text-xs text-center font-body">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
