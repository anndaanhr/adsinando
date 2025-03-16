import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gameData } from '@/data/games'

// Mock cart data - in a real app, this would come from a cart context or state manager
interface CartItem {
  gameId: number
  quantity: number
}

export default function CartPage() {
  // In a real app, these would be stored in context or state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { gameId: 1, quantity: 1 },
    { gameId: 4, quantity: 1 },
  ])
  const [promoCode, setPromoCode] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Get full game data for cart items
  const cartItemsWithData = cartItems.map(item => {
    const game = gameData.find(g => g.id === item.gameId)
    return {
      ...item,
      game
    }
  }).filter(item => item.game) // Filter out any items where the game doesn't exist

  // Calculate totals
  const subtotal = cartItemsWithData.reduce((total, item) => {
    if (!item.game) return total
    const price = item.game.discountedPrice || item.game.price
    return total + (price * item.quantity)
  }, 0)

  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax - discountAmount

  // Apply promo code
  const handleApplyPromo = () => {
    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      // Example promo code logic
      if (promoCode.toLowerCase() === 'zafago10') {
        setDiscountAmount(subtotal * 0.1) // 10% discount
      } else if (promoCode.toLowerCase() === 'welcome20') {
        setDiscountAmount(subtotal * 0.2) // 20% discount
      } else {
        alert('Invalid promo code')
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  // Remove item from cart
  const removeItem = (gameId: number) => {
    setCartItems(cartItems.filter(item => item.gameId !== gameId))
  }

  // Update item quantity
  const updateQuantity = (gameId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map(item =>
      item.gameId === gameId ? { ...item, quantity: newQuantity } : item
    ))
  }

  // If cart is empty
  if (cartItemsWithData.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
        <div className="rounded-lg border bg-card p-8 text-center">
          <div className="mb-4 flex justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added any games to your cart yet.
          </p>
          <Button asChild>
            <Link to="/store">Browse Games</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Cart Items ({cartItemsWithData.length})</h2>
              <div className="divide-y">
                {cartItemsWithData.map(item => {
                  if (!item.game) return null
                  const price = item.game.discountedPrice || item.game.price

                  return (
                    <div key={item.game.id} className="py-4">
                      <div className="flex items-start gap-4">
                        <div className="h-20 w-32 overflow-hidden rounded-md">
                          <img
                            src={item.game.imageUrl}
                            alt={item.game.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <Link to={`/product/${item.game.id}`} className="font-medium hover:underline">
                              {item.game.title}
                            </Link>
                            <div className="text-right font-medium">
                              ${(price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="mb-2 text-sm text-muted-foreground">
                            {item.game.platforms.join(', ')}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.game!.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.game!.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.game!.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="ml-1 hidden sm:inline">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isApplyingPromo}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={!promoCode || isApplyingPromo}
                    >
                      {isApplyingPromo ? 'Applying...' : 'Apply'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Try codes: ZAFAGO10, WELCOME20
                  </p>
                </div>

                {/* Checkout Button */}
                <Button asChild className="mt-6 w-full">
                  <Link to="/checkout" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="pt-4 text-center text-xs text-muted-foreground">
                  <p>Secure payment processing</p>
                  <p className="mt-1">All game keys are delivered instantly after payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link to="/store">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
