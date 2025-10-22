import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch with our team</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Location</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                69 Constant Spring Road <br/>
                Kingston<br/>
                Jamaica<br/>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Phone className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Main: (876) 926-1100<br />
                  News Desk: (876) 926-1150
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Mail className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  General: info@cvmtv.com<br />
                  News Tips: news@cvmtv.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="news-tip">News Tip</option>
                  <option value="feedback">Feedback</option>
                  <option value="advertising">Advertising</option>
                  <option value="career">Career Opportunities</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Clock className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Office Hours</h3>
                  <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-lg shadow-md p-8 text-white transition-colors">
              <h3 className="text-xl font-bold mb-4">News Tips</h3>
              <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                Have a story idea or news tip? We want to hear from you. Our news team is always looking
                for important stories that matter to our community.
              </p>
              <p className="text-blue-100 text-sm">
                Email us at <a href="mailto:news@cvmtv.com" className="underline hover:text-white">news@cvmtv.com</a> or
                call our news desk at (876) 926-1150
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Stay connected with us on social media for the latest news updates and behind-the-scenes content.
              </p>
              <div className="flex gap-4">
                <Link
                  to="https://www.facebook.com/share/1ERLMt2udP/?mibextid=wwXIfr"
                  className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
                <Link
                  to="https://x.com/cvmtv?s=21"
                  className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
                <Link
                  to="https://www.instagram.com/cvm_television?igsh=MWo1cXR3cWtqbGkwYg=="
                  className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  to="https://youtube.com/@cvm_television?si=W-0AdX9XZdH4oAuKhttps://www.youtube.com/@cvm_television"
                  className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
                <Link
                  to="https://jm.linkedin.com/company/cvm-tv"
                  className="text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
