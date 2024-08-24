const { useState } = require('react');
const { Input } = require("@/components/ui/input");
const { Button } = require("@/components/ui/button");
const { Card, CardContent } = require("@/components/ui/card");
const { Search, Star, TrendingUp, Upload } = require('lucide-react');
const Link = require('next/link').default;
const Image = require('next/image').default;
const React = require('react');

function Component() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingProfessors = [
    { id: 1, name: 'Dr. Jane Smith', department: 'Computer Science', university: 'Tech University', rating: 4.8, imageUrl: '/placeholder.svg?height=100&width=100' },
    { id: 2, name: 'Prof. John Doe', department: 'Physics', university: 'Science College', rating: 4.5, imageUrl: '/placeholder.svg?height=100&width=100' },
    { id: 3, name: 'Dr. Emily Brown', department: 'Psychology', university: 'Liberal Arts University', rating: 4.7, imageUrl: '/placeholder.svg?height=100&width=100' },
  ];

  return React.createElement('div', { className: "flex flex-col min-h-screen bg-gray-50" },
    React.createElement('header', { className: "sticky top-0 z-10 bg-white shadow-sm" },
      React.createElement('nav', { className: "container mx-auto px-4 py-4 flex justify-between items-center" },
        React.createElement(Link, { href: "/", className: "text-2xl font-bold text-primary" }, "Rate My Professor"),
        React.createElement('div', { className: "flex space-x-4" },
          React.createElement(Link, { href: "/", className: "text-gray-600 hover:text-primary" }, "Home"),
          React.createElement(Link, { href: "/search", className: "text-gray-600 hover:text-primary" }, "Search"),
          React.createElement(Link, { href: "/submissions", className: "text-gray-600 hover:text-primary" }, "My Submissions")
        )
      )
    ),

    React.createElement('main', { className: "flex-grow container mx-auto px-4 py-8" },
      React.createElement('section', { className: "mb-12 text-center" },
        React.createElement('h1', { className: "text-4xl font-bold mb-4" }, "Find and Rate Professors"),
        React.createElement('p', { className: "text-xl text-gray-600 mb-8" }, "Discover insights from students about professors across universities"),
        React.createElement('div', { className: "flex max-w-md mx-auto" },
          React.createElement(Input, {
            type: "text",
            placeholder: "Search by name, department, or university",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "flex-grow"
          }),
          React.createElement(Button, { type: "submit", className: "ml-2" },
            React.createElement(Search, { className: "w-4 h-4 mr-2" }),
            "Search"
          )
        )
      ),

      React.createElement('section', { className: "mb-12" },
        React.createElement('h2', { className: "text-2xl font-semibold mb-4 flex items-center" },
          React.createElement(TrendingUp, { className: "w-6 h-6 mr-2 text-primary" }),
          "Trending Professors"
        ),
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
          trendingProfessors.map((professor) =>
            React.createElement(Card, { key: professor.id },
              React.createElement(CardContent, { className: "p-4 flex items-center space-x-4" },
                React.createElement(Image, {
                  src: professor.imageUrl,
                  alt: professor.name,
                  width: 64,
                  height: 64,
                  className: "rounded-full"
                }),
                React.createElement('div', null,
                  React.createElement('h3', { className: "font-semibold" }, professor.name),
                  React.createElement('p', { className: "text-sm text-gray-600" }, professor.department),
                  React.createElement('p', { className: "text-sm text-gray-600" }, professor.university),
                  React.createElement('div', { className: "flex items-center mt-1" },
                    React.createElement(Star, { className: "w-4 h-4 text-yellow-400 mr-1" }),
                    React.createElement('span', { className: "text-sm font-medium" }, professor.rating.toFixed(1))
                  )
                )
              )
            )
          )
        )
      ),

      React.createElement('section', { className: "text-center" },
        React.createElement('h2', { className: "text-2xl font-semibold mb-4" }, "Submit a Professor's Page"),
        React.createElement('p', { className: "text-gray-600 mb-4" }, "Help us grow our database by submitting a professor's Rate My Professor page"),
        React.createElement(Button, null,
          React.createElement(Upload, { className: "w-4 h-4 mr-2" }),
          "Submit a Page"
        )
      )
    ),

    React.createElement('footer', { className: "bg-gray-100 py-6" },
      React.createElement('div', { className: "container mx-auto px-4 text-center text-gray-600" },
        React.createElement('p', null, `© ${new Date().getFullYear()} Rate My Professor. All rights reserved.`)
      )
    )
  );
}

module.exports = Component;