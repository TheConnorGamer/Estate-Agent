import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState(750000)
  const [deposit, setDeposit] = useState(150000)
  const [term, setTerm] = useState(25)
  const [rate, setRate] = useState(4.5)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const loanAmount = Math.max(0, price - deposit)
  const monthlyRate = rate / 100 / 12
  const numPayments = term * 12

  const monthlyPayment =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount > 0
      ? loanAmount / numPayments
      : 0

  const totalRepayable = monthlyPayment * numPayments
  const ltv = price > 0 ? ((loanAmount / price) * 100).toFixed(1) : '0.0'

  const displayedMonthly = useCountUp(monthlyPayment, 800, isInView)

  return (
    <section
      ref={sectionRef}
      id="mortgage"
      className="py-24 lg:py-32 bg-navy relative overflow-hidden"
    >
      {/* Background pattern */}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-xs tracking-[0.2em] uppercase font-body font-medium">
            Financial Planning
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-white mt-3 mb-4">
            Mortgage Calculator
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-body leading-relaxed">
            Estimate your monthly payments and see what you could afford.
          </p>
          <div className="w-16 h-[2px] bg-copper mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Sliders - 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            {/* Price */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-white/70 text-sm font-body tracking-wide">Property Price</label>
                <span className="text-white font-heading text-2xl">{formatCurrency(price)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={25000}
                value={price}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setPrice(v)
                  if (deposit > v * 0.95) setDeposit(Math.floor(v * 0.95))
                }}
                className="slider-track w-full"
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>{'£'}100k</span>
                <span>{'£'}5M</span>
              </div>
            </div>

            {/* Deposit */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-white/70 text-sm font-body tracking-wide">Deposit</label>
                <span className="text-white font-heading text-2xl">{formatCurrency(deposit)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.floor(price * 0.95)}
                step={5000}
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="slider-track w-full"
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>{'£'}0</span>
                <span>{formatCurrency(Math.floor(price * 0.95))}</span>
              </div>
            </div>

            {/* Term */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-white/70 text-sm font-body tracking-wide">Term</label>
                <span className="text-white font-heading text-2xl">{term} years</span>
              </div>
              <input
                type="range"
                min={5}
                max={35}
                step={1}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="slider-track w-full"
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>5 years</span>
                <span>35 years</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-white/70 text-sm font-body tracking-wide">Interest Rate</label>
                <span className="text-white font-heading text-2xl">{rate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-track w-full"
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>1%</span>
                <span>10%</span>
              </div>
            </div>
          </div>

          {/* Results - 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm p-8 lg:p-10 shadow-2xl">
              <p className="text-slate text-xs tracking-[0.15em] uppercase font-body font-medium mb-2">
                Your Estimated Payment
              </p>
              <motion.p
                className="font-heading text-5xl lg:text-6xl text-navy mb-8 font-light"
                key={Math.round(monthlyPayment)}
              >
                {formatCurrency(displayedMonthly)}
                <span className="text-base text-slate font-body block mt-1">per month</span>
              </motion.p>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate font-body text-sm">Loan Amount</span>
                  <span className="text-navy font-body font-medium">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate font-body text-sm">Total Repayable</span>
                  <span className="text-navy font-body font-medium">{formatCurrency(totalRepayable)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate font-body text-sm">Loan to Value (LTV)</span>
                  <span className="text-navy font-body font-medium">{ltv}%</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-copper text-white py-3 font-body font-medium tracking-wide uppercase text-sm hover:bg-navy transition-colors duration-300">
                Speak to an Advisor
              </button>

              <p className="text-slate/60 text-xs text-center mt-4 font-body">
                This is an estimate. Actual rates may vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
