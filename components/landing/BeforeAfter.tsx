export default function BeforeAfter() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Before <span className="text-[#8A8A8A]">&</span> <span className="text-[#C9A84C]">After</span>
          </h2>
          <p className="text-[#8A8A8A] max-w-xl mx-auto">
            See the dramatic transformation from a basic floor plan to a premium visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-[#111111] border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[rgba(201,168,76,0.1)] flex items-center gap-2">
              <span className="text-[#8A8A8A] text-xs font-medium uppercase tracking-wider">Before — Original scan</span>
            </div>
            <div className="p-6 flex items-center justify-center min-h-[280px] bg-[#0d0d0d]">
              <svg viewBox="0 0 300 220" className="w-full max-w-sm opacity-60">
                <rect x="10" y="10" width="110" height="90" fill="none" stroke="#555" strokeWidth="2"/>
                <rect x="120" y="10" width="80" height="55" fill="none" stroke="#555" strokeWidth="2"/>
                <rect x="10" y="100" width="90" height="80" fill="none" stroke="#555" strokeWidth="2"/>
                <rect x="100" y="100" width="100" height="80" fill="none" stroke="#555" strokeWidth="2"/>
                <rect x="120" y="65" width="80" height="35" fill="none" stroke="#555" strokeWidth="2"/>
                <text x="35" y="55" fill="#555" fontSize="9" fontFamily="monospace">LIVING RM</text>
                <text x="130" y="37" fill="#555" fontSize="9" fontFamily="monospace">KITCHEN</text>
                <text x="20" y="140" fill="#555" fontSize="9" fontFamily="monospace">BED 1</text>
                <text x="110" y="140" fill="#555" fontSize="9" fontFamily="monospace">BED 2</text>
                <text x="130" y="83" fill="#555" fontSize="8" fontFamily="monospace">HALL</text>
              </svg>
            </div>
          </div>

          {/* After */}
          <div className="bg-[#111111] border border-[rgba(201,168,76,0.4)] rounded-xl overflow-hidden shadow-lg shadow-[#C9A84C]/10">
            <div className="px-4 py-3 border-b border-[rgba(201,168,76,0.2)] flex items-center gap-2">
              <span className="text-[#C9A84C] text-xs font-medium uppercase tracking-wider">After — Premium visualization</span>
              <span className="ml-auto bg-[rgba(201,168,76,0.15)] text-[#C9A84C] text-[10px] font-semibold px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="p-6 flex items-center justify-center min-h-[280px] bg-[#0d0d0d]">
              <svg viewBox="0 0 300 220" className="w-full max-w-sm">
                <rect x="10" y="10" width="110" height="90" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="120" y="10" width="80" height="55" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="10" y="100" width="90" height="80" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="100" y="100" width="100" height="80" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="120" y="65" width="80" height="35" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="28" y="50" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Living Room</text>
                <text x="40" y="64" fill="#8A8A8A" fontSize="8" fontFamily="Inter,sans-serif">28.5 m²</text>
                <text x="130" y="35" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Kitchen</text>
                <text x="138" y="48" fill="#8A8A8A" fontSize="8" fontFamily="Inter,sans-serif">12.0 m²</text>
                <text x="18" y="138" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Bedroom 1</text>
                <text x="25" y="152" fill="#8A8A8A" fontSize="8" fontFamily="Inter,sans-serif">18.2 m²</text>
                <text x="108" y="138" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Bedroom 2</text>
                <text x="120" y="152" fill="#8A8A8A" fontSize="8" fontFamily="Inter,sans-serif">14.8 m²</text>
                <text x="130" y="80" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Hallway</text>
                <text x="136" y="92" fill="#8A8A8A" fontSize="8" fontFamily="Inter,sans-serif">8.3 m²</text>
                <path d="M 65 100 Q 75 88 85 100" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2,2"/>
                <path d="M 120 45 Q 108 45 108 57" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2,2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
