import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const footerLinks = {
  properties: {
    title: 'Properties',
    links: [
      { label: 'For Sale', href: '#listings' },
      { label: 'To Rent', href: '#listings' },
      { label: 'New Developments', href: '#' },
      { label: 'International', href: '#' },
      { label: 'Recently Sold', href: '#' },
    ],
  },
  services: {
    title: 'Services',
    links: [
      { label: 'Selling', href: '#' },
      { label: 'Lettings', href: '#' },
      { label: 'Property Management', href: '#' },
      { label: 'Valuations', href: '#' },
      { label: 'Mortgage Advice', href: '#mortgage' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#agents' },
      { label: 'Our Team', href: '#agents' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#alerts' },
    ],
  },
}

const socialLinks = [
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm bg-copper flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-white">S</span>
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold leading-tight text-white">
                  Sterling
                </h2>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/50">
                  &amp; Park
                </p>
              </div>
            </div>

            <p className="text-white/60 font-body text-sm leading-relaxed mb-8 max-w-sm">
              Sterling &amp; Park is a premier independent estate agency specialising in the sale
              and letting of exceptional properties across London&apos;s most desirable neighbourhoods.
            </p>

            <div className="space-y-3">
              <a href="tel:+442071234567" className="flex items-center gap-3 text-white/60 hover:text-copper transition-colors text-sm font-body">
                <HiPhone className="text-copper" size={16} />
                +44 20 7123 4567
              </a>
              <a href="mailto:enquiries@sterlingpark.co.uk" className="flex items-center gap-3 text-white/60 hover:text-copper transition-colors text-sm font-body">
                <HiMail className="text-copper" size={16} />
                enquiries@sterlingpark.co.uk
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm font-body">
                <HiLocationMarker className="text-copper flex-shrink-0 mt-0.5" size={16} />
                <span>
                  45 Mayfair Square<br />
                  London W1K 2HP<br />
                  United Kingdom
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 text-white/50 flex items-center justify-center hover:bg-copper hover:border-copper hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-body font-medium text-sm tracking-wider uppercase mb-6">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-copper transition-colors text-sm font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-body">
            &copy; {new Date().getFullYear()} Sterling &amp; Park. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 transition-colors text-xs font-body"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <p className="text-white/20 text-[11px] font-body leading-relaxed">
            Sterling &amp; Park is a trading name of Sterling &amp; Park Estate Agents Ltd,
            registered in England and Wales (No. 12345678). Registered office: 45 Mayfair Square,
            London W1K 2HP. We are members of The Property Ombudsman and ARLA Propertymark.
          </p>
        </div>
      </div>
    </footer>
  )
}
