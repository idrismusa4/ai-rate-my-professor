"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'


import {
  Search,
  TrendingUp,
  Upload,
  Star,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import professors from "../professors_data.json";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-primary flex items-center"
          >
            <Image
              src="/images/nile-logo.png?height=32&width=32"
              alt="Nile Edu Lens Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            Nile Edu Lens
          </Link>
          <button onClick={toggleMenu} className="lg:hidden text-gray-600">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="sr-only">Open menu</span>
          </button>
          <div
            className={`lg:flex lg:items-center lg:space-x-4 ${
              isOpen ? "block" : "hidden"
            } absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0`}
          >
            <Link
              href="/"
              className="block lg:inline-block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/searchresults"
              className="block lg:inline-block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Search
            </Link>
            <Link
              href="/submit-a-page"
              className="block lg:inline-block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Submit
            </Link>
            {!isSignedIn && <><div
              style={{border: "1px solid black"}}
              className="block lg:inline-block px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700"
            >
              <SignInButton />
            </div>
            <div
              href="/sign-up"
              className="block lg:inline-block px-3 py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-700"
            >
              <SignUpButton />
            </div></>}
            {isSignedIn && <UserButton />}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Find and Rate Professors</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover insights from students about professors across universities
          </p>

          <div className="max-w-md mx-auto mb-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name of professor"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />

              <div className="flex space-x-2">
                <Link

                  href={"/searchresults"+"?query="+searchQuery}
                  className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <FaSearch className="w-4 h-4 mr-2" />
                  Search
                </Link>
                <button
                  type="button"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <FaMicrophone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <HiOutlineDocumentArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600">or</p>
            <Link
              href="/chat"
              className="inline-flex items-center mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with our bot
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Trending Professors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professors
              .sort((a, b) => b.reviews[0].rating - a.reviews[0].rating)
              .slice(0, 12)
              .map(
                ({
                  id,
                  name,
                  designation,
                  department,
                  university,
                  image_url,
                }) => (
                  <Link
                    key={id}
                    href={`/professordetailpage?id=${id}`}
                    className="bg-white p-4 rounded-lg shadow hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={image_url}
                        alt="Professor"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm text-gray-600">{designation}</p>
                        <p className="text-sm text-gray-600">{department}</p>
                        <p className="text-sm text-gray-600 capitalize">
                          {university.replaceAll("-", " ")}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">4.5</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {"Submit a Professor's Page"}
          </h2>
          <p className="text-gray-600 mb-4">
            {"Help us grow our database by submitting a professor's Nile Edu Lens page"}
          </p>
          <Link
            href="/submit-a-page"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <Upload className="w-4 h-4 mr-2 inline" />
            Submit a Page
          </Link>
        </section>
      </main>

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
