import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import AmbientLeaves from './components/AmbientLeaves'
import Home from './pages/Home'
import WhatWeDo from './pages/WhatWeDo'
import About from './pages/About'
import Contact from './pages/Contact'

// Minimum time the animated loading screen stays up, so it always gets to
// finish its leaf/wordmark animation instead of flashing on slow connections.
const MIN_LOADING_MS = 2200

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ''
    }, MIN_LOADING_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <AmbientLeaves />
      <div className="grain-overlay" />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
