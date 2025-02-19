import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Pulmo-Track
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/visits" className="text-gray-600 hover:text-blue-600">
            Doctor Visits
          </Link>
          <Link href="/reports" className="text-gray-600 hover:text-blue-600">
            Reports
          </Link>
          <Link href="/settings" className="text-gray-600 hover:text-blue-600">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  )
}

