import { Users, Award, Globe, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About CVM News</h1>
          <p className="text-xl text-blue-100">Your trusted source for comprehensive news coverage</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              CVM News has been at the forefront of journalism for over three decades, delivering accurate,
              timely, and comprehensive news coverage to audiences across Jamaica and around the world.
              Founded with a commitment to excellence and integrity, we have grown to become one of the
              most trusted names in broadcast and digital journalism.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our journey began with a simple mission: to inform, educate, and empower our audience through
              quality journalism. Today, we continue to uphold these values while embracing new technologies
              and platforms to reach audiences wherever they are. From breaking news to in-depth analysis,
              from local stories to global events, CVM News remains dedicated to serving the public interest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                  <Users className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Award-winning journalists and experienced professionals
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                  <Award className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Trusted Source</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Decades of credibility and journalistic excellence
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                  <Globe className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Reach</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Coverage that spans local communities to international events
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                  <Target className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Clear Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Committed to truth, accuracy, and serving the public
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Integrity</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We maintain the highest standards of honesty and ethical journalism in all our reporting.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accuracy</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every story is thoroughly researched and fact-checked to ensure our audience receives reliable information.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Independence</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our editorial decisions are made free from commercial or political influence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We serve the communities we cover, giving voice to diverse perspectives and untold stories.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-lg shadow-md p-8 text-white transition-colors">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Are you passionate about journalism and storytelling? CVM News is always looking for talented
              individuals to join our team. We offer opportunities across news reporting, production, digital
              media, and technical operations.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us About Careers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
