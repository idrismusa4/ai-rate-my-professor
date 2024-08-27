"use client";
import { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation.js';
import professors from "../../professors_data.json";


export default function Component() {
  const searchParams = useSearchParams()
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: searchParams.get("query") || "",
    sortBy: "rating",
    department: [],
    rating: []
  })
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;

    let totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(totalRating / reviews.length);
}

  function updateSearch() {
    console.log(searchFilters)
    let res
    if(searchFilters.searchQuery) {
      res = professors.filter(p => p.name.toLocaleLowerCase().includes(searchFilters.searchQuery.toLocaleLowerCase()))
    }
    
    if(searchFilters.department.length) {
      res = professors.filter(p => searchFilters.department.includes(p.department))
    }
    
    if(searchFilters.rating.length) {
      let rangeArr = searchFilters.rating.map(e => e.split(" - ")).flat(1).map(t => parseInt(t))
      res = professors.filter(p => calculateAverageRating(p.reviews) >= Math.min(...rangeArr) && calculateAverageRating(p.reviews) <= Math.max(...rangeArr))
    }

    let sortedRes = res.sort((a,b) => {
      if(searchFilters.sortBy === "rating") {
        return calculateAverageRating(b.reviews)-calculateAverageRating(a.reviews)
      }

      if(searchFilters.sortBy === "name") {
        if(a.name.toLocaleLowerCase()<b.name.toLocaleLowerCase())return -1
        if(a.name.toLocaleLowerCase()>b.name.toLocaleLowerCase())return 1
        return 0
      }

      if(searchFilters.sortBy === "reviews") {
        return b.reviews.length - a.reviews.length
      }
    })

    setSearchResults(sortedRes)
    console.log(sortedRes)
  }

  function modDepartments(department) {
    if(searchFilters.department.includes(department)) {
      let temp = searchFilters.department.filter(e => e !== department)
      setSearchFilters(prev => {return { ...prev, department: temp }})
    } else {
      let temp = searchFilters.department
      setSearchFilters(prev => {return { ...prev, department: [...temp, department] }})
    }

  }

  function modRating(rating) {
    if(searchFilters.rating.includes(rating)) {
      let temp = searchFilters.rating.filter(e => e !== rating)
      setSearchFilters(prev => {return { ...prev, rating: temp }})
    } else {
      let temp = searchFilters.rating
      setSearchFilters(prev => {return { ...prev, rating: [...temp, rating] }})
    }

  }

  useEffect(() => updateSearch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

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
            placeholder="Search a professor's name"
            value={searchFilters.searchQuery}
            onChange={(e) => setSearchFilters(prev => {return{ ...prev, searchQuery: e.target.value }})}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={updateSearch}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
          >
            <FaSearch className="w-4 h-4 mr-2" />
            Update Search
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
                <div className="space-y-2">{
                  ["Computer Science", "Physics", "Psychology"].map((dep, ind) => {
                    return <label key={ind} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="cs" 
                      className="form-checkbox" 
                      checked={searchFilters.department.includes(dep)}
                      onChange={() => modDepartments(dep)}
                    />
                    <span>{dep}</span>
                  </label>
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="space-y-2">
                {
                  ["4 - 5", "3 - 4", "2 - 3"].map((rating, ind) => {
                    return <label key={ind} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={rating} 
                      className="form-checkbox" 
                      checked={searchFilters.rating.includes(rating)}
                      onChange={() => modRating(rating)}
                    />
                    <span>{rating}</span>
                  </label>
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-grow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-gray-600">{searchResults.length} results found</p>
              <div className="relative w-full sm:w-auto">
                <select
                  value={searchFilters.sortBy}
                  onChange={(e) => setSearchFilters(prev => {return{ ...prev, sortBy: e.target.value}})}
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
                      src={professor.image_url}
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
                        <span className="text-sm font-medium">{calculateAverageRating(professor.reviews).toFixed(1)}</span>
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
