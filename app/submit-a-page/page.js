"use client";

import { useState } from 'react';
import { FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import { FiUpload } from "react-icons/fi";

export default function Component() {
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState('idle');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);
    setSubmitStatus('idle');

    // Simulating the submission process
    try {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Submit a Professor&#39;s Page</h1>
        <p className="text-xl sm:text-2xl font-light mb-6 text-center">Help us expand our database by submitting a Professor&#39;s Bio page.</p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Nile Edu Lens URL
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://www.ratemyprofessors.com/professor/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comments"
              placeholder="Any additional information or context..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-grey-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiUpload className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {isSubmitting && (
          <div className="mt-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Scraping Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please wait while we process your submission...
            </p>
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-green-100 border border-green-300 rounded-md flex flex-col sm:flex-row items-center">
            <FaCheckCircle className="h-6 w-6 text-green-500 mb-2 sm:mb-0 sm:mr-3" />
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Success</h3>
              <p className="text-gray-700">
                The professor&#39;s page has been successfully added to our database. Thank you for your contribution!
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-red-100 border border-red-300 rounded-md flex flex-col sm:flex-row items-center">
            <FaExclamationCircle className="h-6 w-6 text-red-500 mb-2 sm:mb-0 sm:mr-3" />
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Error</h3>
              <p className="text-gray-700">
                There was an error processing your submission. Please try again later or contact support if the problem persists.
              </p>
            </div>
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
}