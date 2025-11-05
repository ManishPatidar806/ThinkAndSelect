import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  Code2, 
  BookOpen, 
  Trophy,
  ArrowUp,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ThinkAndSelect
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering developers with interactive programming quizzes, comprehensive notes, and hands-on coding practice to master their skills.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com/ManishPatidar806/ThinkAndSelect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-300 text-gray-600 hover:text-purple-600 rounded-lg transition-all duration-300 group shadow-sm"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-300 group shadow-sm"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white border border-gray-200 hover:bg-sky-50 hover:border-sky-300 text-gray-600 hover:text-sky-600 rounded-lg transition-all duration-300 group shadow-sm"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:contact@thinkandselect.com" 
                className="p-2 bg-white border border-gray-200 hover:bg-green-50 hover:border-green-300 text-gray-600 hover:text-green-600 rounded-lg transition-all duration-300 group shadow-sm"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/home" 
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Practice Quizzes
                </a>
              </li>
              <li>
                <a 
                  href="/notes" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Study Notes
                </a>
              </li>
              <li>
                <a 
                  href="/tutorial" 
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Video Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="/editer" 
                  className="text-gray-600 hover:text-green-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Code Compiler
                </a>
              </li>
            </ul>
          </div>

          {/* Programming Languages */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Languages</h4>
            <ul className="space-y-3">
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  JavaScript
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Python
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Java
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  C++
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  ReactJS
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  HTML/CSS
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className=" text-white inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>

     
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2024 ThinkAndSelect. All rights reserved.
            </div>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;