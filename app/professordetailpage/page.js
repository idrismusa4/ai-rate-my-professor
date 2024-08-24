"use client";

import { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Component() {
  const [activeTab, setActiveTab] = useState('ratings');

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
  };

  const reviews = [
    { id: 1, rating: 5, comment: 'Excellent professor! Very knowledgeable and always willing to help.', date: '2023-05-15' },
    { id: 2, rating: 4, comment: 'Challenging course, but Dr. Smith makes it interesting.', date: '2023-04-22' },
    { id: 3, rating: 5, comment: 'One of the best professors I\'ve had. Clear explanations and fair grading.', date: '2023-03-10' },
  ];

  const similarProfessors = [
    { id: 2, name: 'Dr. John Doe', department: 'Computer Science', university: 'Tech University', rating: 4.5 },
    { id: 3, name: 'Prof. Emily Brown', department: 'Computer Engineering', university: 'State University', rating: 4.7 },
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
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Image
            src={professor.imageUrl}
            alt={professor.name}
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{professor.name}</h1>
            <p className="text-xl text-gray-600 mb-1">{professor.department}</p>
            <p className="text-lg text-gray-600 mb-4">{professor.university}</p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="flex items-center">
                <FaStar className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="text-2xl font-bold">{professor.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600">{professor.totalRatings} ratings</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap space-x-2 sm:space-x-4 border-b border-gray-200 pb-2 mb-4">
            <button
              className={`px-2 sm:px-4 py-2 ${activeTab === 'ratings' ? 'border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('ratings')}
            >
              Ratings
            </button>
            <button
              className={`px-2 sm:px-4 py-2 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`px-2 sm:px-4 py-2 ${activeTab === 'trends' ? 'border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </button>
          </div>
          {activeTab === 'ratings' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                <div className="p-4">
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
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <FaStar className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="font-semibold">{review.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'trends' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Rating Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                    <FaChartLine className="w-12 h-12 text-gray-400" />
                    <span className="ml-2 text-gray-500">Trend chart placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

<section className="mt-12">
  <h2 className="text-2xl font-semibold mb-4">Similar Professors</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {similarProfessors.map((prof) => (
      <Link key={prof.id} href={`/professordetailpage?id=${prof.id}`} className="bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100">
        <div className="p-4 flex items-center space-x-4">
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
              <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{prof.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
</main>

<footer className="bg-gray-100 py-6">
<div className="container mx-auto px-4 text-center text-gray-600">
  <p>&copy; {new Date().getFullYear()} Nile Edu Lens. All rights reserved.</p>
</div>
</footer>
</div>
);
}