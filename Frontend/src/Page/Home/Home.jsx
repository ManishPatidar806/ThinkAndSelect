import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Data from "../data/QuizData";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Users, Code2, ArrowRight, Zap, Target, Award, Search, X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userFullName] = useState(localStorage.getItem("fullname") || "Developer");
  const [animatedCards, setAnimatedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(Data);

  useEffect(() => {
    // Stagger card animations
    const timer = setTimeout(() => {
      setAnimatedCards(filteredData.map((_, index) => index));
    }, 200);
    return () => clearTimeout(timer);
  }, [filteredData]);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(Data);
    } else {
      const filtered = Data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="text-center animate-fade-in">
            {/* Welcome Message */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Welcome back, {userFullName}!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-12 py-4 text-gray-900 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              placeholder="Search programming languages, topics, or technologies..."
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {/* Search Results Info */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              {searchQuery ? (
                filteredData.length > 0 ? (
                  <>Found {filteredData.length} quiz{filteredData.length !== 1 ? 'es' : ''} matching "{searchQuery}"</>
                ) : (
                  <>No quizzes found matching "{searchQuery}"</>
                )
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredData.map((item, index) => (
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
        
        {/* No Results State */}
        {filteredData.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any quizzes matching "{searchQuery}". Try searching for different programming languages or topics.
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
