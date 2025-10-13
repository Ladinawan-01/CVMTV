import { Clock, Tv, Signal } from 'lucide-react';

export function LiveBroadcastPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
              <Signal size={16} />
              <span className="text-sm font-bold uppercase">Live</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              CVM Television Live Broadcast
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Watch CVM Television's live broadcast - Jamaica's trusted source for news and entertainment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-video bg-black flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/live_stream?channel=UCQvJlPa_fXJT0vr7qVjBaBw"
                  title="CVM Television Live Stream"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 bg-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Live Now on CVM TV</h2>
                    <p className="text-gray-300">Broadcasting from Kingston, Jamaica</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={18} />
                    <span className="text-sm">24/7</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">About the Stream</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    CVM Television brings you comprehensive news coverage, entertainment, sports, and current affairs programming.
                    Stay informed with our live broadcast featuring breaking news, in-depth analysis, and exclusive interviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
              <div className="flex items-start gap-3">
                <Tv className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Watching on TV?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    CVM Television is available on cable and satellite providers across Jamaica.
                    Check your local listings for channel information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Today's Schedule
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    6:00 AM - 9:00 AM
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">Morning News</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Start your day with the latest news and weather
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    12:00 PM - 1:00 PM
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">Midday Report</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Breaking news and market updates
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    7:00 PM - 8:00 PM
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">Evening News</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Comprehensive coverage of the day's events
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    10:00 PM - 11:00 PM
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">Late Night News</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Final news update and analysis
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg shadow-md p-6 text-white transition-colors">
              <h3 className="text-xl font-bold mb-3">Stay Connected</h3>
              <p className="text-blue-100 text-sm mb-4">
                Follow us on social media for updates, behind-the-scenes content, and exclusive interviews.
              </p>
              <a
                href="https://cvmtv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Visit CVMTV.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
