export default function FloorPlanSVG() {
  return (
    <svg
      viewBox="0 0 700 500"
      className="w-full h-full"
      style={{ background: '#111111' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Living Room */}
      <rect x="30" y="30" width="240" height="200" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="105" y="118" fill="#C9A84C" fontSize="14" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Living Room</text>
      <text x="105" y="136" fill="#8A8A8A" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">28.5 m²</text>

      {/* Kitchen */}
      <rect x="270" y="30" width="180" height="120" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="360" y="84" fill="#C9A84C" fontSize="14" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Kitchen</text>
      <text x="360" y="102" fill="#8A8A8A" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">12.0 m²</text>

      {/* Hallway */}
      <rect x="270" y="150" width="180" height="80" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="360" y="186" fill="#C9A84C" fontSize="14" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Hallway</text>
      <text x="360" y="204" fill="#8A8A8A" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">8.3 m²</text>

      {/* Bedroom 1 */}
      <rect x="30" y="230" width="200" height="180" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="130" y="318" fill="#C9A84C" fontSize="14" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Bedroom 1</text>
      <text x="130" y="336" fill="#8A8A8A" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">18.2 m²</text>

      {/* Bedroom 2 */}
      <rect x="230" y="230" width="160" height="145" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="310" y="300" fill="#C9A84C" fontSize="14" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Bedroom 2</text>
      <text x="310" y="318" fill="#8A8A8A" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">14.8 m²</text>

      {/* Bathroom */}
      <rect x="390" y="230" width="60" height="145" fill="rgba(201,168,76,0.03)" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="420" y="298" fill="#C9A84C" fontSize="11" fontWeight="bold" fontFamily="Inter,sans-serif" textAnchor="middle">Bath</text>
      <text x="420" y="314" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">5.5 m²</text>

      {/* Door swings */}
      <path d="M 150 230 Q 172 208 194 230" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
      <line x1="150" y1="230" x2="150" y2="208" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>

      <path d="M 270 100 Q 248 100 248 122" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
      <line x1="270" y1="100" x2="248" y2="100" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>

      {/* Window markers */}
      <line x1="80" y1="30" x2="80" y2="26" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
      <line x1="110" y1="30" x2="110" y2="26" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
      <line x1="140" y1="30" x2="140" y2="26" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
      <line x1="80" y1="24" x2="140" y2="24" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6"/>

      <line x1="310" y1="30" x2="310" y2="26" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
      <line x1="350" y1="30" x2="350" y2="26" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
      <line x1="310" y1="24" x2="350" y2="24" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6"/>

      {/* Dimension lines */}
      <line x1="30" y1="420" x2="450" y2="420" stroke="#8A8A8A" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4"/>
      <text x="240" y="434" fill="#8A8A8A" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle" opacity="0.6">Total width: ~12.5 m</text>
    </svg>
  )
}
