
import { useState, useEffect } from "react";
import TutorialData from "../data/TutorialData";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Youtube, 
  Clock, 
  Users, 
  Star,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
  PlayCircle
} from "lucide-react";

const Tutorial = () => {
  const [animatedCards, setAnimatedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Stagger card animations
    const timer = setTimeout(() => {
      setAnimatedCards(TutorialData.map((_, index) => index));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories for filtering
  const categories = ["All", ...new Set(TutorialData.map(item => {
    if (item.name.toLowerCase().includes('dsa')) return 'DSA';
    if (['html', 'css', 'javascript'].includes(item.name.toLowerCase())) return 'Web Dev';
    return 'Programming';
  }))];

  const filteredTutorials = TutorialData.filter(tutorial => {
    const matchesSearch = tutorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.channel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || 
      (selectedCategory === "DSA" && tutorial.name.toLowerCase().includes('dsa')) ||
      (selectedCategory === "Web Dev" && ['html', 'css', 'javascript'].includes(tutorial.name.toLowerCase())) ||
      (selectedCategory === "Programming" && !tutorial.name.toLowerCase().includes('dsa') && 
       !['html', 'css', 'javascript'].includes(tutorial.name.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 animate-fade-in">
          {/* Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full border border-red-200">
            <Youtube className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Video Tutorials</span>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, technologies, or channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-md focus:ring-2 focus:ring-red-500/20 focus:border-red-300 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 justify-center">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/80 text-gray-700 hover:bg-red-50 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredTutorials.map((item, index) => (
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
                  alt={`${item.name} tutorial`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white font-semibold px-3 py-1 text-xs">
                    {item.name}
                  </Badge>
                </div>

                {/* YouTube Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-md rounded-full p-2">
                    <Youtube className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{item.channel}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Full Course</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Playlist</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>Popular</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/btn w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Watch Playlist
                    <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredTutorials.length === 0 && (searchTerm || selectedCategory !== "All") && (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No tutorials found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Tutorial;
