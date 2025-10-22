import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">NEWS</h4>
            <ul className="space-y-2">
              <li><Link to="/category/business" className="hover:text-yellow-400 transition-colors text-sm">Business News</Link></li>
              <li><Link to="/category/politics" className="hover:text-yellow-400 transition-colors text-sm">Politics</Link></li>
              <li><Link to="/category/news" className="hover:text-yellow-400 transition-colors text-sm">News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">LIFESTYLE</h4>
            <ul className="space-y-2">
              <li><Link to="/category/sports" className="hover:text-yellow-400 transition-colors text-sm">Sports</Link></li>
              <li><Link to="/category/entertainment" className="hover:text-yellow-400 transition-colors text-sm">Entertainment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">ABOUT</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">FOLLOW US</h4>
            <div className="flex gap-4 mb-4">
              <Link
                to="https://www.facebook.com/share/1ERLMt2udP/?mibextid=wwXIfr"
                className="hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </Link>
              <Link
                to="https://x.com/cvmtv?s=21"
                className="hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </Link>
              <Link
                to="https://www.instagram.com/cvm_television?igsh=MWo1cXR3cWtqbGkwYg=="
                className="hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </Link>
              <Link
                to="https://youtube.com/@cvm_television?si=W-0AdX9XZdH4oAuKhttps://www.youtube.com/@cvm_television"
                className="hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </Link>
              <Link
                to="https://jm.linkedin.com/company/cvm-tv"
                className="hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </Link>
            </div>
            <p className="text-sm text-gray-400">Stay connected with the latest news and updates</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img src="/cvmtv-logo.png" alt="CVM Television" className="h-10" />
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 CVM News. All rights reserved. Your trusted source for global news and information.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
