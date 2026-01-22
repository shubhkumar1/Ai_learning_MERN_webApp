import React, { useState } from 'react';
import {
  Sparkles, GraduationCap, Gamepad2, ArrowRight,
  Brain, Zap, CheckCircle2, XCircle, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden">

      {/* 1. Navbar */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="self-center text-2xl font-black tracking-tight text-white leading-none">
                Sparkles
              </span>
              <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
                by Antimind
              </span>
            </div>
          </a>

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:order-2 space-x-3 md:space-x-4">
            <Link to="/login">
              <button className="text-white bg-transparent hover:bg-slate-800 focus:ring-4 focus:ring-slate-800 font-medium rounded-xl text-sm px-5 py-2.5 transition-all">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-4 focus:ring-purple-900 font-bold rounded-xl text-sm px-6 py-2.5 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-slate-400 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-slate-900 px-4 py-4 space-y-3">
            <Link to="/login">
              <button className="w-full text-left text-slate-300 hover:text-white py-2">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-30 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative px-4 mx-auto max-w-7xl text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-wider mb-6 hover:bg-purple-500/20 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            Sparkles For Class 1 to 12
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tight leading-tight text-white md:text-7xl">
            Learning that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Actually Gets You.
            </span>
          </h1>

          <p className="mb-8 text-lg font-normal text-slate-400 lg:text-xl sm:px-16 lg:px-48 max-w-4xl mx-auto leading-relaxed">
            Stop getting generic, robotic answers. Sparkles adapts to your <strong>Class Level</strong> and <strong>Style</strong>.
            Whether you need a strict teacher or a funny study buddy, we switch modes instantly.
          </p>

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link to="/app">
            <button className="inline-flex justify-center items-center py-4 px-8 text-base font-bold text-center text-white rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-4 focus:ring-purple-900 transition-transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Start Learning Now
              <ArrowRight className="ml-2 -mr-1" size={20} />
            </button>
            </Link>
            <button className="inline-flex justify-center items-center py-4 px-8 text-base font-medium text-center text-slate-300 rounded-2xl border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-800 transition-all">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Problem Section (Comparison) */}
      <section className="py-20 bg-slate-900/50 relative border-y border-white/5">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white md:text-5xl mb-4">The "Generic AI" Problem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              When a Class 5 student and a PhD student ask the same question to a standard AI, they get the same complicated answer.
              <span className="text-blue-400 font-semibold block mt-2">That doesn't work for learning.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Bad Example */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative p-8 bg-slate-950 border border-slate-800 rounded-2xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <Brain className="text-slate-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-300">Generic AI</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 opacity-50">
                    <p className="text-xs text-slate-500 mb-1 font-mono">USER: Explain Gravity</p>
                    <p className="text-sm text-slate-400">"Gravity is a fundamental interaction which causes mutual attraction between all things with mass or energy..."</p>
                  </div>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                    <XCircle size={16} />
                    <span>Too complex for a 5th grader</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                    <XCircle size={16} />
                    <span>Boring for a 12th grader</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sparkles Solution */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative p-8 bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sparkles</h3>
                </div>

                <div className="space-y-6">
                  {/* Class 5 Example */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-blue-400 font-bold uppercase">Class 5 Profile</p>
                      <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-slate-200">"Imagine Gravity is like a giant invisible magnet inside the Earth that pulls everything towards the ground so we don't float away!"</p>
                  </div>

                  {/* Class 12 Example */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-purple-400 font-bold uppercase">Class 12 Profile</p>
                      <GraduationCap size={12} className="text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-200">
                      {`"Gravity is described by Newton's Law of Universal Gravitation ($F = G \\frac{m_1 m_2}{r^2}$) and acts as a centripetal force in orbital mechanics."`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. The Two Modes */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Personalized Learning</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Choose Your Vibe</h2>
          <p className="text-slate-400">Not every day is the same. Switch modes based on how you feel.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Tutor Mode Card */}
          <div className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/50">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-blue-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Tutor Mode</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Works just like your favorite school teacher. It explains concepts in-depth, step-by-step, and strictly follows the curriculum.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-blue-500" /> Structured & Detailed
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-blue-500" /> Encouraging tone
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-blue-500" /> Perfect for daily homework
              </li>
            </ul>
          </div>

          {/* Buddy Mode Card */}
          <div className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-green-500/50 transition-all duration-300 hover:bg-slate-800/50">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-green-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Buddy Mode</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your smart friend explaining things the night before the exam. Uses slang, real-world examples, and keeps it short and funny.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-green-500" /> Casual & Direct
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-green-500" /> Funny real-world analogies
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-green-500" /> "Cheat Sheet" style answers
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. How It Works (Steps) */}
      <section className="py-20 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-white mb-16">How Sparkles Works</h2>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 -z-10"></div>

            {[
              { num: "1", title: "Select Class", desc: "Choose from Class 1 to 12. We lock this to your profile." },
              { num: "2", title: "Pick Subject", desc: "Science, Math, History... whatever you need help with." },
              { num: "3", title: "Choose Mode", desc: "Toggle between Tutor (Deep) or Buddy (Fun)." },
              { num: "4", title: "Just Ask", desc: "Type or use your voice to ask any question." },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-800 text-white font-black text-2xl flex items-center justify-center mb-6 shadow-xl z-10">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-blue-500" size={24} />
            <span className="text-2xl font-black text-white">Sparkles</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition">About Antimind</a>
            <a href="#" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>

          <div className="text-center">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Antimind. All rights reserved.</p>
            <p className="text-slate-700 text-xs mt-2">Designed for the future of education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;