import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaUserGraduate,
  FaProjectDiagram,
} from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-[#060913] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[180px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                🚀 StackNova Academy
              </span>

              <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight">
                Learn.
                <br />
                Build.
                <br />
                Become a{' '}
                <span className="text-blue-400">Full Stack Developer</span>
              </h1>

              <p className="mt-8 text-lg text-slate-300 leading-8 max-w-xl">
                Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB,
                Authentication, REST APIs and Deployment by building
                professional real-world projects.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/course"
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg shadow-blue-600/30"
                >
                  Start Learning
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
                <div className="grid grid-cols-2 gap-6">
                  <TechCard
                    icon={<FaReact />}
                    title="React"
                    color="text-cyan-400"
                  />

                  <TechCard
                    icon={<FaNodeJs />}
                    title="Node.js"
                    color="text-green-400"
                  />

                  <TechCard
                    icon={<FaDatabase />}
                    title="MongoDB"
                    color="text-green-500"
                  />

                  <TechCard
                    icon={<FaLaptopCode />}
                    title="Express"
                    color="text-yellow-400"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Counter end={120} label="Lessons" />

            <Counter end={35} label="Projects" />

            <Counter end={500} label="Students" />
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Why Learn With Us?</h2>

          <p className="text-slate-400 text-center mt-4">
            Everything you need to become a professional developer.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Feature
              icon={<FaLaptopCode />}
              title="Real Projects"
              desc="Build professional applications using the MERN stack."
            />

            <Feature
              icon={<FaProjectDiagram />}
              title="Modern Technologies"
              desc="React, Node.js, Express, MongoDB, JWT, Tailwind CSS."
            />

            <Feature
              icon={<FaUserGraduate />}
              title="Career Ready"
              desc="Gain practical experience and prepare for real jobs."
            />
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-12 text-center">
            <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>

            <p className="mt-5 text-blue-100">
              Join hundreds of students learning modern web development.
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TechCard({ icon, title, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl bg-[#0f172a] border border-white/10 p-8 text-center"
    >
      <div className={`text-5xl ${color} flex justify-center`}>{icon}</div>

      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
    </motion.div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-8"
    >
      <div className="text-4xl text-blue-400">{icon}</div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-4 text-slate-400">{desc}</p>
    </motion.div>
  );
}

function Counter({ end, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current++;

      setCount(current);

      if (current >= end) clearInterval(timer);
    }, 1500 / end);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center"
    >
      <h2 className="text-5xl font-black text-blue-400">{count}+</h2>

      <p className="mt-4 uppercase tracking-widest text-slate-400">{label}</p>
    </motion.div>
  );
}
