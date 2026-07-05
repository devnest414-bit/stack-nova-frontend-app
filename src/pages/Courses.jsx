import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const coursesData = [
  {
    id: 1,
    title: 'HTML Full Course',
    description:
      'Learn HTML from zero to advanced. Build real websites structure.',
    price: 19,
    image: 'https://cdn-icons-png.flaticon.com/512/732/732212.png',
  },
  {
    id: 2,
    title: 'CSS Mastery',
    description: 'Flexbox, Grid, animations, responsive design and modern UI.',
    price: 25,
    image: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
  },
  {
    id: 3,
    title: 'JavaScript Full Course',
    description: 'Complete JS from basics to advanced ES6+ and projects.',
    price: 39,
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
  },
  {
    id: 4,
    title: 'React JS Master Course',
    description: 'Build modern frontend apps with React, hooks, and APIs.',
    price: 49,
    image: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png',
  },
  {
    id: 5,
    title: 'Node.js & Express',
    description: 'Backend development with APIs, authentication and servers.',
    price: 59,
    image: 'https://cdn-icons-png.flaticon.com/512/919/919825.png',
  },
  {
    id: 6,
    title: 'MongoDB Database',
    description: 'Learn NoSQL database, schema design and real projects.',
    price: 29,
    image: 'https://cdn-icons-png.flaticon.com/512/919/919836.png',
  },
];

export default function Courses() {
  const [hovered, setHovered] = useState(null);
   const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Full Stack Developer Courses 🚀
        </h1>
        <p className="text-gray-400 mt-3">
          Learn step by step from beginner to advanced developer
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {coursesData.map((course) => (
          <div
            key={course.id}
            onMouseEnter={() => setHovered(course.id)}
            onMouseLeave={() => setHovered(null)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg 
                       transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={course.image}
                alt={course.title}
                className="w-20 h-20 object-contain mb-4"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center mb-2">
              {course.title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm text-center mb-4">
              {course.description}
            </p>

            <hr className="border-gray-700 mb-4" />

            {/* Price */}
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-green-400">
                ${course.price}
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate('/contact')}
              className={`w-full py-2 rounded-xl font-semibold transition 
              ${
                hovered === course.id
                  ? 'bg-green-500 text-black'
                  : 'bg-blue-600 text-white'
              }`}
            >
              Contact Us
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
