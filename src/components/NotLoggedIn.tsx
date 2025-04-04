import Link from 'next/link'

export default function NotLoggedIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Not logged in
        </h2>
        <Link 
          href="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Go to login page
        </Link>
      </div>
    </div>
  )
} 