import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Profiles', path: '/profiles' },
    { name: 'Submit Sermon', path: '/submit' },
    { name: 'Create Profile', path: '/create-profile' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-900" />
              <span className="ml-2 text-xl font-serif font-bold text-indigo-900">Sermon Steward</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path) 
                    ? 'text-indigo-900 border-b-2 border-indigo-900' 
                    : 'text-gray-600 hover:text-indigo-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/dashboard" className="btn-primary">
              My Account
            </Link>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-indigo-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-indigo-50 text-indigo-900'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/dashboard" 
              className="block px-3 py-3 mt-4 text-center btn-primary w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;