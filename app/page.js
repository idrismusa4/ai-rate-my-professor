import Image from 'next/image'
import Link from 'next/link'
import { Search, TrendingUp, Upload, Star } from 'lucide-react'
import { FaSearch, FaMicrophone, FaUpload } from 'react-icons/fa';
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center">
            <Image src="/placeholder.svg?height=32&width=32" alt="Rate My Professor Logo" width={32} height={32} className="mr-2" />
            Rate My Professor
          </Link>
          <div className="flex items-center space-x-4">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Home</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Search</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Submit</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Sign In</a>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Find and Rate Professors</h1>
          <p className="text-xl text-gray-600 mb-8">Discover insights from students about professors across universities</p>
          
          <form className="flex max-w-md mx-auto space-x-2">
  <input
    type="text"
    placeholder="Search by name, department, or university"
    className="flex-grow px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
  />

  {/* Search Button */}
  <button
  type="submit"
  className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
>
  <FaSearch className="w-4 h-4 mr-2" />
  Search
</button>


  {/* Voice Search Button */}
  <button type="button" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
    <FaMicrophone className="w-4 h-4" />
  </button>

  {/* Upload Button */}
  <button type="button" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
    <HiOutlineDocumentArrowUp className="w-4 h-4" />
  </button>

  
</form>


        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Trending Professors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Professor"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Dr. John Doe</h3>
                    <p className="text-sm text-gray-600">Computer Science</p>
                    <p className="text-sm text-gray-600">Tech University</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Submit a Professor's Page</h2>
          <p className="text-gray-600 mb-4">Help us grow our database by submitting a professor's Rate My Professor page</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Upload className="w-4 h-4 mr-2 inline" />
            Submit a Page
          </button>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Rate My Professor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}