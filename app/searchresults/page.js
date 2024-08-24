"use client";
import { useState } from 'react';
import { FaSearch, FaStar, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const searchResults = [
    { id: 1, name: 'Dr. Jane Smith', department: 'Computer Science', university: 'Tech University', rating: 4.8, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Excellent professor, very knowledgeable and helpful.' },
    { id: 2, name: 'Prof. John Doe', department: 'Physics', university: 'Science College', rating: 4.5, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Challenging but fair. Explains complex concepts well.' },
    { id: 3, name: 'Dr. Emily Brown', department: 'Psychology', university: 'Liberal Arts University', rating: 4.7, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Engaging lectures and interesting assignments.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary mb-2 sm:mb-0">
            Nile Edu Lens
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/searchresults" className="text-gray-600 hover:text-primary">Search</Link>
            <Link href="/submissions" className="text-gray-600 hover:text-primary">My Submissions</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row mb-6 gap-2">
          <input
            type="text"
            placeholder="Search by name, department, or university"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
          >
            <FaSearch className="w-4 h-4 mr-2" />
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex md:hidden justify-between items-center">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div>
                <h3 className="font-semibold mb-2">Department</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="cs" className="form-checkbox" />
                    <span>Computer Science</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="physics" className="form-checkbox" />
                    <span>Physics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="psychology" className="form-checkbox" />
                    <span>Psychology</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="4-5" className="form-checkbox" />
                    <span>4 - 5</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="3-4" className="form-checkbox" />
                    <span>3 - 4</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" id="2-3" className="form-checkbox" />
                    <span>2 - 3</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-grow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-gray-600">{searchResults.length} results found</p>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((professor) => (
                <Link key={professor.id} href={`/professordetailpage?id=${professor.id}`} className="bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="p-4 flex items-center space-x-4">
                    <Image
                      src={professor.imageUrl}
                      alt={professor.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{professor.name}</h3>
                      <p className="text-sm text-gray-600">{professor.department}</p>
                      <p className="text-sm text-gray-600">{professor.university}</p>
                      <div className="flex items-center mt-1">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{professor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="p-4 text-sm text-gray-600 line-clamp-3">{professor.recentReview}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nile Edu Lens. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
