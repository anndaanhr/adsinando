import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/components/layout/layout'
import HomePage from '@/pages/home'
import StorePage from '@/pages/store'
import ProductPage from '@/pages/product'
import CartPage from '@/pages/cart'
import CheckoutPage from '@/pages/checkout'
import ProfilePage from '@/pages/profile'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import NotFoundPage from '@/pages/not-found'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="zafago-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
