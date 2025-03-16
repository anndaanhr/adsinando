export interface Game {
  id: number
  title: string
  description: string
  imageUrl: string
  price: number
  discountedPrice?: number
  platforms: string[]
  genres: string[]
  releaseDate: string
  publisher: string
  developer: string
  features: string[]
  rating: number
  reviewCount: number
  inStock: boolean
}

export const gameData: Game[] = [
  {
    id: 1,
    title: 'Elden Ring',
    description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    price: 59.99,
    discountedPrice: 47.99,
    platforms: ['Steam', 'Epic'],
    genres: ['Action', 'RPG', 'Open World'],
    releaseDate: '2022-02-25',
    publisher: 'BANDAI NAMCO',
    developer: 'FromSoftware',
    features: ['Single-player', 'Online Co-op', 'Steam Achievements', 'Controller Support'],
    rating: 4.8,
    reviewCount: 12463,
    inStock: true
  },
  {
    id: 2,
    title: 'Tides of Annihilation',
    description: 'A vast cosmic horror awaits in this cooperative action RPG. Explore eldritch ruins, battle nightmarish creatures, and survive the rising tides that threaten to consume reality itself.',
    imageUrl: 'https://images.unsplash.com/photo-1614277639519-84f1163e5d99',
    price: 49.99,
    platforms: ['Steam'],
    genres: ['Action', 'RPG', 'Horror', 'Co-op'],
    releaseDate: '2024-06-15',
    publisher: 'Depth Interactive',
    developer: 'Abyssal Games',
    features: ['4-Player Co-op', 'Online Multiplayer', 'Steam Workshop', 'Controller Support'],
    rating: 4.5,
    reviewCount: 3892,
    inStock: true
  },
  {
    id: 3,
    title: 'World War Z: Aftermath',
    description: 'World War Z: Aftermath is the ultimate co-op zombie shooter and the next evolution of the original hit World War Z that has now captivated over 15 million players.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/699130/header.jpg',
    price: 39.99,
    discountedPrice: 25.99,
    platforms: ['Steam', 'Epic'],
    genres: ['Action', 'Shooter', 'Zombie', 'Co-op'],
    releaseDate: '2021-09-21',
    publisher: 'Saber Interactive',
    developer: 'Saber Interactive',
    features: ['4-Player Co-op', 'Online Multiplayer', 'PvE', 'Controller Support'],
    rating: 4.1,
    reviewCount: 5631,
    inStock: true
  },
  {
    id: 4,
    title: 'Cyberpunk 2077',
    description: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    price: 59.99,
    discountedPrice: 29.99,
    platforms: ['GOG', 'Steam', 'Epic'],
    genres: ['RPG', 'Open World', 'Sci-fi', 'Action'],
    releaseDate: '2020-12-10',
    publisher: 'CD PROJEKT RED',
    developer: 'CD PROJEKT RED',
    features: ['Single-player', 'Steam Achievements', 'Full Controller Support', 'Steam Cloud'],
    rating: 4.2,
    reviewCount: 8734,
    inStock: true
  },
  {
    id: 5,
    title: 'Red Dead Redemption 2',
    description: 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    price: 59.99,
    discountedPrice: 39.99,
    platforms: ['Steam', 'Epic'],
    genres: ['Action', 'Adventure', 'Open World', 'Western'],
    releaseDate: '2019-12-05',
    publisher: 'Rockstar Games',
    developer: 'Rockstar Games',
    features: ['Single-player', 'Online Multiplayer', 'Steam Achievements', 'Full Controller Support'],
    rating: 4.9,
    reviewCount: 15289,
    inStock: true
  },
  {
    id: 6,
    title: 'Starfield',
    description: 'Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg',
    price: 69.99,
    platforms: ['Steam', 'Microsoft Store'],
    genres: ['RPG', 'Space', 'Open World', 'Exploration'],
    releaseDate: '2023-09-06',
    publisher: 'Bethesda Softworks',
    developer: 'Bethesda Game Studios',
    features: ['Single-player', 'Steam Achievements', 'Full Controller Support', 'Steam Cloud'],
    rating: 4.0,
    reviewCount: 7821,
    inStock: true
  },
  {
    id: 7,
    title: 'The Elder Scrolls V: Skyrim Special Edition',
    description: 'Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
    price: 39.99,
    discountedPrice: 15.99,
    platforms: ['Steam', 'GOG'],
    genres: ['RPG', 'Open World', 'Fantasy', 'Adventure'],
    releaseDate: '2016-10-28',
    publisher: 'Bethesda Softworks',
    developer: 'Bethesda Game Studios',
    features: ['Single-player', 'Steam Workshop', 'Steam Achievements', 'Full Controller Support'],
    rating: 4.7,
    reviewCount: 24681,
    inStock: true
  },
  {
    id: 8,
    title: 'Horizon Forbidden West',
    description: 'Join Aloy as she braves the Forbidden West, a majestic but dangerous frontier that conceals mysterious new threats.',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HO8vkO9pfXhwbHi5WHECQJdN.png',
    price: 59.99,
    discountedPrice: 49.99,
    platforms: ['Steam', 'Epic'],
    genres: ['Action', 'Adventure', 'Open World', 'RPG'],
    releaseDate: '2023-03-18',
    publisher: 'PlayStation PC LLC',
    developer: 'Guerrilla Games',
    features: ['Single-player', 'Steam Achievements', 'Full Controller Support', 'Steam Cloud'],
    rating: 4.6,
    reviewCount: 6253,
    inStock: true
  },
  {
    id: 9,
    title: 'Counter-Strike 2',
    description: 'Counter-Strike 2 expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    price: 0,
    platforms: ['Steam'],
    genres: ['FPS', 'Shooter', 'Multiplayer', 'Competitive'],
    releaseDate: '2023-09-27',
    publisher: 'Valve',
    developer: 'Valve',
    features: ['Online Multiplayer', 'Steam Achievements', 'Steam Workshop', 'In-App Purchases'],
    rating: 4.2,
    reviewCount: 19853,
    inStock: true
  },
  {
    id: 10,
    title: 'Hogwarts Legacy',
    description: 'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books.',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    price: 59.99,
    platforms: ['Steam', 'Epic'],
    genres: ['RPG', 'Open World', 'Magic', 'Fantasy'],
    releaseDate: '2023-02-10',
    publisher: 'Warner Bros. Games',
    developer: 'Avalanche Software',
    features: ['Single-player', 'Steam Achievements', 'Full Controller Support', 'Steam Cloud'],
    rating: 4.5,
    reviewCount: 9374,
    inStock: true
  },
]
