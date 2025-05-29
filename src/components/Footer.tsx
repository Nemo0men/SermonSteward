import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-serif font-bold">Sermon Steward</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Helping pastors refine their craft through professional feedback and guidance.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-300 hover:text-white transition">Preaching Guides</Link></li>
              <li><Link to="/examples" className="text-gray-300 hover:text-white transition">Example Sermons</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-white transition">Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Get In Touch</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-amber-500" />
                <a href="mailto:support@sermonsage.com" className="text-gray-300 hover:text-white transition">support@sermonsage.com</a>
              </li>
              <li className="flex items-center">
                <HelpCircle size={16} className="mr-2 text-amber-500" />
                <Link to="/support" className="text-gray-300 hover:text-white transition">Help & Support</Link>
              </li>
            </ul>
            <div className="mt-6">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">Subscribe to Newsletter</button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Sermon Steward. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;