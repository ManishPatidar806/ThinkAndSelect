import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Data from "../data/QuizData";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Users, Code2, ArrowRight, Zap, Target, Award } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userFullName] = useState(localStorage.getItem("fullname") || "Developer");
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    // Stagger card animations
    const timer = setTimeout(() => {
      setAnimatedCards(Data.map((_, index) => index));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  function executionPractice(type) {
    localStorage.removeItem("type");
    localStorage.setItem("type", type);
    navigate("/practicequiz");
  }

  function executionCertificate(type) {
    localStorage.removeItem("type");
    localStorage.setItem("type", type);
    navigate("/certificationquiz");
  }

  const stats = [
    { icon: BookOpen, value: "8+", label: "Languages", color: "text-blue-600" },
    { icon: Users, value: "10K+", label: "Students", color: "text-green-600" },
    { icon: Trophy, value: "95%", label: "Success Rate", color: "text-yellow-600" },
    { icon: Award, value: "50K+", label: "Certificates", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Welcome Message */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Welcome back, {userFullName}!
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Programming
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  One Quiz at a Time
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Challenge yourself with our comprehensive programming quizzes. Practice your skills, 
                earn certifications, and become a better developer through hands-on learning.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button 
                onClick={() => navigate("/editer")}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                Try Code Editor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate("/tutorial")}
                className="group bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-purple-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                View Tutorials
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 lg:mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="glass-card rounded-2xl p-6 text-center space-y-3 hover:scale-105 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-50 ${stat.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Choose Your Challenge</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Programming Languages & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across multiple programming languages and earn certificates
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {Data.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                animatedCards.includes(index) ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  src={item.image}
                  alt={`${item.name} programming language`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Language Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-700 font-semibold px-3 py-1 text-xs">
                    {item.name}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                    onClick={() => executionPractice(item.type)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Practice
                  </button>
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                    onClick={() => executionCertificate(item.type)}
                  >
                    <Trophy className="w-4 h-4" />
                    Exam
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Ready to Level Up Your Skills?
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join thousands of developers who are improving their programming skills through our 
                  interactive quizzes and hands-on practice sessions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate("/notes")}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Study Notes
                </button>
                <button 
                  onClick={() => navigate("/profile")}
                  className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-green-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Progress
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
