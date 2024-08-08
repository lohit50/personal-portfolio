// components/Loader.js
'use client';
import React from "react";

const Loader = () => {
  return (
    <div className="loader flex flex-col text-3xl">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="displacementFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="circleMask">
            <circle
              cx="200"
              cy="200"
              r="0"
              fill="white"
              className="displacement"
            >
              <animate
                attributeName="r"
                from="0"
                to="250"
                dur="4s"
                fill="freeze"
                begin="1s"
              />
            </circle>
          </mask>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="cinzel"
          fontSize="60"
          fill="white"
          mask="url(#circleMask)"
          filter="url(#glowFilter)"
        >
          Lohit
        </text>
      </svg>
      <p className="font-cinzel">Loading...</p>
    </div>
  );
};

export default Loader;
