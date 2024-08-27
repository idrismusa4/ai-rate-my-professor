"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Replace with your API call to fetch user submissions
    // This is a mock function for demonstration
    const fetchSubmissions = async () => {
      // Replace with your actual API endpoint
      const response = await fetch('/api/my-submissions');
      const data = await response.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

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
        <h1 className="text-3xl font-bold mb-6 text-center">My Submissions</h1>

        {submissions.length === 0 ? (
          <p className="text-center text-gray-600">You have not submitted any professors yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white p-4 rounded-lg shadow hover:bg-gray-100">
                <div className="flex items-center space-x-4">
                  <Image
                    src={submission.imageUrl || '/placeholder.svg'}
                    alt={submission.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{submission.name}</h3>
                    <p className="text-sm text-gray-600">{submission.department}</p>
                    <p className="text-sm text-gray-600">{submission.university}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{submission.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nile Edu Lens. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MySubmissions;
