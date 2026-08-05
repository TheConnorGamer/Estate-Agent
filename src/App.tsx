import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Listings from './components/Listings'
import MortgageCalculator from './components/MortgageCalculator'
import AgentProfiles from './components/AgentProfiles'
import MapMockup from './components/MapMockup'
import Testimonials from './components/Testimonials'
import Alerts from './components/Alerts'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Listings />
        <MortgageCalculator />
        <AgentProfiles />
        <MapMockup />
        <Testimonials />
        <Alerts />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
