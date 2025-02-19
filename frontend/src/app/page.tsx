import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Pulmo-Track</h1>
        <p className="text-center text-gray-600 mb-8">Your lung cancer tracking and rehabilitation companion.</p>
        <Link
          href="/dashboard"
          className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Enter Dashboard
        </Link>
      </div>
    </div>
  )
}

