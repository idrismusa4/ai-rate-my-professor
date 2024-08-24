import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const searchResults = [
    { id: 1, name: 'Dr. Jane Smith', department: 'Computer Science', university: 'Tech University', rating: 4.8, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Excellent professor, very knowledgeable and helpful.' },
    { id: 2, name: 'Prof. John Doe', department: 'Physics', university: 'Science College', rating: 4.5, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Challenging but fair. Explains complex concepts well.' },
    { id: 3, name: 'Dr. Emily Brown', department: 'Psychology', university: 'Liberal Arts University', rating: 4.7, imageUrl: '/placeholder.svg?height=100&width=100', recentReview: 'Engaging lectures and interesting assignments.' },
    // Add more search results as needed
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Rate My Professor
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/search" className="text-gray-600 hover:text-primary">Search</Link>
            <Link href="/submissions" className="text-gray-600 hover:text-primary">My Submissions</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex mb-6">
          <Input
            type="text"
            placeholder="Search by name, department, or university"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex md:hidden justify-between items-center">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div>
                <h3 className="font-semibold mb-2">Department</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Checkbox id="cs" />
                    <span>Computer Science</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox id="physics" />
                    <span>Physics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox id="psychology" />
                    <span>Psychology</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Checkbox id="4-5" />
                    <span>4 - 5</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox id="3-4" />
                    <span>3 - 4</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox id="2-3" />
                    <span>2 - 3</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-grow space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{searchResults.length} results found</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((professor) => (
                <Card key={professor.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
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
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{professor.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{professor.recentReview}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Rate My Professor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}