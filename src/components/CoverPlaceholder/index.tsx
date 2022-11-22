import type { FC } from "react";

interface IProps {
  colors: string[];
}

export const CoverPlaceholder: FC<IProps> = ({ colors }) => {
  return (
    <svg id="visual" viewBox="0 0 600 600">
      <defs>
        <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="126" result="effect1_foregroundBlur" />
        </filter>
      </defs>

      <rect width="600" height="600" fill="#6600FF" />

      <g filter="url(#blur1)">
        <circle cx="245" cy="31" fill="#00CC99" r="280" />
        <circle cx="89" cy="10" fill="#6600FF" r="280" />
        <circle cx="398" cy="594" fill="#00CC99" r="280" />
        <circle cx="155" cy="335" fill="#00CC99" r="280" />
        <circle cx="523" cy="493" fill="#6600FF" r="280" />
        <circle cx="402" cy="239" fill="#00CC99" r="280" />
      </g>
    </svg>
  );
};
