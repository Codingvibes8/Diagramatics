import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Authentication Error</h2>
        <p className="mt-2 text-gray-600">
          There was an error during authentication. Please try again.
        </p>
        <Button asChild className="mt-4">
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  )
}
