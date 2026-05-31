const { useState, useEffect } = React;

    const TournamentGuru = () => {
      const [favorites, setFavorites] = useState(new Set());
      const [showFilters, setShowFilters] = useState(false);
      const [showMap, setShowMap] = useState(true);
      const [sortBy, setSortBy] = useState('Recommended');
      const [sortOpen, setSortOpen] = useState(false);
      const sortOptions = ['Recommended', 'Highest rated', 'Most reviewed', 'Date: soonest', 'Nearest to me'];
      
      const [activeFilters, setActiveFilters] = useState(new Set());
      const [currentPage, setCurrentPage] = useState(1);
      const [defaultFilter] = useState(() => {
        const filterNames = ['Dates', 'Age', 'Gender', 'Level', 'Format', 'Region'];
        return filterNames[Math.floor(Math.random() * filterNames.length)];
      });

      useEffect(() => {
        setActiveFilters(new Set([defaultFilter]));
      }, []);

      

      const events = [
        { id: 1, title: 'Rocky Mountain Showcase', location: 'Denver, CO', dates: 'Jul 4–6',
          photo: '1574629810360-7efbbe195018', tint: 'linear-gradient(135deg,#5b6ee1,#7a4ec0)',
          coachRating: 4.9, coachCount: 318, attendeeRating: 4.9, attendeeCount: 642,
          org: 'Mile High Soccer Club', orgYears: 12, tags: ['U13–U18', '11v11', 'Highest'],
          reviews: 960, spots: 'Only 3 spots',
          quote: 'Best-run showcase west of the Mississippi. Refs were sharp, brackets on time.', reviewer: 'Marco D. · U14 Coach' },
        { id: 2, title: 'Sunshine State Showdown', location: 'Orlando, FL', dates: 'Dec 27–30',
          photo: '1551958219-acbc608c6377', tint: 'linear-gradient(135deg,#f0789a,#f5564c)',
          coachRating: 4.9, coachCount: 604, attendeeRating: 4.8, attendeeCount: 516,
          org: 'Florida Soccer Federation', orgYears: 8, tags: ['U9–U15', '11v11', 'Highest'],
          reviews: 1120, spots: 'Open',
          quote: 'Brought four teams, all four had great competition. Already signed up next year.', reviewer: 'Sarah K. · Club Director' },
        { id: 3, title: 'Cascade Cup', location: 'Portland, OR', dates: 'Jun 12–14',
          photo: '1431324155629-1a6deb1dec8d', tint: 'linear-gradient(135deg,#4ab0fe,#00e0e8)',
          coachRating: 4.7, coachCount: 287, attendeeRating: 4.6, attendeeCount: 423,
          org: 'Pacific Soccer Alliance', orgYears: 3, tags: ['U10–U14', '7v7', 'Upper'],
          reviews: 710, spots: 'Open',
          quote: 'Loved how welcoming the volunteers were. Kids had a blast between games.', reviewer: 'Priya N. · Parent' },
        { id: 4, title: 'Mid-Atlantic Memorial', location: 'Arlington, VA', dates: 'May 23–25',
          photo: '1459865264687-595d652de67e', tint: 'linear-gradient(135deg,#fa709a,#fdc830)',
          coachRating: 4.8, coachCount: 412, attendeeRating: 4.8, attendeeCount: 578,
          org: 'DC Metro Soccer', orgYears: 6, tags: ['U13–U17', '9v9', 'Highest'],
          reviews: 990, spots: 'Only 4 spots',
          quote: 'College Connect mixer changed my recruiting timeline. Five legit conversations.', reviewer: 'Jordan P. · Player' },
          { id: 5, title: 'Coastal Classic Cup', location: 'San Diego, CA', dates: 'Aug 1–3',
            photo: '1606925797300-0b35e9d1794e', tint: 'linear-gradient(135deg,#ff9a56,#ff6a88)',
            coachRating: 4.6, coachCount: 245, attendeeRating: 4.7, attendeeCount: 389,
            org: 'Coastal Soccer Alliance', orgYears: 5, tags: ['U8–U12', '7v7', 'Middle'],
            reviews: 634, spots: 'Open',
            quote: 'Beachside fields, tight scheduling, the kids never wanted to leave.', reviewer: 'Tom B. · U10 Coach', sponsored: false },
          { id: 6, title: 'New York Elite Cup', location: 'New York, NY', dates: 'Aug 8–10',
            photo: '1500648767791-00dcc994a43e', tint: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            coachRating: 4.8, coachCount: 356, attendeeRating: 4.7, attendeeCount: 512,
            org: 'NY Youth Soccer Assoc', orgYears: 15, tags: ['U14–U18', '11v11', 'Highest'],
            reviews: 845, spots: '2 spots left',
            quote: 'Elite competition with scouts watching. Life-changing experience.', reviewer: 'Alex M. · Director', sponsored: false },
          { id: 7, title: 'Texas Premier Showcase', location: 'Austin, TX', dates: 'Jul 18–20',
            photo: '1459865264687-595d652de67e', tint: 'linear-gradient(135deg,#f59e0b,#d97706)',
            coachRating: 4.7, coachCount: 298, attendeeRating: 4.6, attendeeCount: 445,
            org: 'Texas Soccer League', orgYears: 10, tags: ['U10–U16', '11v11', 'Upper'],
            reviews: 723, spots: 'Open',
            quote: 'Great organization and competitive teams. Highly recommend.', reviewer: 'Lisa R. · Coach', sponsored: true },
          { id: 8, title: 'California Classic', location: 'Los Angeles, CA', dates: 'Sep 12–14',
            photo: '1606925797300-0b35e9d1794e', tint: 'linear-gradient(135deg,#ec4899,#be185d)',
            coachRating: 4.9, coachCount: 425, attendeeRating: 4.8, attendeeCount: 634,
            org: 'SoCal Youth Sports', orgYears: 12, tags: ['U12–U18', '11v11', 'Highest'],
            reviews: 1205, spots: 'Only 1 spot',
            quote: 'Incredible fields and amazing hospitality. Coming back next year!', reviewer: 'James T. · Parent', sponsored: false },
          { id: 9, title: 'Chicago Invitational', location: 'Chicago, IL', dates: 'Jun 15–17',
            photo: '1574629810360-7efbbe195018', tint: 'linear-gradient(135deg,#06b6d4,#0891b2)',
            coachRating: 4.6, coachCount: 267, attendeeRating: 4.5, attendeeCount: 389,
            org: 'Midwest Soccer Hub', orgYears: 8, tags: ['U8–U14', '7v7', 'Middle'],
            reviews: 567, spots: 'Open',
            quote: 'Fun atmosphere and competitive matches. Great for younger players.', reviewer: 'Michael H. · U11 Coach', sponsored: false },
          { id: 10, title: 'Boston Youth Elite', location: 'Boston, MA', dates: 'Aug 22–24',
            photo: '1551958219-acbc608c6377', tint: 'linear-gradient(135deg,#10b981,#059669)',
            coachRating: 4.8, coachCount: 334, attendeeRating: 4.7, attendeeCount: 501,
            org: 'New England Soccer', orgYears: 14, tags: ['U13–U17', '11v11', 'Highest'],
            reviews: 892, spots: '3 spots left',
            quote: 'Professional tournament experience. Highly competitive level.', reviewer: 'Robert L. · Director', sponsored: false },
          { id: 11, title: 'Miami Cup Showcase', location: 'Miami, FL', dates: 'Jul 25–27',
            photo: '1431324155629-1a6deb1dec8d', tint: 'linear-gradient(135deg,#f97316,#ea580c)',
            coachRating: 4.7, coachCount: 289, attendeeRating: 4.6, attendeeCount: 412,
            org: 'Florida Youth Events', orgYears: 7, tags: ['U10–U15', '7v7', 'Upper'],
            reviews: 678, spots: 'Open',
            quote: 'Beautiful weather and well-organized event. Loved it!', reviewer: 'Sarah N. · Parent', sponsored: false },
          { id: 12, title: 'Philadelphia Premier', location: 'Philadelphia, PA', dates: 'Sep 5–7',
            photo: '1459865264687-595d652de67e', tint: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
            coachRating: 4.8, coachCount: 312, attendeeRating: 4.7, attendeeCount: 478,
            org: 'East Coast Soccer', orgYears: 11, tags: ['U12–U18', '9v9', 'Highest'],
            reviews: 756, spots: '2 spots left',
            quote: 'Excellent tournament with strong teams and fair competition.', reviewer: 'David K. · U14 Coach', sponsored: true },
          { id: 13, title: 'Seattle Sounders Cup', location: 'Seattle, WA', dates: 'Jun 28–30',
            photo: '1606925797300-0b35e9d1794e', tint: 'linear-gradient(135deg,#06b6d4,#0891b2)',
            coachRating: 4.7, coachCount: 276, attendeeRating: 4.6, attendeeCount: 401,
            org: 'Pacific Northwest Soccer', orgYears: 9, tags: ['U10–U14', '7v7', 'Middle'],
            reviews: 612, spots: 'Open',
            quote: 'Great fields and friendly atmosphere. Highly recommend this tournament.', reviewer: 'Emma W. · Coach', sponsored: false },
          { id: 14, title: 'Atlanta Youth Championship', location: 'Atlanta, GA', dates: 'Aug 15–17',
            photo: '1500648767791-00dcc994a43e', tint: 'linear-gradient(135deg,#ec4899,#be185d)',
            coachRating: 4.9, coachCount: 398, attendeeRating: 4.8, attendeeCount: 567,
            org: 'Southern Youth Sports', orgYears: 13, tags: ['U13–U18', '11v11', 'Highest'],
            reviews: 1089, spots: 'Only 1 spot',
            quote: 'Best tournament I've attended. Amazing organization and competition.', reviewer: 'Chris P. · Director', sponsored: false },
          { id: 15, title: 'Washington DC Elite', location: 'Washington, DC', dates: 'Jul 11–13',
            photo: '1574629810360-7efbbe195018', tint: 'linear-gradient(135deg,#f59e0b,#d97706)',
            coachRating: 4.6, coachCount: 254, attendeeRating: 4.5, attendeeCount: 378,
            org: 'Mid-Atlantic Soccer', orgYears: 8, tags: ['U8–U12', '5v5', 'Middle'],
            reviews: 523, spots: 'Open',
            quote: 'Good tournament with nice facilities and friendly volunteers.', reviewer: 'Jennifer L. · Parent', sponsored: false },
          { id: 16, title: 'Arizona Desert Cup', location: 'Phoenix, AZ', dates: 'Sep 19–21',
            photo: '1551958219-acbc608c6377', tint: 'linear-gradient(135deg,#f59e0b,#d97706)',
            coachRating: 4.8, coachCount: 321, attendeeRating: 4.7, attendeeCount: 489,
            org: 'Southwest Youth Soccer', orgYears: 10, tags: ['U12–U16', '11v11', 'Upper'],
            reviews: 834, spots: '4 spots left',
            quote: 'Excellent tournament. The organization was top-notch.', reviewer: 'Mark T. · U13 Coach', sponsored: true },
          { id: 17, title: 'Carolina Youth Cup', location: 'Charlotte, NC', dates: 'Aug 29–31',
            photo: '1431324155629-1a6deb1dec8d', tint: 'linear-gradient(135deg,#10b981,#059669)',
            coachRating: 4.7, coachCount: 298, attendeeRating: 4.6, attendeeCount: 434,
            org: 'Carolina Soccer Events', orgYears: 9, tags: ['U10–U15', '7v7', 'Upper'],
            reviews: 691, spots: 'Open',
            quote: 'Fun and well-organized tournament. Great for developing teams.', reviewer: 'Nicole S. · Coach', sponsored: false },
          { id: 18, title: 'Minnesota Premier Showcase', location: 'Minneapolis, MN', dates: 'Jul 4–6',
            photo: '1606925797300-0b35e9d1794e', tint: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            coachRating: 4.8, coachCount: 345, attendeeRating: 4.7, attendeeCount: 512,
            org: 'Upper Midwest Soccer', orgYears: 11, tags: ['U13–U17', '11v11', 'Highest'],
            reviews: 923, spots: '2 spots left',
            quote: 'Fantastic tournament with high-level competition and great facilities.', reviewer: 'Paul D. · Director', sponsored: false },
          { id: 19, title: 'Colorado Springs Elite', location: 'Colorado Springs, CO', dates: 'Sep 12–14',
            photo: '1574629810360-7efbbe195018', tint: 'linear-gradient(135deg,#ec4899,#be185d)',
            coachRating: 4.6, coachCount: 267, attendeeRating: 4.5, attendeeCount: 389,
            org: 'Colorado Youth Soccer', orgYears: 8, tags: ['U10–U14', '7v7', 'Middle'],
            reviews: 598, spots: 'Open',
            quote: 'Great location and good tournament structure. Recommend it!', reviewer: 'Rachel G. · Parent', sponsored: false },
          { id: 20, title: 'Florida Keys Cup', location: 'Key West, FL', dates: 'Oct 3–5',
            photo: '1500648767791-00dcc994a43e', tint: 'linear-gradient(135deg,#06b6d4,#0891b2)',
            coachRating: 4.9, coachCount: 412, attendeeRating: 4.8, attendeeCount: 578,
            org: 'South Florida Sports', orgYears: 12, tags: ['U14–U18', '11v11', 'Highest'],
            reviews: 1156, spots: 'Only 2 spots',
            quote: 'Amazing tournament experience in a beautiful location. Worth every penny!', reviewer: 'Tom M. · U15 Coach', sponsored: true },
          { id: 21, title: 'Nevada Youth Classic', location: 'Las Vegas, NV', dates: 'Jun 20–22',
            photo: '1551958219-acbc608c6377', tint: 'linear-gradient(135deg,#f59e0b,#d97706)',
            coachRating: 4.7, coachCount: 289, attendeeRating: 4.6, attendeeCount: 421,
            org: 'Nevada Soccer League', orgYears: 7, tags: ['U11–U15', '9v9', 'Upper'],
            reviews: 645, spots: 'Open',
            quote: 'Well-organized tournament with great competition and fun atmosphere.', reviewer: 'Kevin H. · Coach', sponsored: false },
          { id: 22, title: 'Utah Premier Cup', location: 'Salt Lake City, UT', dates: 'Jul 29–31',
            photo: '1431324155629-1a6deb1dec8d', tint: 'linear-gradient(135deg,#10b981,#059669)',
            coachRating: 4.8, coachCount: 334, attendeeRating: 4.7, attendeeCount: 501,
            org: 'Rocky Mountain Soccer', orgYears: 10, tags: ['U12–U16', '11v11', 'Highest'],
            reviews: 812, spots: '3 spots left',
            quote: 'Excellent tournament with beautiful fields and friendly organizers.', reviewer: 'Susan B. · Director', sponsored: false },
          { id: 23, title: 'Oregon Youth Showcase', location: 'Portland, OR', dates: 'Aug 5–7',
            photo: '1606925797300-0b35e9d1794e', tint: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
            coachRating: 4.7, coachCount: 276, attendeeRating: 4.6, attendeeCount: 405,
            org: 'Pacific Soccer Alliance', orgYears: 9, tags: ['U10–U14', '7v7', 'Middle'],
            reviews: 623, spots: 'Open',
            quote: 'Great tournament with competitive teams and nice facilities.', reviewer: 'Linda M. · Parent', sponsored: false },
          { id: 24, title: 'Hawaii Island Cup', location: 'Honolulu, HI', dates: 'Oct 10–12',
            photo: '1500648767791-00dcc994a43e', tint: 'linear-gradient(135deg,#06b6d4,#0891b2)',
            coachRating: 4.9, coachCount: 445, attendeeRating: 4.8, attendeeCount: 634,
            org: 'Hawaii Youth Soccer', orgYears: 11, tags: ['U13–U18', '11v11', 'Highest'],
            reviews: 1267, spots: 'Only 1 spot',
            quote: 'Unforgettable experience in paradise. Highly recommend this tournament!', reviewer: 'Oscar L. · U17 Coach', sponsored: false },
          { id: 25, title: 'Canada Cup Showcase', location: 'Vancouver, BC', dates: 'Aug 8–10',
            photo: '1574629810360-7efbbe195018', tint: 'linear-gradient(135deg,#ec4899,#be185d)',
            coachRating: 4.8, coachCount: 367, attendeeRating: 4.7, attendeeCount: 523,
            org: 'Canadian Youth Soccer', orgYears: 13, tags: ['U12–U17', '11v11', 'Highest'],
            reviews: 956, spots: '2 spots left',
            quote: 'Fantastic tournament with international teams and top organization.', reviewer: 'Douglas W. · Director', sponsored: true },
        ];

      const toggleFav = (id) => {
        const next = new Set(favorites);
        next.has(id) ? next.delete(id) : next.add(id);
        setFavorites(next);
      };

      const Photo = ({ id, tint, className, style }) => (
        <div className={className} style={{ background: tint, position: 'relative', overflow: 'hidden', ...style }}>
          <img src={img(id)} alt="" className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} loading="lazy" />
        </div>
      );

      

      const filterTabs = [
        { label: 'Dates', Icon: Calendar },
        { label: 'Age', Icon: UserIcon },
        { label: 'Gender', Icon: VenusMars },
        { label: 'Level', Icon: Star },
        { label: 'Format', Icon: Crosshair },
        { label: 'Region', Icon: MapPin },
      ];

      return (
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", background: '#f3f5f9', color: '#1a1714' }} className="min-h-screen">

          {/* Nav */}
          <header className="sticky top-0 z-40" style={{ background: 'rgba(243,245,249,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #e3e8f0' }}>
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
              {/* Left: logo + nav together */}
              <div className="flex items-center gap-7">
                <TGLogo height={30} color="#e63329" />
                <nav className="hidden md:flex items-center gap-1.5" style={{ fontSize: '15px' }}>
                  {['Find Events', 'Host', 'Reviews', 'Coaches'].map((link, i) => (
                    <a key={link}
                      className={i === 0 ? "relative px-4 py-2 rounded-full font-bold cursor-pointer" : "navlink relative px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition"}
                      style={i === 0 ? { color: '#e63329', background: '#fbeae8' } : { color: '#57534e' }}>
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Right cluster: Dashboard + user card */}
              <div className="flex items-center gap-3">
                <a className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer">
                  <LayoutDashboard size={16} /> Dashboard
                </a>
                <div className="w-px h-6 hidden sm:block" style={{ background: '#e3e8f0' }} />
                {/* user card: name expands LEFT, avatar fixed RIGHT */}
                <button className="group flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full transition hover:shadow-md"
                  style={{ background: '#fff', boxShadow: '0 2px 12px rgba(20,26,40,0.08)', border: '1px solid #e8ecf3' }}>
                  <ChevronDown size={15} className="text-slate-400 group-hover:text-slate-700 transition" />
                  <span className="text-right leading-tight">
                    <span className="block text-sm font-extrabold whitespace-nowrap" style={{ color: '#1a1714' }}>Franco</span>
                    <span className="block text-xs text-slate-400 -mt-0.5">Coach</span>
                  </span>
                  <img src={AVATAR_SRC} alt="Franco" className="w-9 h-9 rounded-full object-cover flex-shrink-0" style={{ border: '2px solid #e63329' }} />
                </button>
              </div>
            </div>
          </header>

          {/* Hero */}
          <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
              {/* Left: copy with soft glass shapes behind */}
              <div className="relative">
                {/* background depth — soft blurred green mesh */}
                <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #22c55e, transparent 70%)' }} />
                <div className="absolute top-28 -left-8 w-48 h-48 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.20), transparent 70%)' }} />
                <div className="absolute bottom-8 left-28 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,51,41,0.12), transparent 70%)' }} />

                <div className="relative">
                  {/* Stat badges */}
                  <div className="flex items-center gap-3 mb-7">
                    <div className="group flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full transition hover:-translate-y-0.5"
                      style={{ background: '#fff', boxShadow: '0 4px 16px rgba(20,26,40,0.08)' }}>
                      <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: '#e63329' }}>
                        <TrendingUp size={15} className="text-white" />
                      </span>
                      <span className="flex items-baseline gap-1.5">
                        <span className="display font-extrabold text-lg leading-none" style={{ color: '#1a1714' }}>500+</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">tournaments</span>
                      </span>
                    </div>
                    <div className="group flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full transition hover:-translate-y-0.5"
                      style={{ background: '#fff', boxShadow: '0 4px 16px rgba(20,26,40,0.08)' }}>
                      <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: '#16a34a' }}>
                        <Star size={15} className="fill-white text-white" />
                      </span>
                      <span className="flex items-baseline gap-1.5">
                        <span className="display font-extrabold text-lg leading-none" style={{ color: '#1a1714' }}>12,400</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">reviews</span>
                      </span>
                    </div>
                  </div>

                  <h1 className="display font-extrabold leading-[0.95] tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem,4.5vw,4.25rem)' }}>
                    Every tournament,<br />
                    <span style={{ color: '#e63329' }}>reviewed by people</span><br />
                    who were there.
                  </h1>

                  <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                    Hotels, vans, a whole weekend on the line. Before you commit your team, see how the tournament <HighlightSwipe>actually went</HighlightSwipe> — straight from the coaches and families who showed up.
                  </p>
                </div>
              </div>

              {/* Right: composed image scene */}
              <div className="relative pl-4 pt-6 pb-6 pr-2">
                {/* soft brand glow behind for depth */}
                <div className="absolute -top-4 -right-6 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle, #16a34a, transparent 70%)' }} />
                <div className="absolute bottom-0 -left-4 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #22c55e, transparent 70%)' }} />

                {/* main image */}
                <div className="relative rounded-[2rem] overflow-hidden h-[460px]" style={{ boxShadow: '0 24px 70px rgba(20,26,40,0.22)' }}>
                  <Photo id="1569242972613-401d0d1a004e" tint="linear-gradient(135deg,#5b6ee1,#3a4a8c)" className="w-full h-full" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,18,28,0.30) 0%, transparent 40%)' }} />
                  <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

                  {/* social proof — stacked reviewer avatars, top left */}
                  <div className="absolute top-5 left-5 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: '0 6px 20px rgba(20,26,40,0.16)' }}>
                    <div className="flex -space-x-2">
                      {['1500648767791-00dcc994a43e', '1494790108377-be9c29b29330', '1438761681033-6461ffad8d80'].map((id) => (
                        <div key={id} className="w-7 h-7 rounded-full overflow-hidden" style={{ border: '2px solid #fff' }}>
                          <Photo id={id} tint="#94a3b8" className="w-full h-full" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#1a1714' }}>2,400+ reviewers</span>
                  </div>

                  {/* review CTA — white glass pill, matches the reviewers pill family */}
                  <button className="absolute bottom-5 right-5 flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full transition hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: '0 6px 20px rgba(20,26,40,0.16)' }}>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: '#e63329' }}>
                      <Star size={13} className="fill-white text-white" />
                    </span>
                    <span className="font-bold text-sm" style={{ color: '#1a1714' }}>Add your review</span>
                  </button>
                </div>

                {/* secondary framed photo — overlapping, rotated, bento feel */}
                <div className="absolute -top-2 -right-1 w-32 h-40 rounded-2xl overflow-hidden hidden sm:block" style={{ transform: 'rotate(5deg)', border: '5px solid #f3f5f9', boxShadow: '0 14px 34px rgba(20,26,40,0.20)' }}>
                  <Photo id="1551958219-acbc608c6377" tint="linear-gradient(135deg,#16a34a,#15803d)" className="w-full h-full" />
                </div>

                {/* review card — bigger */}
                <div className="absolute bottom-0 -left-4 w-[300px] rounded-3xl p-5" style={{ background: '#fff', boxShadow: '0 18px 50px rgba(20,26,40,0.20)' }}>
                  <div className="flex gap-0.5 mb-2.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-base leading-snug font-semibold mb-4" style={{ color: '#1a1714' }}>
                    "Best-run showcase we've been to. Brackets on time, refs were sharp — worth every mile we drove."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid #16a34a' }}>
                      <Photo id="1500648767791-00dcc994a43e" tint="#94a3b8" className="w-full h-full" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-extrabold flex items-center gap-1" style={{ color: '#1a1714' }}>
                        Marco D. <Shield size={13} className="text-green-600" />
                      </div>
                      <div className="text-sm text-slate-500">U14 Coach · verified review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search + filters — one elevated module */}
            <div className="rounded-3xl p-3 sm:p-4" style={{ background: '#fff', boxShadow: '0 18px 50px rgba(20,26,40,0.13)', border: '1px solid #e8ecf3' }}>
              <div className="flex flex-col sm:flex-row gap-2 rounded-2xl" style={{ background: '#f7f9fc', border: '1px solid #e8ecf3' }}>
                <div className="flex-1 flex items-center gap-3 px-4 py-3.5">
                  <Search size={22} style={{ color: '#e63329' }} />
                  <input className="flex-1 outline-none text-base font-medium placeholder-slate-400 bg-transparent" placeholder="Search tournaments, cities, hosts…" />
                </div>
                <div className="hidden sm:block w-px my-2.5" style={{ background: '#e3e8f0' }} />
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <MapPin size={22} className="text-slate-400" />
                  <input className="flex-1 outline-none text-base font-medium placeholder-slate-400 bg-transparent w-36" placeholder="Location" />
                </div>
                <div className="p-1.5">
                  <button className="w-full sm:w-auto h-full px-8 py-3 rounded-xl text-white font-bold text-base transition hover:brightness-110" style={{ background: '#e63329', boxShadow: '0 6px 18px rgba(230,51,41,0.35)' }}>Search</button>
                </div>
              </div>

              {/* Filter tabs row inside the same module */}
              <div className="flex items-center gap-2.5 mt-3 pt-3 px-1 overflow-x-auto scrollbar-hide" style={{ borderTop: '1px solid #eef1f6' }}>
                <button onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white whitespace-nowrap transition hover:brightness-110 flex-shrink-0" style={{ background: '#1a1714' }}>
                  <SlidersHorizontal size={16} /> All filters
                </button>
                <div className="w-px h-7 flex-shrink-0" style={{ background: '#e3e8f0' }} />
                {filterTabs.map(({ label, Icon }) => (
                  <button key={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition flex-shrink-0"
                    style={{ background: '#f7f9fc', border: '1px solid #e3e8f0', color: '#44403c' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1a1714'; e.currentTarget.style.background = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e3e8f0'; e.currentTarget.style.background = '#f7f9fc'; }}>
                    <Icon size={16} className="text-slate-400" /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results controls — count, hide map, sort */}
            <div className="flex items-center justify-between flex-wrap gap-3 mt-6">
              <p className="text-sm font-semibold text-slate-500"><span className="font-extrabold" style={{ color: '#1a1714' }}>248 tournaments</span> in your area</p>
              <div className="flex items-center gap-2.5">
                <button onClick={() => setShowMap(!showMap)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition"
                  style={{ background: showMap ? '#fff' : '#1a1714', color: showMap ? '#44403c' : '#fff', border: '1px solid ' + (showMap ? '#e3e8f0' : '#1a1714') }}>
                  <MapPin size={16} className={showMap ? 'text-slate-400' : 'text-white'} /> {showMap ? 'Hide map' : 'Show map'}
                </button>
                <div className="relative">
                  <button onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition"
                    style={{ background: '#fff', color: '#44403c', border: '1px solid #e3e8f0' }}>
                    <span className="text-slate-400">Sort:</span> {sortBy} <ChevronDown size={15} className="text-slate-400" />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl p-1.5 z-30" style={{ background: '#fff', boxShadow: '0 12px 40px rgba(20,26,40,0.18)', border: '1px solid #eef1f6' }}>
                      {sortOptions.map((opt) => (
                        <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition"
                          style={{ background: sortBy === opt ? '#fbeae8' : 'transparent', color: sortBy === opt ? '#e63329' : '#44403c' }}
                          onMouseEnter={(e) => { if (sortBy !== opt) e.currentTarget.style.background = '#f5f7fb'; }}
                          onMouseLeave={(e) => { if (sortBy !== opt) e.currentTarget.style.background = 'transparent'; }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showMap && <MapPanel />}
          </section>

{/* Events grid with pagination (24 per page) */}
<section className="py-8">
<div className={showMap ? "grid grid-cols-1 gap-5" : "grid md:grid-cols-2 gap-5"}>
  {events.slice((currentPage - 1) * 24, currentPage * 24).map((ev, idx) => {
    // Sponsored A+B pattern: every 5th event, show sponsored, then regular
    const showSponsored = (idx + 1) % 5 === 0 && ev.sponsored;
    const showRegular = !ev.sponsored;

    return showRegular ? (
      <div key={ev.id} className="group cursor-pointer flex gap-4 p-4 rounded-2xl transition hover:shadow-lg" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(20,26,40,0.05)' }}>
        <Photo id={ev.photo} tint={ev.tint} className="w-32 h-32 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="display font-extrabold text-lg leading-tight">{ev.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span>{ev.dates}</span><span>·</span><span>{ev.location}</span>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleFav(ev.id); }} className="p-1">
              <Heart size={18} className={favorites.has(ev.id) ? 'fill-red-600 text-red-600' : 'text-slate-300'} />
            </button>
          </div>
          <div className="flex gap-1.5 my-2.5 flex-wrap">
            {ev.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: '#f0f1f3', color: '#57534e' }}>{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#e63329' }}>Coach</span>
              <Stars rating={ev.coachRating} />
              <span className="text-sm font-bold">{ev.coachRating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-amber-500">Att.</span>
              <Stars rating={ev.attendeeRating} />
              <span className="text-sm font-bold">{ev.attendeeRating}</span>
            </div>
          </div>
        </div>
      </div>
    ) : showSponsored ? (
      <div key={`sponsored-${ev.id}`} className="group cursor-pointer relative rounded-3xl overflow-hidden h-[280px]" style={{ boxShadow: '0 8px 40px rgba(20,26,40,0.12)', border: '2px solid #f59e0b' }}>
        <Photo id={ev.photo} tint={ev.tint} className="w-full h-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,23,42,0.90) 0%, rgba(14,23,42,0.25) 55%, transparent 100%)' }} />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1" style={{ background: '#f59e0b' }}>★ Sponsored</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="display text-2xl font-extrabold leading-tight mb-2">{ev.title}</h3>
          <div className="flex items-center gap-2 text-sm font-medium mb-3 text-white/80">
            <span className="flex items-center gap-1"><Calendar size={14} /> {ev.dates}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {ev.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur" style={{ background: 'rgba(255,255,255,0.14)' }}>
              <span className="text-xs font-bold uppercase tracking-wide text-white/70">Coaches</span>
              <Stars rating={ev.coachRating} size={12} />
              <span className="font-extrabold text-sm">{ev.coachRating}</span>
              <span className="text-xs text-white/60">({ev.coachCount})</span>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  })}
</div>

{/* Pagination */}
<div className="flex items-center justify-center gap-2 mt-12">
  {Array.from({ length: Math.ceil(events.length / 24) }, (_, i) => i + 1).map((page) => (
    <button key={page}
      onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
      className="w-10 h-10 rounded-lg font-semibold text-sm transition"
      style={{
        background: currentPage === page ? '#0E172A' : '#fff',
        color: currentPage === page ? '#fff' : '#475569',
        border: `1px solid ${currentPage === page ? '#0E172A' : '#e8ecf3'}`
      }}>
      {page}
    </button>
  ))}
</div>
</section>
</div>

{/* Right: sticky map column */}
{showMap && (
<aside className="hidden lg:block">
<div className="sticky top-24">
  <MapPanel />
</div>
</aside>
)}
</div>
</div>

          {/* Trust strip */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-8 rounded-3xl" style={{ background: '#fff' }}>
              {[
                { Icon: Shield, v: '12,400+', l: 'Verified reviews' },
                { Icon: Star, v: '4.7★', l: 'Average rating' },
                { Icon: Users, v: '25K', l: 'Coaches evaluating' },
                { Icon: TrendingUp, v: '500+', l: 'Tournaments listed' },
              ].map((s, i) => {
                const I = s.Icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <I size={22} style={{ color: '#e63329' }} className="mb-3" />
                    <div className="display text-3xl font-extrabold">{s.v}</div>
                    <div className="text-sm text-slate-500 mt-1">{s.l}</div>
                  </div>
                );
              })}
            </div>
          </section>

{showFilters && (
  <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(20,26,40,0.4)' }} onClick={() => setShowFilters(false)}>
    <div className="w-full max-w-md h-full overflow-y-auto p-7" style={{ background: '#f3f5f9' }} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="display text-2xl font-extrabold">Filters</h2>
          <p className="text-sm text-slate-500 mt-1">Narrow down to the right tournament</p>
        </div>
        <button onClick={() => setShowFilters(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-200 transition"><X size={20} /></button>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Dates</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: 'FROM', placeholder: 'dd/mm/yyyy' },
              { label: 'TO', placeholder: 'dd/mm/yyyy' }
            ].map((d, i) => (
              <input key={i} type="text" placeholder={d.placeholder} 
                className="px-4 py-2.5 rounded-xl text-sm font-semibold outline-none" 
                style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['This weekend', 'Next 30 days', 'Summer 2026', 'Holiday'].map((d) => (
              <button key={d} className="px-4 py-2.5 rounded-xl font-semibold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Age group</h3>
          <div className="grid grid-cols-4 gap-2">
            {['U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'U19'].map((a) => (
              <button key={a} className="py-2.5 rounded-xl font-bold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{a}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Gender</h3>
          <div className="flex gap-2">
            {['Boys', 'Girls', 'Both'].map((g) => (
              <button key={g} className="flex-1 py-2.5 rounded-xl font-bold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{g}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Level of competition</h3>
          <p className="text-xs text-slate-400 mb-3">Highest = ECNL / MLS Next caliber</p>
          <div className="space-y-2">
            {[
              { label: 'Highest', desc: 'ECNL, MLS Next, national champions' },
              { label: 'Upper', desc: 'State cup contenders, top regional clubs' },
              { label: 'Middle', desc: 'Competitive club & travel teams' },
              { label: 'Lower', desc: 'Recreational, U-Little, first-timer friendly' }
            ].map((l) => (
              <label key={l.label} className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition" style={{ background: '#fff', border: '1px solid #e8ecf3' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                <input type="checkbox" className="mt-1 w-4 h-4" />
                <div>
                  <div className="font-bold text-sm" style={{ color: '#0E172A' }}>{l.label}</div>
                  <div className="text-xs text-slate-500">{l.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Format</h3>
          <div className="flex flex-wrap gap-2">
            {['3v3', '5v5', '7v7', '9v9', '11v11'].map((f) => (
              <button key={f} className="px-4 py-2.5 rounded-xl font-bold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{f}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Region</h3>
          <div className="grid grid-cols-3 gap-2">
            {['West', 'Mountain', 'Midwest', 'South', 'Southeast', 'Northeast'].map((r) => (
              <button key={r} className="py-2.5 rounded-xl font-semibold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{r}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Field surface</h3>
          <div className="flex gap-2">
            {['Grass', 'Turf'].map((s) => (
              <button key={s} className="flex-1 py-2.5 rounded-xl font-bold text-sm transition" style={{ background: '#fff', border: '1px solid #e8ecf3', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fbeae8'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Open registration only</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-slate-600">Hide closed tournaments</span>
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button onClick={() => {}} className="flex-1 py-4 rounded-xl text-slate-700 font-bold text-sm transition hover:bg-slate-200" style={{ background: '#fff' }}>Reset</button>
        <button onClick={() => setShowFilters(false)} className="flex-1 py-4 rounded-xl text-white font-bold text-sm transition hover:brightness-110" style={{ background: '#0E172A' }}>Show 12 tournaments</button>
      </div>
    </div>
  </div>
)}
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<TournamentGuru />);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TournamentGuru />);