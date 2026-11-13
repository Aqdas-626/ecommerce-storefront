import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen bg-cream">
          <Routes>
            {/* Phase 1: homepage only. Shop, Product detail, Cart, Checkout
                and Wishlist routes are added in later phases. */}
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
