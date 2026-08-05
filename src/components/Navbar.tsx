import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiPhone, HiSearch } from 'react-icons/hi'

const navLinks = [
  { label: 'Properties', href: '#listings' },
  { label: 'Agents', href: '#agents' },
  { label: 'Mortgage', href: '#mortgage' },
  { label: 'Areas', href: '#map' },
  { label: 'Contact', href: '#alerts' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500 ${
              scrolled ? 'bg-navy' : 'bg-white'
            }`}>
              <span className={`font-heading text-2xl font-bold transition-colors duration-500 ${
                scrolled ? 'text-white' : 'text-navy'
              }`}>
                S
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-heading text-xl font-semibold leading-tight transition-colors duration-500 ${
                scrolled ? 'text-navy' : 'text-white'
              }`}>
                Sterling
              </h1>
              <p className={`text-xs tracking-[0.25em] uppercase transition-colors duration-500 ${
                scrolled ? 'text-slate' : 'text-white/70'
              }`}>
                &amp; Park
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-body tracking-wide transition-all duration-300 relative group ${
                  scrolled ? 'text-navy/80 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-copper transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+442071234567"
              className={`hidden md:flex items-center gap-2 text-sm font-body transition-colors duration-500 ${
                scrolled ? 'text-navy hover:text-copper' : 'text-white hover:text-copper'
              }`}
            >
              <HiPhone className="text-copper" />
              <span>+44 20 7123 4567</span>
            </a>

            <button
              className={`hidden md:block px-5 py-2.5 text-sm font-body font-medium tracking-wide uppercase transition-all duration-300 ${
                scrolled
                  ? 'bg-copper text-white hover:bg-navy'
                  : 'border border-white/40 text-white hover:bg-white hover:text-navy'
              }`}
            >
              Valuation
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 transition-colors duration-500 ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
              aria-label="Open menu"
            >
              <HiMenu size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-copper flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-white">S</span>
                </div>
                <h1 className="font-heading text-xl font-semibold text-white">Sterling &amp; Park</h1>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <HiX size={28} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-white font-heading text-3xl py-3 hover:text-copper transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="px-6 pb-8">
              <a
                href="tel:+442071234567"
                className="flex items-center justify-center gap-2 text-white/70 hover:text-copper transition-colors mb-4"
              >
                <HiPhone className="text-copper" />
                <span>+44 20 7123 4567</span>
              </a>
              <button className="w-full bg-copper text-white py-3 font-body font-medium tracking-wide uppercase text-sm hover:bg-[#a0652d] transition-colors">
                Request Valuation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
