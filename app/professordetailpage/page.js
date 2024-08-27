"use client";

<<<<<<< HEAD
import React, { useEffect, useState, Suspense } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 1a70c3c (added user authentication and search functional)
import { FaStar, FaThumbsUp, FaThumbsDown, FaChartLine } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import professors from "../../professors_data.json";

<<<<<<< HEAD
function ProfessorDetailComponent() {
  const [activeTab, setActiveTab] = useState("ratings");
  const [id, setId] = useState(null);
  const [professor, setProfessor] = useState({});
  const [similarProfessors, setSimilarProfessors] = useState([]);
=======
export default function Component() {
  const [activeTab, setActiveTab] = useState("ratings");
  const [id, setId] = useState(null);
  const [professor, setProfessor] = useState({});
  const [similarProfessors, setSimilarProfessors] = useState({});
>>>>>>> 1a70c3c (added user authentication and search functional)

  const searchParams = useSearchParams();
  useEffect(() => {
    const paramId = searchParams.get("id");
    setId(paramId);
    setProfessor(professors.find((professor) => professor.id === paramId));
    setSimilarProfessors(
      professors.filter((professor) => professor.id !== paramId).slice(0, 2)
    );
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary mb-2 sm:mb-0"
          >
            Nile Edu Lens
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link
              href="/searchresults"
              className="text-gray-600 hover:text-primary"
            >
              Search
            </Link>
            <Link
              href="/submissions"
              className="text-gray-600 hover:text-primary"
            >
              My Submissions
            </Link>
          </div>
        </nav>
      </header>

      {professor.hasOwnProperty("id") && (
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <Image
              src={professor.image_url}
              alt={professor.name}
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{professor.name}</h1>
              <p className="text-xl text-gray-600 mb-1">
                {professor.department}
              </p>
              <p className="text-lg text-gray-600 mb-4 capitalize">
                {professor.university.replaceAll("-", " ")}
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
<<<<<<< HEAD
=======
                {/* <div className="flex items-center">
                  <FaStar className="w-6 h-6 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold">
                    {professor.rating.toFixed(1)}
                  </span>
                </div> */}
>>>>>>> 1a70c3c (added user authentication and search functional)
                <p className="text-gray-600">
                  {professor.totalRatings} ratings
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap space-x-2 sm:space-x-4 border-b border-gray-200 pb-2 mb-4">
              <button
                className={`px-2 sm:px-4 py-2 ${
                  activeTab === "ratings"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("ratings")}
              >
                Ratings
              </button>
              <button
                className={`px-2 sm:px-4 py-2 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
              <button
                className={`px-2 sm:px-4 py-2 ${
                  activeTab === "trends"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("trends")}
              >
                Trends
              </button>
            </div>
            {activeTab === "ratings" && (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Detailed Ratings
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Would take again</span>
                        <span className="font-semibold">
                          {professor.wouldTakeAgain}%
                        </span>
                      </div>
<<<<<<< HEAD
=======
                      {/* <div className="flex justify-between items-center">
                        <span>Level of Difficulty</span>
                        <span className="font-semibold">
                          {professor.levelOfDifficulty.toFixed(1)}/5
                        </span>
                      </div> */}
>>>>>>> 1a70c3c (added user authentication and search functional)
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {professor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-gray-200 rounded-md shadow-sm"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <FaStar className="w-5 h-5 text-yellow-400 mr-1" />
                          <span className="font-semibold">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "trends" && (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Rating Trends
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                      <FaChartLine className="w-12 h-12 text-gray-400" />
                      <span className="ml-2 text-gray-500">
                        Trend chart placeholder
                      </span>
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
                <Link
                  key={prof.id}
                  href={`/professordetailpage?id=${prof.id}`}
                  className="bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100"
                >
                  <div className="p-4 flex items-center space-x-4">
                    <Image
                      src={prof.image_url}
                      alt={prof.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{prof.name}</h3>
                      <p className="text-sm text-gray-600">{prof.department}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {professor.university.replaceAll("-", " ")}
                      </p>
<<<<<<< HEAD
=======
                      {/* <div className="flex items-center mt-1">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {prof.rating.toFixed(1)}
                        </span>
                      </div> */}
>>>>>>> 1a70c3c (added user authentication and search functional)
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      )}

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Nile Edu Lens. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
<<<<<<< HEAD

export default function WrappedProfessorDetailComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfessorDetailComponent />
    </Suspense>
  );
}
=======
>>>>>>> 1a70c3c (added user authentication and search functional)
