import { Link } from 'react-router-dom';
import { LiveVideoThumbnail } from './LiveVideoThumbnail';
import { FavoriteButton } from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

export function HeroSection() {
  const { setShowLoginModal } = useAuth();

  return (
    <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <div className="mb-6 sm:mb-8 grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden flex items-center justify-center bg-[#D97E33]">
              <img
                src="/buzzad2.png"
                alt="Advertisement"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <LiveVideoThumbnail />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 w-full overflow-hidden">
          <Link to="/story/breakthrough-medical-research-announced" className="relative group cursor-pointer block w-full">
            <div className="relative h-[300px] sm:h-[350px] lg:h-[500px] bg-gray-900 overflow-hidden rounded-lg w-full">
              <FavoriteButton
                storyId="breakthrough-medical-research-announced"
                onLoginRequired={() => setShowLoginModal(true)}
              />
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Breaking news"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 dark:bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase">
                  Breaking
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                  Breakthrough Medical Research Offers Hope for Disease Treatment
                </h2>
                <p className="text-gray-200 text-xs sm:text-sm mb-2 hidden sm:block">
                  Scientists announce major breakthrough in medical research that could revolutionize treatment options
                </p>
                <span className="text-xs text-gray-300">2 hours ago</span>
              </div>
            </div>
          </Link>

          <div className="space-y-4 w-full min-w-0">
            <Link to="/story/landmark-legislation-passes-parliament" className="relative group cursor-pointer block w-full">
              <div className="relative h-[155px] bg-gray-900 overflow-hidden rounded-lg w-full">
                <FavoriteButton
                  storyId="landmark-legislation-passes-parliament"
                  onLoginRequired={() => setShowLoginModal(true)}
                />
                <img
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Parliament"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm sm:text-base font-bold mb-1 leading-tight">
                    Landmark Legislation Passes Parliament After Months of Debate
                  </h3>
                  <span className="text-xs text-gray-300">3 hours ago</span>
                </div>
              </div>
            </Link>

            <Link to="/story/tech-giant-artificial-intelligence-breakthrough" className="relative group cursor-pointer block w-full">
              <div className="relative h-[155px] bg-gray-900 overflow-hidden rounded-lg w-full">
                <FavoriteButton
                  storyId="tech-giant-artificial-intelligence-breakthrough"
                  onLoginRequired={() => setShowLoginModal(true)}
                />
                <img
                  src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Tech investment"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm sm:text-base font-bold mb-1 leading-tight">
                    Tech Giant Announces Major Artificial Intelligence Breakthrough
                  </h3>
                  <span className="text-xs text-gray-300">4 hours ago</span>
                </div>
              </div>
            </Link>

            <Link to="/story/community-rebuilds-after-natural-disaster" className="relative group cursor-pointer block w-full">
              <div className="relative h-[155px] bg-gray-900 overflow-hidden rounded-lg w-full">
                <FavoriteButton
                  storyId="community-rebuilds-after-natural-disaster"
                  onLoginRequired={() => setShowLoginModal(true)}
                />
                <img
                  src="https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Community recovery"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm sm:text-base font-bold mb-1 leading-tight">
                    Community Comes Together to Rebuild After Natural Disaster
                  </h3>
                  <span className="text-xs text-gray-300">5 hours ago</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-6 w-full min-w-0">
            <div className="w-full">
              <div className="border-b-2 border-blue-600 dark:border-blue-400 pb-2 mb-4">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase">Live on CVM TV</h2>
              </div>
              <ul className="space-y-2 w-full">
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Morning Live</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">6:00 AM</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Prime Time News</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">7:00 PM</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="flex-shrink-0">•</span>
                  <div className="flex justify-between items-center flex-1 min-w-0">
                    <span className="font-medium text-sm sm:text-base">Sports Tonight</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">10:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full">
              <div className="border-b-2 border-blue-600 dark:border-blue-400 pb-2 mb-4">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase">Headline News</h2>
              </div>
              <ul className="space-y-3 sm:space-y-4 w-full">
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/international-summit-diplomatic-progress"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      International Summit Yields Diplomatic Progress on Key Issues
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">1 hour ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/global-markets-rally-economic-data"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Global Markets Rally on Strong Economic Data and Corporate Earnings
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">2 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/renewable-energy-investment-surge"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Renewable Energy Investment Reaches Record Levels Globally
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">3 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/education-initiative-transforms-schools"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Innovative Education Initiative Transforms Schools and Student Outcomes
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">4 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/world-cup-final-breaks-records"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      World Cup Final Breaks All-Time Viewership Records
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">5 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/olympic-athlete-breaks-world-record"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Olympic Athlete Breaks World Record in Stunning Performance
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">6 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/blockbuster-film-shatters-box-office"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Blockbuster Film Shatters Box Office Records Worldwide
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">7 hours ago</span>
                  </div>
                </li>
                <li className="text-gray-900 dark:text-white flex items-start sm:items-center gap-2">
                  <span className="flex-shrink-0 mt-1 sm:mt-0">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <Link
                      to="/story/climate-summit-nations-pledge-action"
                      className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium line-clamp-2 sm:line-clamp-1 sm:truncate flex-1 min-w-0 text-sm sm:text-base"
                    >
                      Climate Summit: Nations Pledge Unprecedented Environmental Action
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">8 hours ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
