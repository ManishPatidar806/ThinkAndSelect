import { useState, useEffect } from "react";
import NotesData from "../data/NotesData";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Star,
  TrendingUp,
  ArrowRight,
  Search
} from "lucide-react";

const Notes = () => {
  const [animatedCards, setAnimatedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Stagger card animations
    const timer = setTimeout(() => {
      setAnimatedCards(NotesData.map((_, index) => index));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotes = NotesData.filter(note => 
    note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 animate-fade-in">
          {/* Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Study Materials</span>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programming languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-md focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredNotes.map((item, index) => (
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
                  alt={`${item.name} programming notes`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Language Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-gray-700 font-semibold px-3 py-1 text-xs border border-white/20">
                    {item.name}
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.name} Notes
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>PDF Format</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Free</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Notes
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredNotes.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No notes found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Notes;
