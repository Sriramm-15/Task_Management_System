import React, { useState, useEffect } from "react";

const JobberIntro = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-900 overflow-hidden flex items-center justify-center p-6">

      {/* Background Orbs */}
      <div className="absolute top-12 left-12 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-16 w-20 h-20 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <div
        className={`relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* LEFT: Text + CTA */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Welcome to <span className="text-cyan-400">Task Management System</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
            Organize your projects, track tasks, and collaborate seamlessly with your team. 
            Manage work efficiently and boost productivity in one centralized platform.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="w-max px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-lg shadow-xl hover:scale-105 hover:from-cyan-600 hover:to-purple-600 transition-transform duration-300"
          >
            Get Started Now
          </button>

          <p className="text-gray-500 text-sm">
            Trusted by teams and freelancers worldwide.
          </p>
        </div>

        {/* RIGHT: Feature Cards */}
        <div className="relative w-full flex justify-center items-center">
          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl w-80 text-center animate-fadeup">
            <h2 className="text-white font-bold text-2xl mb-4">Key Features</h2>
            <ul className="space-y-4">
              <li className="text-gray-300 font-medium flex items-center gap-3 justify-center">
                <span className="text-cyan-400">•</span> Intuitive Task Boards
              </li>
              <li className="text-gray-300 font-medium flex items-center gap-3 justify-center">
                <span className="text-purple-400">•</span> Real-Time Collaboration
              </li>
              <li className="text-gray-300 font-medium flex items-center gap-3 justify-center">
                <span className="text-pink-400">•</span> Advanced Analytics & Reports
              </li>
            </ul>
          </div>

          {/* Floating Mini Cards */}
          <div className="absolute top-[-40px] right-[-60px] w-32 h-20 bg-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-medium animate-float">
            Task Boards
          </div>
          <div className="absolute bottom-[-40px] left-[-50px] w-28 h-16 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-medium animate-float animation-delay-2000">
            Team Chat
          </div>
          <div className="absolute top-20 left-[-60px] w-24 h-16 bg-pink-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-medium animate-float animation-delay-4000">
            Progress Insights
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes fadeup {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeup { animation: fadeup 1.2s forwards; }
      `}</style>
    </div>
  );
};

export default JobberIntro;
