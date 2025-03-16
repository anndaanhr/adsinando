import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { gameData } from '@/data/games'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  // Mock cart data - in a real app, this would come from a context or state
  const cartItems = [
    { gameId: 1, quantity: 1 },
    { gameId: 4, quantity: 1 },
  ]

  // Get full game data for cart items
  const cartItemsWithData = cartItems.map(item => {
    const game = gameData.find(g => g.id === item.gameId)
    return {
      ...item,
      game
    }
  }).filter(item => item.game)

  // Calculate totals
  const subtotal = cartItemsWithData.reduce((total, item) => {
    if (!item.game) return total
    const price = item.game.discountedPrice || item.game.price
    return total + (price * item.quantity)
  }, 0)

  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page (in a real app)
      navigate('/success')
    }, 2000)
  }

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column - Payment Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your purchase to receive your game keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Billing Information */}
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-medium">Billing Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input type="email" id="email" required />
                      <p className="text-xs text-muted-foreground">
                        Game keys will be sent to this email address
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="mb-4 text-lg font-medium">Payment Method</h3>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit-card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <label htmlFor="expiryDate" className="text-sm font-medium">
                            Expiry Date
                          </label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="cvv" className="text-sm font-medium">
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="zipCode" className="text-sm font-medium">
                            Zip Code
                          </label>
                          <Input
                            id="zipCode"
                            placeholder="12345"
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="pt-4">
                      <div className="rounded-lg border border-dashed bg-muted/50 p-6 text-center">
                        <p className="mb-2 text-sm">Click "Complete Purchase" to be redirected to PayPal.</p>
                        <p className="text-xs text-muted-foreground">
                          You'll be able to use your PayPal balance or connected payment methods.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto" className="pt-4">
                      <div className="rounded-lg border border-dashed bg-muted/50 p-6 text-center">
                        <p className="mb-2 text-sm">Click "Complete Purchase" to get cryptocurrency payment details.</p>
                        <p className="text-xs text-muted-foreground">
                          We accept Bitcoin, Ethereum, and several other cryptocurrencies.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button type="submit" className="gap-2" disabled={isProcessing}>
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Complete Purchase
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItemsWithData.map(item => {
                  if (!item.game) return null
                  const price = item.game.discountedPrice || item.game.price

                  return (
                    <div key={item.game.id} className="flex items-start gap-3">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={item.game.imageUrl}
                          alt={item.game.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.game.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {item.quantity} · {item.game.platforms[0]}
                        </div>
                      </div>
                      <div className="text-right">
                        ${(price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3" />
                <span>Secure checkout</span>
              </div>
              <p className="mt-2">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
