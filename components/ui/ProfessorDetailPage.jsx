import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const [activeTab, setActiveTab] = useState('ratings')

  const professor = {
    id: 1,
    name: 'Dr. Jane Smith',
    department: 'Computer Science',
    university: 'Tech University',
    rating: 4.8,
    imageUrl: '/placeholder.svg?height=200&width=200',
    totalRatings: 120,
    wouldTakeAgain: 95,
    levelOfDifficulty: 3.5,
  }

  const reviews = [
    { id: 1, rating: 5, comment: 'Excellent professor! Very knowledgeable and always willing to help.', date: '2023-05-15' },
    { id: 2, rating: 4, comment: 'Challenging course, but Dr. Smith makes it interesting.', date: '2023-04-22' },
    { id: 3, rating: 5, comment: 'One of the best professors I\'ve had. Clear explanations and fair grading.', date: '2023-03-10' },
  ]

  const similarProfessors = [
    { id: 2, name: 'Dr. John Doe', department: 'Computer Science', university: 'Tech University', rating: 4.5 },
    { id: 3, name: 'Prof. Emily Brown', department: 'Computer Engineering', university: 'State University', rating: 4.7 },
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
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <Image
            src={professor.imageUrl}
            alt={professor.name}
            width={200}
            height={200}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{professor.name}</h1>
            <p className="text-xl text-gray-600 mb-1">{professor.department}</p>
            <p className="text-lg text-gray-600 mb-4">{professor.university}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="text-2xl font-bold">{professor.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600">{professor.totalRatings} ratings</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="ratings" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Detailed Ratings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Would take again</span>
                    <span className="font-semibold">{professor.wouldTakeAgain}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Level of Difficulty</span>
                    <span className="font-semibold">{professor.levelOfDifficulty.toFixed(1)}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{review.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Rating Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                  <TrendingUp className="w-12 h-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Trend chart placeholder</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Similar Professors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {similarProfessors.map((prof) => (
              <Card key={prof.id}>
                <CardContent className="p-4 flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={prof.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{prof.name}</h3>
                    <p className="text-sm text-gray-600">{prof.department}</p>
                    <p className="text-sm text-gray-600">{prof.university}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{prof.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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