const { useState, useEffect } = React;

    const TournamentGuru = () => {
      const [favorites, setFavorites] = useState(new Set());
      const [showFilters, setShowFilters] = useState(false);
      const [showMap, setShowMap] = useState(true);
      const [sortBy, setSortBy] = useState('Recommended');
      const [sortOpen, setSortOpen] = useState(false);
      const sortOptions = ['Recommended', 'Highest rated', 'Most reviewed', 'Date: soonest', 'Nearest to me'];

      

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
          quote: 'Beachside fields, tight scheduling, the kids never wanted to leave.', reviewer: 'Tom B. · U10 Coach' },
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

          {/* Featured */}
          <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="display text-2xl font-extrabold tracking-tight">Featured this season</h2>
              <a className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer" style={{ color: '#e63329' }}>See all <ArrowUpRight size={15} /></a>
            </div>

            <div className="grid lg:grid-cols-5 gap-5">
              {/* Hero card */}
              <div className="lg:col-span-3 group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden h-[460px]" style={{ boxShadow: '0 8px 40px rgba(20,26,40,0.12)' }}>
                  <Photo id={events[0].photo} tint={events[0].tint} className="w-full h-full" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.25) 55%, transparent 100%)' }} />
                  <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1" style={{ background: '#e63329' }}>
                        <Star size={11} className="fill-white" /> Featured
                      </span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.9)' }}>{events[0].spots}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleFav(events[0].id); }}
                      className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur transition hover:scale-110" style={{ background: 'rgba(255,255,255,0.92)' }}>
                      <Heart size={18} className={favorites.has(events[0].id) ? 'fill-red-600 text-red-600' : 'text-slate-700'} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <div className="flex items-center gap-3 text-sm font-medium mb-2 text-white/80">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {events[0].dates}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {events[0].location}</span>
                    </div>
                    <h3 className="display text-4xl font-extrabold leading-tight mb-4">{events[0].title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur" style={{ background: 'rgba(255,255,255,0.14)' }}>
                        <span className="text-xs font-bold uppercase tracking-wide text-white/70">Coaches</span>
                        <Stars rating={events[0].coachRating} size={14} />
                        <span className="font-extrabold">{events[0].coachRating}</span>
                        <span className="text-xs text-white/60">({events[0].coachCount})</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur" style={{ background: 'rgba(255,255,255,0.14)' }}>
                        <span className="text-xs font-bold uppercase tracking-wide text-white/70">Attendees</span>
                        <Stars rating={events[0].attendeeRating} size={14} />
                        <span className="font-extrabold">{events[0].attendeeRating}</span>
                        <span className="text-xs text-white/60">({events[0].attendeeCount})</span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start pt-3 border-t border-white/15">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: '#e63329' }}>MD</div>
                      <div>
                        <p className="text-sm text-white/90 leading-snug italic">"{events[0].quote}"</p>
                        <p className="text-xs text-white/55 mt-1">{events[0].reviewer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {events.slice(1, 3).map((ev) => (
                  <div key={ev.id} className="group cursor-pointer flex-1">
                    <div className="relative rounded-3xl overflow-hidden h-full min-h-[218px]" style={{ boxShadow: '0 6px 28px rgba(20,26,40,0.10)' }}>
                      <Photo id={ev.photo} tint={ev.tint} className="w-full h-full" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.9) 0%, rgba(15,12,10,0.15) 60%, transparent 100%)' }} />
                      <button onClick={(e) => { e.stopPropagation(); toggleFav(ev.id); }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur transition hover:scale-110" style={{ background: 'rgba(255,255,255,0.92)' }}>
                        <Heart size={16} className={favorites.has(ev.id) ? 'fill-red-600 text-red-600' : 'text-slate-700'} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center gap-2 text-xs font-medium mb-1 text-white/75">
                          <span>{ev.dates}</span><span>·</span><span>{ev.location}</span>
                        </div>
                        <h3 className="display text-xl font-extrabold leading-tight mb-2">{ev.title}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1"><Stars rating={ev.coachRating} /> <b>{ev.coachRating}</b></span>
                          <span className="text-white/50 text-xs">{ev.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sponsored */}
          <section className="max-w-7xl mx-auto px-6 py-6">
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(110deg,#1a1714,#2d2620)' }}>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
                <Photo id="1551958219-acbc608c6377" tint="#000" className="w-full h-full" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,#1a1714,transparent)' }} />
              </div>
              <div className="relative p-8 flex items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">Sponsored</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: '#e63329', color: '#fff' }}>Nike Soccer</span>
                  </div>
                  <h3 className="display text-2xl font-extrabold text-white mb-1">Win a Phantom GX team kit</h3>
                  <p className="text-white/60 text-sm">Register your U10–U14 squad for any Nike-sponsored tournament by July 1.</p>
                </div>
                <button className="flex-shrink-0 px-6 py-3 rounded-xl bg-white font-bold text-sm hover:scale-105 transition">See eligible events</button>
              </div>
            </div>
          </section>

          {/* Recommended */}
          <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="display text-2xl font-extrabold tracking-tight">Recommended for you</h2>
              <span className="text-sm text-slate-400">Based on your past registrations</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {events.slice(2).map((ev) => (
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
                        <span key={t} className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: '#f0ede6', color: '#57534e' }}>{t}</span>
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
              ))}
            </div>
          </section>

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

          {/* Filters drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(20,26,40,0.4)' }} onClick={() => setShowFilters(false)}>
              <div className="w-full max-w-md h-full overflow-y-auto p-7" style={{ background: '#f3f5f9' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="display text-2xl font-extrabold">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-200 transition"><X size={20} /></button>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Dates</h3>
                    <div className="flex flex-wrap gap-2">
                      {['This weekend', 'Next 30 days', 'Summer 2026', 'Holiday'].map((d) => (
                        <button key={d} className="px-4 py-2.5 rounded-xl font-semibold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Age group</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {['U6', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'U19'].map((a) => (
                        <button key={a} className="py-2.5 rounded-xl font-bold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{a}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Gender</h3>
                    <div className="flex gap-2">
                      {['Boys', 'Girls', 'Both'].map((g) => (
                        <button key={g} className="flex-1 py-2.5 rounded-xl font-bold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Level of competition</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Highest', 'Upper', 'Middle', 'Lower'].map((l) => (
                        <button key={l} className="px-4 py-2.5 rounded-xl font-semibold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Format</h3>
                    <div className="flex flex-wrap gap-2">
                      {['3v3', '5v5', '7v7', '9v9', '11v11'].map((f) => (
                        <button key={f} className="px-4 py-2.5 rounded-xl font-bold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Region</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['West', 'Mountain', 'Midwest', 'South', 'Southeast', 'Northeast'].map((r) => (
                        <button key={r} className="py-2.5 rounded-xl font-semibold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Field surface</h3>
                    <div className="flex gap-2">
                      {['Grass', 'Turf'].map((s) => (
                        <button key={s} className="flex-1 py-2.5 rounded-xl font-bold text-sm transition hover:border-slate-900" style={{ background: '#fff', border: '1px solid #e3e8f0' }}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-4 rounded-xl text-white font-bold transition hover:brightness-110" style={{ background: '#e63329' }}>Show 12 tournaments</button>
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