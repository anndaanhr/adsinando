import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, ShoppingCart, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet'
import { gameData, Game } from '@/data/games'

export default function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredGames, setFilteredGames] = useState<Game[]>(gameData)
  const [search, setSearch] = useState('')

  // Filter states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState('featured')

  // Get all unique platforms and genres
  const allPlatforms = Array.from(new Set(gameData.flatMap(game => game.platforms)))
  const allGenres = Array.from(new Set(gameData.flatMap(game => game.genres)))

  // Apply filters and search
  useEffect(() => {
    // Get query params
    const categoryParam = searchParams.get('category')
    const platformParam = searchParams.get('platform')

    let filtered = [...gameData]

    // Filter by search term
    if (search) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.developer.toLowerCase().includes(search.toLowerCase()) ||
        game.publisher.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by category/genre from URL
    if (categoryParam) {
      filtered = filtered.filter(game =>
        game.genres.some(genre => genre.toLowerCase() === categoryParam.toLowerCase())
      )
    }

    // Filter by platform from URL
    if (platformParam) {
      filtered = filtered.filter(game =>
        game.platforms.some(platform => platform.toLowerCase() === platformParam.toLowerCase())
      )
    }

    // Filter by selected platforms
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(game =>
        game.platforms.some(platform => selectedPlatforms.includes(platform))
      )
    }

    // Filter by selected genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(game =>
        game.genres.some(genre => selectedGenres.includes(genre))
      )
    }

    // Filter by price range
    filtered = filtered.filter(game => {
      const price = game.discountedPrice || game.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort games
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountedPrice || a.price
          const priceB = b.discountedPrice || b.price
          return priceA - priceB
        })
        break
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountedPrice || a.price
          const priceB = b.discountedPrice || b.price
          return priceB - priceA
        })
        break
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        )
        break
      case 'featured':
      default:
        // Keep original order
        break
    }

    setFilteredGames(filtered)
  }, [search, selectedPlatforms, selectedGenres, priceRange, sortBy, searchParams])

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedPlatforms([])
    setSelectedGenres([])
    setPriceRange([0, 100])
    setSortBy('featured')
    setSearch('')
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Game Store</h1>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(selectedPlatforms.length > 0 || selectedGenres.length > 0) && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedPlatforms.length + selectedGenres.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your game search with filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-3 font-medium">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {allPlatforms.map(platform => (
                      <Badge
                        key={platform}
                        variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => togglePlatform(platform)}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-medium">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {allGenres.map(genre => (
                      <Badge
                        key={genre}
                        variant={selectedGenres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-medium">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-medium">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              <SheetFooter className="mt-6 flex-row justify-between sm:justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Reset All
                </Button>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedPlatforms.length > 0 || selectedGenres.length > 0 || search) && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            {search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {search}
                <button onClick={() => setSearch('')} className="ml-1 rounded-full">
                  ×
                </button>
              </Badge>
            )}
            {selectedPlatforms.map(platform => (
              <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                {platform}
                <button onClick={() => togglePlatform(platform)} className="ml-1 rounded-full">
                  ×
                </button>
              </Badge>
            ))}
            {selectedGenres.map(genre => (
              <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                {genre}
                <button onClick={() => toggleGenre(genre)} className="ml-1 rounded-full">
                  ×
                </button>
              </Badge>
            ))}
            {(selectedPlatforms.length > 0 || selectedGenres.length > 0 || search) && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
        </p>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredGames.map(game => (
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
                        {game.platforms.map(platform => (
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
                        </>
                      ) : (
                        <div className="font-bold">
                          {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No Games Found</h2>
          <p className="mb-6 text-muted-foreground">
            We couldn't find any games matching your current filters.
          </p>
          <Button onClick={resetFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  )
}
