import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="container flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-9xl font-bold text-muted-foreground">404</h1>
      <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/">Back to Homepage</Link>
      </Button>
    </div>
  )
}
