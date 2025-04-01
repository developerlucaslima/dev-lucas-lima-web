interface AlienProps {
  characterRef: React.RefObject<SVGSVGElement | null>
  leftEyeRef: React.RefObject<SVGCircleElement | null>
  rightEyeRef: React.RefObject<SVGCircleElement | null>
  antennaRef: React.RefObject<SVGPathElement | null>
}

export const Alien = ({
  characterRef,
  leftEyeRef,
  rightEyeRef,
  antennaRef,
}: AlienProps) => {
  return (
    <>
      <svg
        ref={characterRef}
        width="250"
        height="300"
        viewBox="0 0 250 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-teal-500 drop-shadow-xl"
      >
        {/* Body */}
        <ellipse
          cx="125"
          cy="180"
          rx="70"
          ry="90"
          fill="oklch(0.704 0.14 182.503 / 0.3)"
        />

        {/* Head */}
        <circle cx="125" cy="100" r="60" fill="oklch(0.437 0.078 188.216)" />

        {/* Antenna */}
        <path
          ref={antennaRef}
          d="M125 40 L125 10 Q130 0 135 10 L135 20"
          stroke="#C7D2FE"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="135" cy="10" r="6" fill="#E0E7FF" />

        {/* Eyes */}
        <circle cx="105" cy="90" r="15" fill="white" />
        <circle cx="145" cy="90" r="15" fill="white" />
        <circle ref={leftEyeRef} cx="105" cy="90" r="7" fill="#1E293B" />
        <circle ref={rightEyeRef} cx="145" cy="90" r="7" fill="#1E293B" />

        {/* Mouth */}
        <path
          d="M105 120 Q125 140 145 120"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Arms */}
        <path
          d="M55 160 Q35 180 45 210"
          stroke="oklch(0.437 0.078 188.216 / 0.8)"
          strokeWidth="12"
          strokeLinecap="round"
          className="origin-[55px_160px] animate-[wave_2s_ease-in-out_infinite]"
        />
        <path
          d="M195 160 Q215 180 205 210"
          stroke="oklch(0.437 0.078 188.216 / 0.8)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Legs */}
        <path
          d="M95 260 L85 290"
          stroke="oklch(0.437 0.078 188.216 / 0.8)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M155 260 L165 290"
          stroke="oklch(0.437 0.078 188.216 / 0.8)"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }
      `}</style>
    </>
  )
}
