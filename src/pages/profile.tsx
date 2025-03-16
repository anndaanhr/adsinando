import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, CreditCard, Gift, LogOut, Key, Library, Clock, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { gameData } from '@/data/games'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('library')

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    joinDate: 'March 2023',
    gamesOwned: 12,
    wishlistCount: 8
  }

  // Mock owned games - in a real app, this would come from an API
  const ownedGameIds = [1, 3, 4, 6, 7, 9]
  const ownedGames = gameData.filter(game => ownedGameIds.includes(game.id))

  // Mock recent orders
  const recentOrders = [
    {
      id: 'ORD-2458613',
      date: '2025-03-10',
      total: 89.98,
      items: [
        { name: 'Elden Ring', platform: 'Steam', price: 47.99 },
        { name: 'Cyberpunk 2077', platform: 'GOG', price: 29.99 },
      ],
      status: 'Completed'
    },
    {
      id: 'ORD-2356198',
      date: '2025-02-21',
      total: 25.99,
      items: [
        { name: 'World War Z: Aftermath', platform: 'Epic', price: 25.99 }
      ],
      status: 'Completed'
    }
  ]

  // Mock wishlist - in a real app, this would come from an API
  const wishlistGameIds = [2, 5, 8, 10]
  const wishlistGames = gameData.filter(game => wishlistGameIds.includes(game.id))

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === 'library' ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => setActiveTab('library')}
                >
                  <Library className="mr-2 h-4 w-4" />
                  Game Library
                </Button>
                <Button
                  variant={activeTab === 'orders' ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => setActiveTab('orders')}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Order History
                </Button>
                <Button
                  variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>

              <div className="mt-6 rounded-lg bg-muted/50 p-3">
                <div className="text-sm font-medium">Account Summary</div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span>{user.joinDate}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Games Owned:</span>
                  <span>{user.gamesOwned}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Wishlist Items:</span>
                  <span>{user.wishlistCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Using conditional rendering instead of forceMount */}
          {activeTab === 'library' && (
            <Card>
              <CardHeader>
                <CardTitle>Game Library</CardTitle>
                <CardDescription>
                  Games you own and their activation keys
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ownedGames.length > 0 ? (
                  <div className="space-y-6">
                    {ownedGames.map(game => (
                      <div key={game.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row">
                        <div className="h-24 w-40 overflow-hidden rounded-md">
                          <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <h3 className="font-semibold">{game.title}</h3>
                              <div className="flex flex-wrap gap-2">
                                {game.platforms.map(platform => (
                                  <Badge key={platform} variant="outline">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {game.developer} • Added on {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Button size="sm" className="gap-1">
                              <Key className="h-3 w-3" />
                              View Key
                            </Button>
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                            {/* This would open the launcher or store page in a real app */}
                            <Button size="sm" variant="ghost">
                              Platform Page
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Library className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Your library is empty</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Games you purchase will appear here with their activation keys.
                    </p>
                    <Button asChild className="mt-4">
                      <Link to="/store">Browse Store</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View your past orders and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-6">
                    {recentOrders.map(order => (
                      <div key={order.id} className="rounded-lg border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${order.total.toFixed(2)}</div>
                            <Badge variant={order.status === 'Completed' ? 'outline' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <div>
                                {item.name} <span className="text-muted-foreground">({item.platform})</span>
                              </div>
                              <div>${item.price.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your order history will appear here once you make a purchase.
                    </p>
                    <Button asChild className="mt-4">
                      <Link to="/store">Browse Store</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'wishlist' && (
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>
                  Games you're interested in purchasing later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistGames.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {wishlistGames.map(game => (
                      <div key={game.id} className="rounded-lg border p-4">
                        <div className="flex gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-md">
                            <img
                              src={game.imageUrl}
                              alt={game.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">{game.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {game.platforms.join(', ')}
                                </div>
                              </div>
                              <div className="text-right font-semibold">
                                ${(game.discountedPrice || game.price).toFixed(2)}
                              </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" className="w-full gap-1">
                                Add to Cart
                              </Button>
                              <Button size="sm" variant="ghost" className="px-2">
                                ×
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Your wishlist is empty</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Add games to your wishlist to track them for future purchases.
                    </p>
                    <Button asChild className="mt-4">
                      <Link to="/store">Browse Store</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Personal Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                          type="text"
                          className="w-full rounded-md border bg-background px-3 py-2"
                          value={user.name}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                          type="email"
                          className="w-full rounded-md border bg-background px-3 py-2"
                          value={user.email}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Password</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Payment Methods</h3>
                    <div className="rounded-lg border border-dashed p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No payment methods saved yet.
                      </p>
                      <Button variant="outline" className="mt-2 gap-1">
                        <CreditCard className="h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Email Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="marketing" className="h-4 w-4" />
                        <label htmlFor="marketing" className="text-sm">
                          Receive marketing emails about deals and new games
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="wishlist" className="h-4 w-4" defaultChecked />
                        <label htmlFor="wishlist" className="text-sm">
                          Notify me when wishlist items go on sale
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="orders" className="h-4 w-4" defaultChecked />
                        <label htmlFor="orders" className="text-sm">
                          Order and game key confirmations
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
