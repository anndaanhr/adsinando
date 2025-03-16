import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Share2, Heart, ShoppingCart, Award, Check, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { gameData } from '@/data/games'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  // Find the game with the matching ID
  const game = gameData.find((g) => g.id === Number(id))

  // If game not found, show error
  if (!game) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border bg-card p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Game Not Found</h2>
          <p className="mb-6 text-muted-foreground">The game you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/store">Back to Store</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Calculate the discount percentage
  const discountPercentage = game.discountedPrice
    ? Math.round(((game.price - game.discountedPrice) / game.price) * 100)
    : 0

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/store" className="hover:text-foreground">Store</Link>
        <span>/</span>
        <span className="text-foreground">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={game.imageUrl}
              alt={game.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{game.title}</h1>
            <div className="mb-2 flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <Badge key={platform} variant="outline">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">
                    {star <= Math.round(game.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({game.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="rounded-lg border bg-card p-4">
            {game.discountedPrice ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground line-through">
                    ${game.price.toFixed(2)}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${game.discountedPrice.toFixed(2)}
                  </div>
                </div>
                <Badge className="bg-green-500">
                  Save {discountPercentage}%
                </Badge>
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {game.price === 0 ? 'Free to Play' : `$${game.price.toFixed(2)}`}
              </div>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex max-w-[150px] items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <div className="flex-1 px-3 py-2 text-center">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            <div className="rounded-md bg-muted/50 p-3 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="font-medium">In Stock</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>This is a digital product. You will receive a code to redeem on the selected platform.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Game Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-semibold">About This Game</h3>
            <p className="text-muted-foreground">{game.description}</p>
          </TabsContent>
          <TabsContent value="details" className="mt-4 rounded-lg border p-6">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Developer</h4>
                <p>{game.developer}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Publisher</h4>
                <p>{game.publisher}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Release Date</h4>
                <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Platforms</h4>
                <p>{game.platforms.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Genres</h4>
                <p>{game.genres.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Features</h4>
                <p>{game.features.join(', ')}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <Button variant="outline">Write a Review</Button>
            </div>
            <div className="mt-4 space-y-6">
              <div className="rounded-lg bg-muted/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                    <div>
                      <div className="font-medium">Alex S.</div>
                      <div className="text-xs text-muted-foreground">Verified Purchase</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This game exceeds all expectations. The graphics are stunning, gameplay is smooth, and the story is engaging. Highly recommend!
                </p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                    <div>
                      <div className="font-medium">Taylor J.</div>
                      <div className="text-xs text-muted-foreground">Verified Purchase</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    <span>★★★★☆</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Great game overall, but there are some performance issues on older hardware. Otherwise, the content is amazing.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Games */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gameData
            .filter((g) => g.id !== game.id && g.genres.some((genre) => game.genres.includes(genre)))
            .slice(0, 4)
            .map((relatedGame) => (
              <Link key={relatedGame.id} to={`/product/${relatedGame.id}`}>
                <div className="group rounded-lg border bg-card transition-all hover:shadow-md">
                  <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                    <img
                      src={relatedGame.imageUrl}
                      alt={relatedGame.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{relatedGame.title}</h3>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {relatedGame.platforms[0]}
                      </div>
                      {relatedGame.discountedPrice ? (
                        <div className="font-bold text-primary">
                          ${relatedGame.discountedPrice.toFixed(2)}
                        </div>
                      ) : (
                        <div className="font-bold">
                          ${relatedGame.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
