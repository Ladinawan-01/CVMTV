/*
  # Insert Demo Stories for All Categories

  1. Purpose
    - Add 5 demo stories for each category (Sports, Business, Politics, News, Entertainment)
    - Total of 25 stories across all categories
    - Uses Unsplash images for realistic visuals
    - Each story includes title, excerpt, full content, author, and metadata

  2. Categories Covered
    - Sports: 5 stories about various sporting events
    - Business: 5 stories about business and economy
    - Politics: 5 stories about political developments
    - News: 5 stories about general news
    - Entertainment: 5 stories about entertainment and culture

  3. Data Structure
    - Each story has a unique slug for URL routing
    - Professional content with realistic excerpts
    - High-quality Unsplash images
    - View counts initialized to realistic numbers
*/

-- Sports Stories
INSERT INTO stories (slug, title, category, excerpt, content, image_url, author, published_at, views)
VALUES
(
  'world-cup-final-breaks-records',
  'World Cup Final Breaks All-Time Viewership Records',
  'Sports',
  'Historic football match captivates billions worldwide as two powerhouse teams compete for the ultimate trophy',
  'The World Cup final has shattered all previous viewership records, with an estimated 3.5 billion people tuning in to watch the thrilling match. The game lived up to its billing as one of the greatest finals in tournament history, featuring dramatic moments, exceptional athleticism, and a nail-biting finish that kept fans on the edge of their seats until the final whistle.

The match showcased the beautiful game at its finest, with both teams displaying tactical brilliance and individual skill. Young stars emerged alongside veteran players, creating memorable moments that will be remembered for generations. The tournament has been praised for its organization, passionate fans, and the spirit of international competition it embodies.

Football analysts are calling this one of the most competitive World Cup tournaments in recent memory, with several underdog teams making deep runs and established powers facing unexpected challenges. The final was a fitting conclusion to weeks of extraordinary football that united nations and communities around the globe.',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=800&fit=crop',
  'Marcus Johnson',
  NOW() - INTERVAL '2 hours',
  15234
),
(
  'olympics-record-breaking-performances',
  'Olympics See Record-Breaking Performances Across Multiple Disciplines',
  'Sports',
  'Athletes push the boundaries of human achievement with stunning displays at the summer games',
  'The Olympic Games continue to showcase extraordinary athletic performances, with multiple world records falling across swimming, track and field, and gymnastics. Athletes from around the globe have demonstrated peak physical condition and mental fortitude, inspiring millions with their dedication and achievements.

Swimming events saw three world records broken in a single evening session, with competitors shaving precious milliseconds off times that stood for years. Track and field witnessed a historic performance in the 100-meter dash, while gymnasts executed routines of unprecedented difficulty and artistry.

The Olympic spirit of excellence, friendship, and respect has been on full display throughout the competition. Beyond medals and records, the games have provided a platform for athletes to share their stories, inspire youth, and promote the values of sport. The host city has been praised for its venues and organization, creating an atmosphere that brings out the best in competitors.',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
  'Sarah Chen',
  NOW() - INTERVAL '5 hours',
  12890
),
(
  'tennis-champion-grand-slam-victory',
  'Tennis Champion Claims Historic Grand Slam Victory',
  'Sports',
  'Rising star defeats veteran opponent in epic five-set battle at championship final',
  'In one of the most dramatic Grand Slam finals in recent years, a rising tennis star has claimed their first major championship after an epic five-set battle that lasted over four hours. The match featured incredible shot-making, tactical adjustments, and a display of mental toughness that had the crowd roaring from start to finish.

The young champion showed remarkable composure in crucial moments, saving multiple match points before ultimately prevailing. Their opponent, a seasoned veteran with multiple Grand Slam titles, fought valiantly but couldn''t overcome the younger player''s powerful groundstrokes and relentless energy. The match will be remembered as a changing of the guard moment in professional tennis.

Tennis experts are predicting a bright future for the new champion, noting their complete game and champion''s mentality. The victory caps a breakthrough season that has seen them rise rapidly in the world rankings and establish themselves as a force to be reckoned with in the sport.',
  'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=800&fit=crop',
  'David Martinez',
  NOW() - INTERVAL '8 hours',
  9876
),
(
  'basketball-playoffs-intense-rivalry',
  'Basketball Playoffs Heat Up with Intense Rivalry Matchup',
  'Sports',
  'Championship series delivers thrilling games as historic rivals battle for supremacy',
  'The basketball championship series has delivered on its promise of high-stakes drama, with two storied rivals engaged in an intense battle for the title. Game after game has come down to the final possessions, showcasing elite talent and championship pedigree on both sides.

Star players have elevated their games when it matters most, producing highlight-reel plays and clutch performances under pressure. The coaching chess match has been equally compelling, with strategic adjustments and tactical innovations adding layers of intrigue to each contest. Fans have been treated to the kind of basketball that defines championship moments.

The rivalry between these franchises spans decades and includes memorable playoff battles, legendary players, and passionate fan bases. This current series is adding another chapter to that storied history, with both teams fighting for a championship that would cement their place in basketball lore. The remaining games promise even more excitement as the series reaches its climax.',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
  'James Wilson',
  NOW() - INTERVAL '12 hours',
  11234
),
(
  'marathon-runners-inspire-millions',
  'Marathon Runners Inspire Millions with Determination and Heart',
  'Sports',
  'City marathon sees record participation as runners of all abilities cross the finish line',
  'The annual city marathon has concluded with record participation, as thousands of runners took to the streets to test their limits and achieve personal goals. From elite athletes racing for the podium to first-time marathoners simply hoping to finish, the event showcased the inclusive spirit of distance running and the power of human determination.

The race featured inspiring stories of perseverance, including runners overcoming injuries, raising money for charitable causes, and honoring loved ones. Spectators lined the course throughout, providing encouragement and energy that propelled runners through the challenging 26.2-mile journey. The atmosphere was electric from start to finish.

Marathon organizers reported perfect weather conditions and seamless logistics, contributing to a successful event that has become a beloved tradition in the city. The race not only highlights athletic achievement but also brings the community together and raises significant funds for local charities. Planning is already underway for next year''s event, with early registration numbers exceeding expectations.',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
  'Emily Rodriguez',
  NOW() - INTERVAL '18 hours',
  8765
);

-- Business Stories
INSERT INTO stories (slug, title, category, excerpt, content, image_url, author, published_at, views)
VALUES
(
  'tech-giant-artificial-intelligence-breakthrough',
  'Tech Giant Announces Major Artificial Intelligence Breakthrough',
  'Business',
  'Revolutionary AI system promises to transform industries and boost productivity across sectors',
  'A leading technology company has unveiled a groundbreaking artificial intelligence system that researchers say represents a significant leap forward in machine learning capabilities. The new AI platform demonstrates advanced reasoning abilities and can handle complex tasks across multiple domains with unprecedented accuracy and efficiency.

The announcement has sent ripples through the tech industry, with analysts predicting widespread adoption across sectors including healthcare, finance, manufacturing, and education. Company executives outlined plans to make the technology available to enterprise customers and developers, potentially creating new opportunities for innovation and business transformation.

Investors responded enthusiastically to the news, with the company''s stock price surging on the announcement. Industry experts note that this development could accelerate the ongoing AI revolution and change how businesses operate in fundamental ways. The company has emphasized its commitment to responsible AI development, including safety measures and ethical guidelines to ensure the technology benefits society.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
  'Jennifer Park',
  NOW() - INTERVAL '3 hours',
  18543
),
(
  'global-markets-rally-economic-data',
  'Global Markets Rally on Strong Economic Data and Corporate Earnings',
  'Business',
  'Stock indices reach new highs as investors gain confidence in economic recovery',
  'Financial markets around the world experienced significant gains following the release of encouraging economic data and better-than-expected corporate earnings reports. Major stock indices climbed to new record highs, reflecting growing investor confidence in the strength and sustainability of the economic recovery.

The positive momentum was driven by robust employment figures, healthy consumer spending, and strong corporate profitability across multiple sectors. Technology, healthcare, and consumer discretionary stocks led the advance, while cyclical industries also posted solid gains. Bond yields moved higher as investors adjusted expectations for future economic growth and monetary policy.

Market analysts attribute the rally to a combination of solid economic fundamentals, easing inflation pressures, and corporate agility in navigating challenging conditions. While some caution about potential headwinds remains, the overall sentiment has turned more optimistic. Institutional investors are deploying capital into equities, betting on continued expansion and innovation-driven growth.',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop',
  'Michael Thompson',
  NOW() - INTERVAL '6 hours',
  14567
),
(
  'renewable-energy-investment-surge',
  'Renewable Energy Investment Reaches Record Levels Globally',
  'Business',
  'Massive capital flows into solar, wind, and battery storage projects signal energy transition acceleration',
  'Investment in renewable energy projects has reached unprecedented levels, with global capital commitments exceeding previous records by a significant margin. Solar, wind, and energy storage technologies are attracting billions in funding from governments, corporations, and financial institutions committed to the clean energy transition.

The investment surge reflects growing recognition that renewable energy is not only environmentally necessary but also economically compelling. Declining technology costs, improving efficiency, and supportive policy frameworks have made clean energy projects increasingly attractive to investors seeking both returns and positive environmental impact.

Industry leaders point to this moment as a tipping point in the global energy transition. Major corporations are announcing ambitious renewable energy procurement goals, while utilities are accelerating the retirement of fossil fuel assets and building out clean energy infrastructure. The shift is creating new jobs, spurring innovation, and reshaping the energy landscape in profound ways.',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop',
  'Alexandra Green',
  NOW() - INTERVAL '10 hours',
  12098
),
(
  'startup-unicorn-status-funding',
  'Tech Startup Achieves Unicorn Status with Massive Funding Round',
  'Business',
  'Innovative company secures billion-dollar valuation as investors bet on disruptive technology',
  'A fast-growing technology startup has achieved unicorn status following a substantial funding round that values the company at over one billion dollars. The investment, led by prominent venture capital firms, will fuel the company''s expansion plans and accelerate development of its innovative platform.

The startup has gained attention for its unique approach to solving persistent industry challenges, combining cutting-edge technology with user-friendly design. Early customers report significant improvements in efficiency and cost savings, validating the company''s business model and growth potential. The founder''s vision and the team''s execution have impressed investors who see massive market opportunity.

This latest funding milestone positions the company to scale operations, expand into new markets, and potentially disrupt established players in the industry. The startup plans to use the capital for hiring top talent, investing in research and development, and building strategic partnerships. Industry observers are watching closely to see if the company can maintain its momentum and deliver on its ambitious goals.',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop',
  'Kevin Zhang',
  NOW() - INTERVAL '14 hours',
  10234
),
(
  'retail-sector-transformation-ecommerce',
  'Retail Sector Undergoes Transformation as E-commerce Integration Deepens',
  'Business',
  'Traditional retailers embrace digital strategies to meet changing consumer preferences',
  'The retail industry is experiencing a fundamental transformation as companies integrate digital technologies and e-commerce capabilities to serve evolving consumer expectations. Major retailers are investing heavily in online platforms, mobile apps, and omnichannel experiences that seamlessly blend physical and digital shopping.

This strategic shift reflects changing consumer behavior, with shoppers demanding convenience, personalization, and flexible fulfillment options. Successful retailers are leveraging data analytics, artificial intelligence, and logistics innovations to optimize inventory, personalize recommendations, and deliver products quickly and efficiently.

The transformation is reshaping retail operations, store formats, and workforce requirements. Companies are reimagining physical stores as experience centers and fulfillment hubs rather than simply points of sale. Those adapting effectively are seeing improved customer engagement and financial performance, while laggards risk losing market share in an increasingly competitive landscape.',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  'Patricia Anderson',
  NOW() - INTERVAL '20 hours',
  9432
);

-- Politics Stories
INSERT INTO stories (slug, title, category, excerpt, content, image_url, author, published_at, views)
VALUES
(
  'landmark-legislation-passes-parliament',
  'Landmark Legislation Passes Parliament After Months of Debate',
  'Politics',
  'Historic bill addressing critical national priorities receives bipartisan support',
  'After months of intense debate and negotiation, parliament has passed landmark legislation addressing several critical national priorities. The comprehensive bill received bipartisan support in the final vote, representing a rare moment of cross-party collaboration on significant policy matters.

Key provisions of the legislation include substantial investments in infrastructure, education reforms, healthcare improvements, and environmental protection measures. Lawmakers from both sides of the aisle worked together to craft compromises that balanced different policy priorities and regional concerns. The bill''s passage is being hailed as a significant achievement in an often polarized political environment.

Government officials are now preparing for implementation of the new law, which will require coordination across multiple agencies and levels of government. Stakeholders across various sectors have expressed support for the legislation, though some advocacy groups continue to push for additional reforms. Political analysts see the bill''s passage as potentially setting a precedent for future collaborative efforts on other pressing issues.',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=800&fit=crop',
  'Robert Kim',
  NOW() - INTERVAL '4 hours',
  16789
),
(
  'international-summit-diplomatic-progress',
  'International Summit Yields Diplomatic Progress on Key Issues',
  'Politics',
  'World leaders commit to enhanced cooperation on security, trade, and climate challenges',
  'A high-level international summit has concluded with significant diplomatic progress on multiple fronts, as world leaders committed to enhanced cooperation on security challenges, trade relations, and climate action. The multi-day gathering brought together heads of state and government ministers for substantive discussions and negotiations.

Summit participants signed several agreements addressing regional security concerns, trade facilitation measures, and coordinated approaches to climate change mitigation. The tone of the meetings was described as constructive, with leaders finding common ground despite some persistent disagreements on specific issues.

Diplomatic observers view the summit outcomes as positive steps toward strengthening international institutions and multilateral cooperation. Follow-up meetings are already being scheduled to maintain momentum on key initiatives. The success of this summit may provide a template for addressing other global challenges through coordinated diplomatic efforts.',
  'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=1200&h=800&fit=crop',
  'Elizabeth Warren',
  NOW() - INTERVAL '7 hours',
  13456
),
(
  'electoral-reform-proposal-debate',
  'Electoral Reform Proposal Sparks Intense Political Debate',
  'Politics',
  'Proposed changes to voting systems and campaign finance draw strong reactions',
  'A comprehensive electoral reform proposal has ignited passionate debate among politicians, legal experts, and citizens. The proposed changes would modify voting procedures, campaign finance regulations, and electoral district boundaries, with proponents arguing the reforms would strengthen democratic participation and opponents expressing concerns about unintended consequences.

Supporters of the reforms cite research showing potential benefits including increased voter turnout, reduced influence of money in politics, and more representative outcomes. They argue the changes are necessary to address declining public trust in democratic institutions and ensure fair representation of diverse communities.

Opposition voices warn that some proposed changes could create new problems or unfairly advantage certain political interests. Public hearings have drawn large crowds and passionate testimony from citizens on all sides of the debate. The proposal''s fate remains uncertain as political leaders weigh the competing arguments and assess public opinion on this sensitive topic.',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=800&fit=crop',
  'Thomas Jefferson',
  NOW() - INTERVAL '11 hours',
  11234
),
(
  'government-announces-budget-priorities',
  'Government Announces Budget Priorities for Coming Fiscal Year',
  'Politics',
  'New spending plan emphasizes education, healthcare, and infrastructure investments',
  'The government has unveiled its budget proposal for the upcoming fiscal year, outlining spending priorities and revenue measures that will shape policy implementation across all sectors. The plan emphasizes significant investments in education, healthcare infrastructure, and transportation while proposing tax reforms to ensure fiscal sustainability.

Education funding would see substantial increases, with resources directed toward teacher salaries, school facilities, and expanded access to higher education. Healthcare investments focus on modernizing medical facilities, expanding coverage, and supporting research initiatives. Infrastructure spending targets road and bridge repairs, public transit expansion, and digital connectivity improvements.

Political reactions to the budget proposal fall along predictable lines, with governing party members praising the investments and opposition parties questioning spending priorities and revenue assumptions. The proposal now enters a legislative review process where amendments may be negotiated before final approval. Economists are analyzing the budget''s likely economic impacts and fiscal sustainability.',
  'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=800&fit=crop',
  'Maria Santos',
  NOW() - INTERVAL '15 hours',
  10567
),
(
  'political-leaders-address-housing-crisis',
  'Political Leaders Unite to Address Growing Housing Affordability Crisis',
  'Politics',
  'Cross-party initiative aims to tackle housing shortage and rising costs',
  'Political leaders from across the spectrum have come together to address the growing housing affordability crisis affecting communities nationwide. The unusual cross-party collaboration reflects recognition that housing challenges transcend traditional political divides and require comprehensive solutions.

The initiative includes proposals to increase housing supply through zoning reforms, incentivize construction of affordable units, provide assistance to first-time homebuyers, and protect renters from excessive cost increases. Leaders acknowledge that no single approach will solve the complex problem, necessitating a multi-faceted strategy.

Housing advocates have welcomed the political attention to this critical issue, though some express skepticism about whether proposed measures go far enough. The collaboration demonstrates potential for finding common ground on policy challenges that directly impact citizens'' daily lives. Implementation will require coordination between national and local governments along with private sector participation.',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
  'David Thompson',
  NOW() - INTERVAL '22 hours',
  9876
);

-- News Stories
INSERT INTO stories (slug, title, category, excerpt, content, image_url, author, published_at, views)
VALUES
(
  'breakthrough-medical-research-announced',
  'Breakthrough Medical Research Offers Hope for Disease Treatment',
  'News',
  'Scientists discover promising new approach to treating previously difficult conditions',
  'Medical researchers have announced a significant breakthrough that could transform treatment options for patients suffering from a range of difficult conditions. The discovery, published in a leading scientific journal, demonstrates a novel therapeutic approach that showed remarkable effectiveness in clinical trials.

The research team spent years investigating the underlying mechanisms of disease progression before identifying a promising target for intervention. Early-stage trials with patients demonstrated both safety and efficacy, with many participants experiencing substantial improvements in symptoms and quality of life. The results have generated excitement in the medical community.

Further research and larger clinical trials are planned to confirm these initial findings and work toward regulatory approval. If successful, the treatment could become available to patients within several years. The breakthrough exemplifies the value of sustained investment in biomedical research and the potential for scientific innovation to improve human health.',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=800&fit=crop',
  'Dr. Rachel Foster',
  NOW() - INTERVAL '2 hours',
  17890
),
(
  'community-rebuilds-after-natural-disaster',
  'Community Comes Together to Rebuild After Natural Disaster',
  'News',
  'Residents show resilience and solidarity in recovery efforts following devastating event',
  'A community devastated by a recent natural disaster is demonstrating remarkable resilience as residents work together to rebuild homes, businesses, and infrastructure. The disaster, which struck without warning, caused extensive damage and displaced thousands of families, but the spirit of solidarity and mutual support has been inspiring.

Relief organizations, government agencies, and volunteers from neighboring regions have mobilized to provide emergency assistance and support reconstruction efforts. Temporary housing has been established for displaced families, while crews work to restore essential services including power, water, and communications. The outpouring of support from across the country has been overwhelming.

Community leaders are focused not just on rebuilding what was lost, but on creating a more resilient future. Plans include improved early warning systems, stronger building codes, and enhanced emergency preparedness measures. The recovery will take time, but residents express determination to emerge from this tragedy stronger and more united than before.',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=800&fit=crop',
  'Sarah Mitchell',
  NOW() - INTERVAL '5 hours',
  14321
),
(
  'education-initiative-transforms-schools',
  'Innovative Education Initiative Transforms Schools and Student Outcomes',
  'News',
  'New teaching methods and technology integration show promising results across district',
  'An innovative education initiative is showing impressive results after being implemented across school districts, with students demonstrating improved academic performance, engagement, and enthusiasm for learning. The program combines modern teaching methods, technology integration, and personalized learning approaches to better serve diverse student needs.

Teachers participating in the initiative report that the new methods allow them to identify and address individual student challenges more effectively while fostering creativity and critical thinking skills. The technology components provide students with interactive learning experiences and immediate feedback, making education more engaging and effective.

Educational experts visiting participating schools have been impressed by the positive classroom environment and student progress. The initiative includes comprehensive teacher training and ongoing support to ensure successful implementation. Based on these encouraging results, other school districts are expressing interest in adopting similar approaches to enhance educational quality.',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
  'Linda Martinez',
  NOW() - INTERVAL '9 hours',
  11567
),
(
  'archaeological-discovery-ancient-civilization',
  'Archaeological Discovery Sheds New Light on Ancient Civilization',
  'News',
  'Excavation uncovers artifacts and structures revealing previously unknown historical details',
  'Archaeologists conducting excavations at a historical site have made a remarkable discovery that is rewriting understanding of an ancient civilization. The find includes well-preserved artifacts, architectural structures, and written records that provide unprecedented insights into the culture, technology, and daily life of people who lived thousands of years ago.

The discovery challenges some existing theories about the civilization''s development and achievements. Artifacts indicate more advanced technological capabilities than previously believed, while architectural elements suggest sophisticated understanding of engineering and urban planning. Written materials are being carefully translated by experts and promise to reveal new information about the society''s beliefs and practices.

The excavation team includes specialists from multiple countries working collaboratively to carefully document and preserve the findings. The site will continue to be studied for years to come, likely yielding additional discoveries. Museums are already planning exhibitions to share these remarkable findings with the public and bring ancient history to life.',
  'https://images.unsplash.com/photo-1609882269244-ed1e16e61bed?w=1200&h=800&fit=crop',
  'Omar Hassan',
  NOW() - INTERVAL '13 hours',
  10234
),
(
  'public-health-campaign-achieves-goals',
  'Public Health Campaign Achieves Major Milestone in Disease Prevention',
  'News',
  'Coordinated vaccination and education efforts lead to significant reduction in preventable illness',
  'A comprehensive public health campaign has achieved a major milestone, with disease prevention goals exceeded and communities seeing substantial improvements in health outcomes. The campaign combined vaccination programs, health education, and community outreach to reach underserved populations and raise awareness about preventable illnesses.

Health officials credit the campaign''s success to strong community partnerships, effective communication strategies, and convenient access to healthcare services. Mobile health clinics brought services directly to neighborhoods with limited healthcare infrastructure, while multilingual education materials ensured information reached diverse populations.

The campaign model is being studied by public health agencies in other regions as a potential template for addressing various health challenges. Success demonstrates that well-designed, community-centered health initiatives can achieve meaningful results when properly supported and implemented. Organizers are already planning next phases to build on this momentum and address additional public health priorities.',
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&h=800&fit=crop',
  'Dr. James Wilson',
  NOW() - INTERVAL '17 hours',
  9654
);

-- Entertainment Stories
INSERT INTO stories (slug, title, category, excerpt, content, image_url, author, published_at, views)
VALUES
(
  'blockbuster-film-shatters-box-office',
  'Blockbuster Film Shatters Box Office Records Worldwide',
  'Entertainment',
  'Highly anticipated movie exceeds expectations with massive opening weekend',
  'A highly anticipated blockbuster film has shattered box office records worldwide, earning hundreds of millions in its opening weekend and setting new benchmarks for theatrical releases. The movie, which spent years in development and production, has captured audience imagination with its stunning visual effects, compelling story, and outstanding performances.

Theaters reported sold-out screenings throughout the opening weekend, with fans lining up for hours to be among the first to experience the film. The movie represents a major investment by the studio, with extensive marketing campaigns building anticipation for months leading up to release. Critics have praised the film for its technical achievements and emotional resonance.

Industry analysts predict the film will continue performing strongly in coming weeks and could become one of the highest-grossing movies of all time. The success demonstrates the enduring appeal of big-screen entertainment experiences and the power of well-crafted storytelling. The film''s achievement is especially significant as it revitalizes interest in theatrical releases and provides a boost to cinema chains worldwide.',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=800&fit=crop',
  'Sophie Laurent',
  NOW() - INTERVAL '3 hours',
  19876
),
(
  'music-festival-celebrates-diverse-artists',
  'Major Music Festival Celebrates Diverse Artists and Genres',
  'Entertainment',
  'Multi-day event showcases established stars and emerging talents to enthusiastic crowds',
  'A major music festival has concluded successfully after three days of spectacular performances by artists representing diverse genres and musical traditions. The event attracted tens of thousands of music fans who enjoyed performances by established superstars alongside emerging talents on multiple stages throughout the festival grounds.

The festival''s lineup was carefully curated to showcase musical diversity, featuring rock, pop, hip-hop, electronic, country, and world music artists. Beyond the music, the festival offered art installations, food from local vendors, and interactive experiences that created a vibrant community atmosphere. Organizers emphasized sustainability, implementing comprehensive recycling and waste reduction programs.

Attendees expressed enthusiasm for the quality of performances and the welcoming, inclusive atmosphere. Many highlighted discovering new favorite artists among the emerging acts featured on smaller stages. The festival has become an important cultural event that brings people together through shared love of music and supports both established and up-and-coming artists.',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop',
  'Marcus Johnson',
  NOW() - INTERVAL '6 hours',
  15432
),
(
  'streaming-series-cultural-phenomenon',
  'New Streaming Series Becomes Unexpected Cultural Phenomenon',
  'Entertainment',
  'Original show captivates audiences and dominates social media conversations',
  'A new streaming series has become an unexpected cultural phenomenon, captivating audiences worldwide and dominating social media conversations. The show, which premiered with little fanfare, has grown through word-of-mouth into one of the most-watched programs on the platform, with viewership numbers exceeding even the most optimistic projections.

The series has resonated with audiences through its compelling characters, sharp writing, and willingness to tackle complex themes with nuance and authenticity. Cast members have become overnight sensations, with their social media followings growing exponentially. Fan communities have emerged online, creating art, theories, and discussions about plot developments.

Entertainment industry observers are studying the show''s success to understand what made it connect so powerfully with audiences. The unexpected hit demonstrates that quality storytelling can still break through crowded entertainment landscapes and capture public imagination. The streaming platform has already renewed the series for multiple additional seasons.',
  'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=800&fit=crop',
  'Emma Watson',
  NOW() - INTERVAL '10 hours',
  17654
),
(
  'theater-production-receives-acclaim',
  'Broadway Theater Production Receives Critical Acclaim and Audience Adoration',
  'Entertainment',
  'New musical combines innovative staging with powerful performances and memorable music',
  'A new Broadway musical is receiving widespread critical acclaim and audience adoration for its innovative staging, powerful performances, and memorable musical score. The production represents years of creative development and has been praised as a fresh take on musical theater that pushes artistic boundaries while remaining emotionally accessible.

The show features a talented ensemble cast delivering powerful vocal performances and intricate choreography. The creative team has employed cutting-edge technology and staging techniques to create immersive theatrical experiences that leave audiences amazed. The musical score includes several songs that are already becoming popular beyond the theater, with cast recordings climbing music charts.

Theater industry veterans are calling the production a landmark achievement that could influence musical theater for years to come. Ticket demand has been extraordinary, with performances selling out months in advance. The show is expected to launch a national tour and international productions, bringing this theatrical experience to audiences around the world.',
  'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=800&fit=crop',
  'Christopher Lee',
  NOW() - INTERVAL '14 hours',
  12345
),
(
  'video-game-release-player-excitement',
  'Highly Anticipated Video Game Release Meets Player Excitement and Expectations',
  'Entertainment',
  'Long-awaited title delivers innovative gameplay and immersive storytelling',
  'The gaming community is celebrating the release of a highly anticipated video game that has lived up to years of hype and expectations. The title, which represents the culmination of extensive development by a renowned studio, features innovative gameplay mechanics, stunning visuals, and an immersive story that has players praising it as a masterpiece.

Reviews from critics and players alike have been overwhelmingly positive, with particular praise for the game''s attention to detail, player choice systems, and technical achievement. The developers spent years crafting a rich game world filled with engaging characters, meaningful decisions, and content that offers dozens of hours of gameplay. The game runs smoothly on multiple platforms and includes accessibility features that make it playable for diverse audiences.

Sales figures from the first week indicate the game is performing exceptionally well commercially, potentially becoming one of the best-selling titles of the year. The studio has announced plans for post-launch content updates that will expand the game world and add new experiences. Gaming communities online are actively sharing experiences, tips, and appreciation for this remarkable achievement in interactive entertainment.',
  'https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&h=800&fit=crop',
  'Alex Turner',
  NOW() - INTERVAL '19 hours',
  16789
);
