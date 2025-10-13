export interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
  views: number;
  created_at: string;
}

// Generate random IDs for each story
function generateId(slug: string): string {
  return slug.split('-').join('').substring(0, 8);
}

// Add timestamps and IDs to stories
const storiesData = [
  {
    slug: 'global-leaders-climate-summit',
    title: 'Global Leaders Convene for Climate Summit as Environmental Concerns Escalate',
    category: 'World',
    excerpt: 'World leaders gather to discuss urgent action on climate change and sustainable development initiatives',
    image_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Sarah Mitchell',
    content: `World leaders from over 150 countries have convened at the International Climate Summit to address the escalating environmental challenges facing our planet. The summit, held in Geneva, marks a critical moment in global climate policy as nations work to strengthen their commitments to reducing carbon emissions and transitioning to renewable energy sources.

Key discussions at the summit focus on accelerating the transition to clean energy, protecting biodiversity, and ensuring climate justice for vulnerable communities. Several nations have announced ambitious new targets for achieving net-zero emissions, with developed countries pledging increased financial support for climate adaptation in developing nations.

Scientists present at the summit have emphasized the urgency of immediate action, presenting new research showing accelerated impacts of climate change across ecosystems worldwide. The summit is expected to conclude with a comprehensive action plan outlining specific measures nations will take over the next decade.`
  },
  {
    slug: 'election-results-political-landscape',
    title: 'Election Results Show Shifting Political Landscape Across Region',
    category: 'Politics',
    excerpt: 'Recent elections reveal changing voter priorities and emerging political trends',
    image_url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Michael Chen',
    content: `The latest election results have revealed a significant shift in the political landscape, with voters prioritizing issues such as economic recovery, healthcare access, and environmental sustainability. The outcomes reflect changing demographics and evolving public sentiment on key policy matters.

Political analysts note that younger voters played a crucial role in these elections, with record turnout among 18-35 year olds. Issues such as climate action, education reform, and social justice dominated campaign discourse and influenced voting patterns across multiple constituencies.

The newly elected officials have committed to addressing these priorities through comprehensive policy initiatives. Coalition building and cross-party collaboration are expected to be essential for implementing major reforms in the coming legislative session.`
  },
  {
    slug: 'tech-industry-ai-sustainable-energy',
    title: 'Tech Industry Sees Major Investment in AI and Sustainable Energy',
    category: 'Business',
    excerpt: 'Leading technology companies announce billions in new funding for innovation',
    image_url: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Jennifer Rodriguez',
    content: `Major technology corporations have announced record investments totaling over $50 billion in artificial intelligence research and sustainable energy solutions. This unprecedented commitment signals a strategic shift towards addressing both technological advancement and environmental responsibility.

The investments will fund research into next-generation AI systems, renewable energy technologies, and sustainable manufacturing processes. Industry leaders emphasize that these initiatives aim to drive innovation while reducing carbon footprints and promoting responsible technology development.

Analysts predict these investments will create thousands of new jobs in emerging technology sectors and accelerate the transition to clean energy infrastructure. The move has been welcomed by environmental groups and technology experts who see it as a positive step toward sustainable innovation.`
  },
  {
    slug: 'international-travel-tourism-recovery',
    title: 'International Travel Rebounds as Tourism Industry Recovers',
    category: 'World',
    excerpt: 'Global tourism sees significant growth as travelers return to international destinations',
    image_url: 'https://images.pexels.com/photos/163792/model-planes-aircraft-aviation-163792.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'David Thompson',
    content: `The global tourism industry is experiencing a robust recovery with international travel reaching 85% of pre-pandemic levels. Popular destinations across Europe, Asia, and the Americas are reporting strong visitor numbers, signaling renewed confidence in international travel.

Airlines have expanded their route networks and increased flight frequencies to meet growing demand. Hotels and hospitality businesses are reporting high occupancy rates, with many popular destinations booking well in advance for the upcoming peak season.

Tourism officials attribute this recovery to improved health infrastructure, streamlined travel procedures, and pent-up demand for international experiences. The industry's resurgence is providing a significant boost to local economies that depend heavily on tourism revenue.`
  },
  {
    slug: 'historic-peace-agreement-nations',
    title: 'Historic Peace Agreement Signed Between Neighboring Nations',
    category: 'World',
    excerpt: 'Landmark diplomatic breakthrough ends decades of regional tensions',
    image_url: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Amara Okonkwo',
    content: `In a historic diplomatic achievement, neighboring nations have signed a comprehensive peace agreement ending decades of border disputes and regional tensions. The agreement, facilitated by international mediators, establishes frameworks for cooperation on security, trade, and cultural exchange.

The accord includes provisions for joint economic development projects, environmental protection initiatives, and people-to-people programs aimed at building lasting peace. Both nations have committed to reducing military presence along shared borders and establishing joint monitoring mechanisms.

International leaders have praised the agreement as a model for conflict resolution and regional cooperation. The signing ceremony was attended by representatives from the United Nations and regional organizations who assisted in the negotiation process.`
  },
  {
    slug: 'international-aid-disaster-communities',
    title: 'International Aid Reaches Disaster-Affected Communities',
    category: 'World',
    excerpt: 'Global humanitarian response provides relief to regions impacted by natural disasters',
    image_url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Maria Santos',
    content: `International humanitarian organizations have successfully delivered emergency aid to communities affected by recent natural disasters. The coordinated response includes food, water, medical supplies, and temporary shelter for thousands of displaced families.

Relief workers are providing immediate assistance while also planning long-term recovery programs. These include rebuilding infrastructure, restoring livelihoods, and implementing disaster risk reduction measures to enhance community resilience.

The international community has pledged continued support for reconstruction efforts. Several countries have committed resources and expertise to help affected regions build back better with improved disaster preparedness systems.`
  },
  {
    slug: 'parliament-healthcare-reform',
    title: 'Parliament Passes Historic Legislation on Healthcare Reform',
    category: 'Politics',
    excerpt: 'Landmark healthcare bill promises expanded access and improved services',
    image_url: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Robert Kim',
    content: `Parliament has passed comprehensive healthcare reform legislation aimed at expanding access to medical services and reducing costs for citizens. The historic bill represents years of negotiation and compromise among political parties and healthcare stakeholders.

Key provisions include expanded coverage for preventive care, mental health services, and prescription medications. The legislation also establishes new funding mechanisms to support rural healthcare facilities and address physician shortages in underserved areas.

Healthcare advocates have welcomed the reforms as a significant step toward ensuring equitable access to quality healthcare. Implementation of the new measures will begin in phases over the next two years, with full rollout expected within five years.`
  },
  {
    slug: 'political-leaders-economic-recovery',
    title: 'Political Leaders Debate Economic Recovery Plans',
    category: 'Politics',
    excerpt: 'Competing visions for economic growth take center stage in policy discussions',
    image_url: 'https://images.pexels.com/photos/3183156/pexels-photo-3183156.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Elizabeth Warren',
    content: `Political leaders have engaged in vigorous debates over competing approaches to economic recovery and growth. The discussions center on taxation policies, infrastructure investment, and support for small businesses and workers.

Proponents of different economic philosophies have presented detailed plans outlining their visions for sustainable prosperity. Key areas of debate include the role of government intervention, private sector innovation, and strategies for reducing income inequality.

Economists note that while approaches differ, there is broad agreement on the need for targeted investments in education, technology, and green infrastructure. The outcome of these policy discussions will shape economic direction for years to come.`
  },
  {
    slug: 'stock-markets-economic-indicators',
    title: 'Stock Markets Rally on Positive Economic Indicators',
    category: 'Business',
    excerpt: 'Financial markets respond favorably to strong economic data and corporate earnings',
    image_url: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'James Patterson',
    content: `Global stock markets have experienced significant gains following the release of positive economic indicators and strong corporate earnings reports. Major indices reached new highs as investor confidence strengthened amid signs of sustained economic growth.

The rally was driven by better-than-expected employment figures, robust consumer spending, and optimistic business investment forecasts. Technology and renewable energy sectors led the gains, reflecting investor enthusiasm for innovation and sustainability.

Market analysts attribute the positive momentum to a combination of supportive monetary policy, improving global trade conditions, and strong corporate fundamentals. However, they also caution investors to remain mindful of potential risks and market volatility.`
  },
  {
    slug: 'corporation-green-energy-initiative',
    title: 'Major Corporation Announces Green Energy Initiative',
    category: 'Business',
    excerpt: 'Industry leader commits to 100% renewable energy and carbon neutrality',
    image_url: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Alexandra Green',
    content: `A major multinational corporation has unveiled an ambitious green energy initiative aimed at achieving carbon neutrality by 2030. The comprehensive plan includes transitioning all operations to renewable energy sources and implementing sustainable practices across the supply chain.

The initiative involves significant investments in solar and wind energy infrastructure, energy-efficient technologies, and sustainable transportation solutions. The company will also partner with suppliers to reduce emissions throughout the production process.

Environmental groups have praised the announcement as a important example of corporate climate leadership. The initiative is expected to influence industry standards and encourage other major corporations to adopt similar sustainability commitments.`
  },
  {
    slug: 'championship-finals-viewership',
    title: 'Championship Finals Draw Record Viewership Numbers',
    category: 'Sports',
    excerpt: 'Historic sporting event captivates audiences worldwide with thrilling performances',
    image_url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Marcus Johnson',
    content: `The championship finals have shattered viewership records with millions of fans tuning in to watch the historic sporting event. The thrilling competition featured exceptional athletic performances and dramatic moments that kept audiences engaged throughout.

Broadcasting networks reported unprecedented streaming numbers in addition to traditional television viewership. Social media platforms saw record engagement as fans worldwide shared their reactions and celebrated the memorable moments.

Sports analysts credit the record-breaking viewership to the compelling storylines, star athletes, and the universal appeal of elite athletic competition. The success of the event demonstrates the enduring power of sports to unite and inspire audiences across cultures and continents.`
  },
  {
    slug: 'olympic-athlete-breaks-world-record',
    title: 'Olympic Athlete Breaks World Record in Stunning Performance',
    category: 'Sports',
    excerpt: 'Track and field star shatters long-standing record in spectacular fashion',
    image_url: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Marcus Johnson',
    content: `An Olympic track and field athlete has broken a world record that stood for over a decade, delivering one of the most memorable performances in recent sporting history. The achievement came during a major international competition where the athlete dominated the field with exceptional technique and determination.

The record-breaking performance drew immediate praise from sports commentators and fellow athletes who recognized the years of dedication and training required to reach this level. The athlete's achievement has inspired a new generation of competitors and demonstrated the heights that can be reached through commitment and perseverance.

Olympic officials and sports federations have celebrated the achievement as a milestone moment for the sport. The new record sets a remarkable standard and will likely inspire fierce competition as athletes around the world aim to push the boundaries even further.`
  },
  {
    slug: 'basketball-playoffs-semifinal-matchup',
    title: 'Basketball Playoffs: Semifinal Matchup Set After Dramatic Game',
    category: 'Sports',
    excerpt: 'Thrilling overtime victory sets stage for championship showdown',
    image_url: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Marcus Johnson',
    content: `A dramatic overtime victory has set up an exciting semifinal matchup in the basketball playoffs. The game featured spectacular plays, clutch shooting, and intense defensive battles that kept fans on the edge of their seats until the final buzzer.

Star players from both teams delivered outstanding performances, with the winning team's point guard scoring the decisive basket in overtime. The victory came after the team overcame a double-digit deficit in the fourth quarter, showcasing remarkable resilience and teamwork.

Basketball analysts predict the upcoming semifinal series will be highly competitive, with both teams possessing the talent and experience to make a championship run. Fans are eagerly anticipating what promises to be an unforgettable playoff series.`
  },
  {
    slug: 'tennis-star-grand-slam-victory',
    title: 'Tennis Star Clinches Grand Slam Victory in Epic Final',
    category: 'Sports',
    excerpt: 'Five-set thriller concludes with historic championship win',
    image_url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Marcus Johnson',
    content: `A tennis superstar has captured their first Grand Slam title in an epic five-set final that lasted over four hours. The match featured brilliant shot-making, tactical excellence, and incredible mental fortitude from both competitors in what many are calling one of the greatest finals in recent memory.

The champion showed remarkable composure in the deciding set, saving multiple break points before ultimately securing the breakthrough that led to victory. The win represents the culmination of years of hard work and comes after several heartbreaking defeats in previous Grand Slam finals.

Tennis experts and former champions have praised the performance, noting the technical mastery and competitive spirit displayed throughout the tournament. The victory establishes the player as one of the sport's elite competitors and suggests more Grand Slam titles may follow.`
  },
  {
    slug: 'football-transfer-season-record-deal',
    title: 'Football Transfer Season: Record Deal Shakes Up League',
    category: 'Sports',
    excerpt: 'Blockbuster signing changes balance of power in top football league',
    image_url: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Marcus Johnson',
    content: `The football transfer window has concluded with a record-breaking deal that has sent shockwaves through the sport. A top-tier club has secured the services of one of the world's most sought-after players in a transaction that shatters previous transfer records.

The blockbuster signing represents a major statement of intent from the club and is expected to significantly strengthen their championship aspirations. Football analysts suggest the deal could shift the balance of power in the league and sets a new benchmark for future transfer negotiations.

Fans and pundits are eagerly anticipating the player's debut and the impact they will have on the team's fortunes. The transfer has dominated sports headlines and sparked intense debate about the economics of modern football and competitive balance in top leagues.`
  },
  {
    slug: 'film-festival-international-cinema',
    title: 'Film Festival Celebrates Diverse International Cinema',
    category: 'Entertainment',
    excerpt: 'Award-winning directors and actors gather for prestigious cultural event',
    image_url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Sophie Laurent',
    content: `The annual international film festival has concluded with a celebration of diverse storytelling and cinematic excellence. Filmmakers from over 60 countries presented their work, showcasing a rich variety of narratives, styles, and cultural perspectives.

Award ceremonies recognized outstanding achievements in directing, acting, cinematography, and screenwriting. Several breakthrough films addressed contemporary social issues, environmental themes, and personal stories that resonated with audiences and critics alike.

Festival organizers emphasized the importance of cinema as a medium for cultural exchange and understanding. The event provided a platform for emerging filmmakers while honoring established artists who continue to push creative boundaries in filmmaking.`
  },
  {
    slug: 'health-experts-balanced-living',
    title: 'Health Experts Share Tips for Balanced Living in Modern Times',
    category: 'Lifestyle',
    excerpt: 'New research highlights importance of wellness and mental health practices',
    image_url: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Dr. Rachel Foster',
    content: `Leading health experts have released new guidelines for maintaining physical and mental wellness in today's fast-paced world. The recommendations emphasize the importance of balanced nutrition, regular physical activity, adequate sleep, and stress management techniques.

Research shows that holistic approaches to health, including mindfulness practices and social connections, contribute significantly to overall well-being. Experts encourage individuals to develop sustainable healthy habits rather than pursuing quick fixes or extreme interventions.

The guidelines also address the impact of digital technology on health, recommending strategies for managing screen time and maintaining work-life balance. Health professionals stress that small, consistent changes can lead to significant improvements in quality of life.`
  },
  {
    slug: 'innovation-summit-breakthrough-technologies',
    title: 'Innovation Summit Showcases Breakthrough Technologies',
    category: 'Technology',
    excerpt: 'Industry leaders present cutting-edge solutions for global challenges',
    image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Kevin Zhang',
    content: `The annual innovation summit brought together technology leaders, researchers, and entrepreneurs to showcase breakthrough technologies addressing global challenges. Presentations covered advances in artificial intelligence, biotechnology, clean energy, and sustainable agriculture.

Highlight demonstrations included AI systems that can predict and prevent equipment failures, biotechnology solutions for producing sustainable materials, and renewable energy technologies with improved efficiency. The summit also featured discussions on ethical considerations and responsible innovation.

Attendees expressed optimism about technology's potential to solve pressing global problems while acknowledging the importance of ensuring equitable access to these innovations. The summit concluded with announcements of new partnerships and funding initiatives to accelerate technology development.`
  },
  {
    slug: 'scientific-discovery-research-team',
    title: 'Breaking: Major Scientific Discovery Announced by Research Team',
    category: 'Science',
    excerpt: 'Groundbreaking findings could revolutionize understanding of fundamental processes',
    image_url: 'https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Dr. Elena Petrov',
    content: `A team of international researchers has announced a major scientific discovery that could fundamentally change our understanding of natural processes. The findings, published in a prestigious scientific journal, represent years of collaborative research and experimental validation.

The discovery has implications across multiple scientific disciplines and could lead to new technologies and applications. Researchers emphasized that while the breakthrough is significant, much work remains to fully understand its implications and potential applications.

The scientific community has responded with enthusiasm, with many experts calling for increased funding for related research. The discovery demonstrates the value of international scientific cooperation and sustained investment in basic research.`
  },
  {
    slug: 'economic-forum-global-trade',
    title: 'Economic Forum Addresses Global Trade and Development',
    category: 'Business',
    excerpt: 'International gathering focuses on sustainable economic growth strategies',
    image_url: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Patricia Anderson',
    content: `The Global Economic Forum concluded with commitments to strengthen international trade partnerships and promote inclusive economic development. Participants discussed strategies for building resilient supply chains, supporting small businesses, and fostering innovation.

Key themes included the digital transformation of economies, the role of sustainable practices in business, and mechanisms for ensuring equitable distribution of economic benefits. Leaders emphasized the importance of multilateral cooperation in addressing shared economic challenges.

Forum outcomes include new trade agreements, investment frameworks for developing regions, and initiatives to support workforce development in emerging industries. Participants agreed to reconvene annually to assess progress and adapt strategies to evolving global conditions.`
  },
  {
    slug: 'cultural-heritage-international-recognition',
    title: 'Cultural Heritage Sites Receive International Recognition',
    category: 'Culture',
    excerpt: 'UNESCO designates new world heritage sites celebrating human achievement',
    image_url: 'https://images.pexels.com/photos/1570610/pexels-photo-1570610.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Omar Hassan',
    content: `Several cultural and natural sites have been designated as UNESCO World Heritage Sites, recognizing their outstanding universal value and significance to humanity. The new designations include archaeological sites, historic cities, and pristine natural landscapes.

The recognition brings international attention to these sites and provides support for their preservation and management. Local communities have celebrated the designations, which are expected to boost cultural tourism and provide economic benefits while ensuring sustainable conservation.

UNESCO officials emphasized the importance of protecting these irreplaceable treasures for future generations. The organization continues to work with governments and communities worldwide to safeguard cultural heritage in the face of environmental and development challenges.`
  },
  {
    slug: 'education-reform-initiative',
    title: 'Education Reform Initiative Launched Across Multiple Nations',
    category: 'Education',
    excerpt: 'Comprehensive program aims to improve learning outcomes and access to quality education',
    image_url: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Linda Martinez',
    content: `A coalition of nations has launched a comprehensive education reform initiative focused on improving teaching quality, modernizing curricula, and expanding access to educational opportunities. The program addresses challenges including teacher training, educational technology integration, and equity in education.

Reform measures include investments in teacher professional development, updated learning materials that reflect diverse perspectives, and infrastructure improvements to support modern learning environments. The initiative also emphasizes critical thinking, creativity, and skills needed for future careers.

Education experts have praised the collaborative approach, noting that sharing best practices across borders can accelerate improvements. The program includes mechanisms for monitoring progress and adjusting strategies based on evidence of what works best for students.`
  },
  {
    slug: 'environmental-conservation-positive-results',
    title: 'Environmental Conservation Efforts Show Positive Results',
    category: 'Environment',
    excerpt: 'Protected areas report recovery of endangered species and ecosystems',
    image_url: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Catherine Brooks',
    content: `Conservation initiatives are yielding encouraging results with reports of recovering wildlife populations and restored ecosystems in protected areas. The success demonstrates the effectiveness of science-based conservation strategies and community involvement in environmental protection.

Protected area managers report increases in populations of previously endangered species, improved forest health, and successful restoration of degraded habitats. These achievements result from coordinated efforts involving governments, conservation organizations, and local communities.

Conservationists emphasize that while progress is encouraging, continued commitment and resources are necessary to sustain these gains. The success stories provide hope and models for conservation efforts worldwide, demonstrating that dedicated action can reverse environmental damage.`
  },
  {
    slug: 'public-health-campaign-milestone',
    title: 'Public Health Campaign Reaches Milestone Achievement',
    category: 'Health',
    excerpt: 'Vaccination and health education programs achieve significant coverage targets',
    image_url: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Dr. James Wilson',
    content: `A major public health campaign has achieved significant milestones in vaccination coverage and health education outreach. The program's success is attributed to community engagement, effective communication strategies, and accessible healthcare services.

Health officials report substantial reductions in preventable diseases and improved health outcomes in target populations. The campaign utilized innovative approaches including mobile health clinics, community health workers, and digital health tools to reach remote and underserved areas.

Public health experts view the campaign as a model for future health initiatives. The program's emphasis on building trust, addressing concerns, and ensuring equitable access has proven crucial to its success in achieving public health objectives.`
  },
  {
    slug: 'infrastructure-development-communities',
    title: 'Infrastructure Development Projects Transform Communities',
    category: 'Development',
    excerpt: 'New roads, bridges, and utilities improve connectivity and quality of life',
    image_url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Thomas Anderson',
    content: `Major infrastructure development projects are transforming communities by improving transportation networks, expanding access to clean water and electricity, and creating economic opportunities. The initiatives represent significant investments in long-term development and quality of life improvements.

Completed projects include new highways connecting previously isolated regions, modern bridges enhancing trade routes, and utility systems bringing reliable services to rural areas. These improvements are already showing positive impacts on commerce, education, and healthcare access.

Development planners emphasize sustainable design principles and community input in project planning. The infrastructure investments are expected to generate economic returns while improving living standards and enabling communities to reach their full potential.`
  },
  {
    slug: 'international-cooperation-regional-partnerships',
    title: 'International Cooperation Strengthens Regional Partnerships',
    category: 'World',
    excerpt: 'Nations collaborate on shared challenges through enhanced diplomatic and economic ties',
    image_url: 'https://images.pexels.com/photos/3183156/pexels-photo-3183156.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Diplomatic Correspondent',
    content: `Regional partnerships have been strengthened through new agreements on security cooperation, economic integration, and cultural exchange. The enhanced collaboration addresses shared challenges including climate change, economic development, and regional stability.

The agreements establish frameworks for joint initiatives in areas such as renewable energy development, disaster response, and educational exchanges. Leaders emphasized that regional cooperation benefits all participating nations and contributes to global peace and prosperity.

Diplomatic observers note that these partnerships represent a positive trend toward multilateral problem-solving and mutual support. The success of regional cooperation demonstrates that nations can achieve more by working together than through isolated national efforts.`
  }
];

// Create stories with proper structure
export const stories: Story[] = storiesData.map((story, index) => ({
  id: generateId(story.slug),
  slug: story.slug,
  title: story.title,
  category: story.category,
  excerpt: story.excerpt,
  content: story.content,
  image_url: story.image_url,
  author: story.author,
  published_at: new Date(Date.now() - index * 3600000).toISOString(),
  views: Math.floor(Math.random() * 10000) + 1000,
  created_at: new Date(Date.now() - index * 3600000).toISOString(),
}));

// Helper functions to simulate database operations
export const getStories = (filters?: { category?: string; author?: string; limit?: number; orderBy?: 'views' | 'published_at' }) => {
  let result = [...stories];
  
  if (filters?.category) {
    result = result.filter(s => s.category.toLowerCase() === filters.category?.toLowerCase());
  }
  
  if (filters?.author) {
    result = result.filter(s => s.author === filters.author);
  }
  
  if (filters?.orderBy === 'views') {
    result = result.sort((a, b) => b.views - a.views);
  } else if (filters?.orderBy === 'published_at') {
    result = result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }
  
  if (filters?.limit) {
    result = result.slice(0, filters.limit);
  }
  
  return result;
};

export const getStoryBySlug = (slug: string): Story | undefined => {
  return stories.find(s => s.slug === slug);
};

export const searchStories = (query: string): Story[] => {
  const lowerQuery = query.toLowerCase();
  return stories.filter(s => 
    s.title.toLowerCase().includes(lowerQuery) ||
    s.excerpt.toLowerCase().includes(lowerQuery) ||
    s.author.toLowerCase().includes(lowerQuery)
  );
};

export const incrementViews = (slug: string) => {
  const story = stories.find(s => s.slug === slug);
  if (story) {
    story.views += 1;
  }
};

// User profiles stored in localStorage
export const getUserProfile = (email: string) => {
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  return profiles[email] || null;
};

export const saveUserProfile = (email: string, profile: any) => {
  const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
  profiles[email] = { ...profile, email, updated_at: new Date().toISOString() };
  localStorage.setItem('userProfiles', JSON.stringify(profiles));
};

// Favorites stored in localStorage
export const getFavorites = (userEmail: string): string[] => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  return favorites[userEmail] || [];
};

export const addFavorite = (userEmail: string, storySlug: string) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  if (!favorites[userEmail]) {
    favorites[userEmail] = [];
  }
  if (!favorites[userEmail].includes(storySlug)) {
    favorites[userEmail].push(storySlug);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (userEmail: string, storySlug: string) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  if (favorites[userEmail]) {
    favorites[userEmail] = favorites[userEmail].filter((slug: string) => slug !== storySlug);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const isFavorited = (userEmail: string, storySlug: string): boolean => {
  const favorites = getFavorites(userEmail);
  return favorites.includes(storySlug);
};
