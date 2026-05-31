/* ---------- Styled map layer (toggled by Hide map) ---------- */
    const MapPanel = () => {
      const pins = [
        { top: '22%', left: '20%', r: '4.9', active: true },
        { top: '40%', left: '54%', r: '4.7' },
        { top: '64%', left: '33%', r: '4.8' },
        { top: '30%', left: '78%', r: '4.6' },
        { top: '72%', left: '68%', r: '4.9' },
      ];
      return (
        <div className="relative rounded-3xl overflow-hidden mt-6" style={{ height: 340, border: '1px solid #e3e8f0', boxShadow: '0 14px 40px rgba(20,26,40,0.10)' }}>
          <div className="absolute inset-0" style={{ background: '#eef2f6' }} />
          {/* parks */}
          <div className="absolute rounded-3xl" style={{ top: '10%', left: '6%', width: 150, height: 110, background: '#d9efdd', transform: 'rotate(-6deg)' }} />
          <div className="absolute rounded-3xl" style={{ bottom: '8%', right: '12%', width: 180, height: 130, background: '#d9efdd' }} />
          {/* water */}
          <div className="absolute" style={{ top: '-8%', right: '-4%', width: 230, height: 190, background: '#dbe9f5', borderRadius: '45%' }} />
          {/* roads */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="none">
            <g stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round">
              <path d="M-20,110 L820,150" /><path d="M150,-20 L300,360" /><path d="M-20,250 L820,210" /><path d="M560,-20 L640,360" />
            </g>
            <g stroke="#e2e8f0" strokeWidth="2.5" fill="none">
              <path d="M-20,60 L820,80" /><path d="M380,-20 L420,360" /><path d="M-20,300 L820,290" />
            </g>
          </svg>
          {/* rating pins — airbnb style */}
          {pins.map((p, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold cursor-pointer transition hover:scale-105"
              style={{ top: p.top, left: p.left, background: p.active ? '#e63329' : '#fff', color: p.active ? '#fff' : '#1a1714', boxShadow: '0 4px 12px rgba(20,26,40,0.20)', zIndex: p.active ? 10 : 5 }}>
              <Star size={11} className={p.active ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} /> {p.r}
            </div>
          ))}
          {/* zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col rounded-xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 14px rgba(20,26,40,0.16)' }}>
            <button className="w-9 h-9 flex items-center justify-center text-lg font-bold text-slate-600 hover:bg-slate-50 transition">+</button>
            <div className="h-px" style={{ background: '#eef1f6' }} />
            <button className="w-9 h-9 flex items-center justify-center text-lg font-bold text-slate-600 hover:bg-slate-50 transition">−</button>
          </div>
          {/* caption */}
          <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.94)', color: '#44403c', boxShadow: '0 4px 14px rgba(20,26,40,0.14)' }}>
            <MapPin size={13} className="inline -mt-0.5 mr-1" style={{ color: '#e63329' }} />248 tournaments mapped
          </div>
        </div>
      );
    };

window.MapPanel = MapPanel;