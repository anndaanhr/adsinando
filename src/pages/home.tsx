import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { gameData } from '@/data/games'

export default function HomePage() {
  // Get featured games (first 6)
  const featuredGames = gameData.slice(0, 6)

  // Get popular categories
  const categories = [
    { name: 'Action', icon: '🎮', slug: 'action' },
    { name: 'Adventure', icon: '🌄', slug: 'adventure' },
    { name: 'RPG', icon: '⚔️', slug: 'rpg' },
    { name: 'Strategy', icon: '🧠', slug: 'strategy' },
    { name: 'Sports', icon: '⚽', slug: 'sports' },
    { name: 'Simulation', icon: '🏙️', slug: 'simulation' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary/20 px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-small-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative space-y-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl">
              Step Into <span className="text-primary">ZafaGo</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Unleash your gaming spirit with epic titles. Get the best game codes for Steam and Epic Games at amazing prices.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/store">
                  Browse Store
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/deals">
                  View Special Offers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="container space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hot Games</h2>
            <Link to="/store" className="flex items-center gap-1 text-primary">
              View all games
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGames.map((game) => (
              <Link key={game.id} to={`/product/${game.id}`}>
                <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{game.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {game.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        {game.discountedPrice ? (
                          <>
                            <div className="text-sm text-muted-foreground line-through">
                              ${game.price.toFixed(2)}
                            </div>
                            <div className="font-bold text-primary">
                              ${game.discountedPrice.toFixed(2)}
                            </div>
                            <Badge className="ml-1 bg-green-500">
                              Save {Math.round(((game.price - game.discountedPrice) / game.price) * 100)}%
                            </Badge>
                          </>
                        ) : (
                          <div className="font-bold">${game.price.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/50 px-4 py-12 md:py-16">
        <div className="container space-y-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/store?category=${category.slug}`}
                className="group rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="text-center">
                  <div className="mb-2 text-4xl">{category.icon}</div>
                  <h3 className="text-sm font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Partners */}
      <section className="px-4 py-12 md:py-16">
        <div className="container space-y-8">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Our Platform Partners</h2>
          <p className="mx-auto max-w-3xl text-center text-muted-foreground">
            ZafaGo provides game keys that can be redeemed on these popular gaming platforms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://cdn.akamai.steamstatic.com/store/about/logo_steam.svg"
                alt="Steam Logo"
                className="h-12 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Epic_Games_logo.png"
                alt="Epic Games Logo"
                className="h-10 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://cdn.worldvectorlogo.com/logos/gog-galaxy.svg"
                alt="GOG Logo"
                className="h-8 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ubisoft_logo.svg/1280px-Ubisoft_logo.svg.png"
                alt="Ubisoft Logo"
                className="h-8 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 px-4 py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to Unlock Your Next Gaming Adventure?
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Create a free account to track your orders, build a wishlist, and get personalized game recommendations.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/register">
                Create Account
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
