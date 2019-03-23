'use strict'

import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const DataflowDiagram = () => html`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" viewBox="-0.5 -0.5 421 186"
    style="max-width:100%;max-height:186px;">
    <defs />
    <g>
    <path d="M 330 125 C 306 125 300 145 319.2 149 C 300 157.8 321.6 177 337.2 169 C 348 185 384 185 396 169 C 420 169 420 153 405 145 C 420 129 396 113 375 121 C 360 109 336 109 330 125 Z"
        fill="#ffffff" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
    <g transform="translate(337.5,136.5)">
        <text x="23" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">Function</text>
    </g>
    <path d="M 180 16 C 180 -5.33 240 -5.33 240 16 L 240 64 C 240 85.33 180 85.33 180 64 Z" fill="#ffffff" stroke="#000000"
        stroke-miterlimit="10" pointer-events="none" />
    <path d="M 180 16 C 180 32 240 32 240 16" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
    <g transform="translate(186.5,43.5)">
        <text x="23" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">Firestore</text>
    </g>
    <path d="M 10 30 L 63 30 L 70 37 L 70 70 L 17 70 L 10 63 L 10 30 Z" fill="#ffffff" stroke="#000000"
        stroke-miterlimit="10" pointer-events="none" />
    <path d="M 10 30 L 63 30 L 70 37 L 17 37 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="none" />
    <path d="M 10 30 L 17 37 L 17 70 L 10 63 Z" fill-opacity="0.1" fill="#000000" stroke="none" pointer-events="none" />
    <path d="M 17 70 L 17 37 L 10 30 M 17 37 L 70 37" fill="none" stroke="#000000" stroke-miterlimit="10"
        pointer-events="none" />
    <g transform="translate(26.5,45.5)">
        <text x="17" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">Cache</text>
    </g>
    <path d="M 46 122 L 44 70" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
    <g transform="translate(52.5,86.5)">
        <text x="8" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">TC</text>
    </g>
    <path d="M 80 140 L 176 68" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
    <g transform="translate(106.5,84.5)">
        <text x="11" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">TDb</text>
    </g>
    <path d="M 243 70 L 320 110" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
    <g transform="translate(285.5,77.5)">
        <text x="9" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">TTr</text>
    </g>
    <path d="M 80 152 L 201.25 84.84 Q 210 80 218.74 84.86 L 300 130" fill="none" stroke="#000000" stroke-miterlimit="10"
        pointer-events="none" />
    <g transform="translate(161.5,115.5)">
        <text x="7" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">TU</text>
    </g>
    <rect x="0" y="120" width="80" height="50" fill="#ffffff" stroke="#000000" pointer-events="none" />
    <g transform="translate(24.5,136.5)">
        <text x="15" y="12" fill="#000000" text-anchor="middle" font-size="12px" font-family="Helvetica">Client</text>
    </g>
    </g>
  </svg>
`;

export const CallDataflowDiagram = () => html`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%"
    viewBox="-0.5 -0.5 422 217" style="max-width:100%;max-height:217px;">
    <defs />
    <g>
      <path
        d="M 330 155 C 306 155 300 175 319.2 179 C 300 187.8 321.6 207 337.2 199 C 348 215 384 215 396 199 C 420 199 420 183 405 175 C 420 159 396 143 375 151 C 360 139 336 139 330 155 Z"
        fill="#ffffff" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
      <g transform="translate(337.5,166.5)">
        <text x="23" y="12" fill="#000000" text-anchor="middle" font-size="12px"
            font-family="Helvetica">Function</text>
      </g>
      <path d="M 170 16 C 170 -5.33 230 -5.33 230 16 L 230 64 C 230 85.33 170 85.33 170 64 Z" fill="#ffffff"
        stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
      <path d="M 170 16 C 170 32 230 32 230 16" fill="none" stroke="#000000" stroke-miterlimit="10"
        pointer-events="none" />
      <g transform="translate(176.5,43.5)">
        <text x="23" y="12" fill="#000000" text-anchor="middle" font-size="12px"
            font-family="Helvetica">Firestore</text>
      </g>
      <path d="M 84.03 149.07 L 191.41 85.12 Q 200 80 208.09 85.88 L 301.91 154.12 Q 310 160 300 160.09 L 79.9 162.17"
        fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
      <g transform="translate(133.5,91.5)">
        <text x="7" y="12" fill="#000000" text-anchor="middle" font-size="12px"
            font-family="Helvetica">TDb</text>
      </g>
      <path d="M 80 182 L 300 182" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none" />
      <g transform="translate(196.5,191.5)">
        <text x="14" y="12" fill="#000000" text-anchor="middle" font-size="12px"
            font-family="Helvetica">TCall</text>
      </g>
      <rect x="0" y="150" width="80" height="50" fill="#ffffff" stroke="#000000" pointer-events="none" />
      <g transform="translate(24.5,166.5)">
        <text x="15" y="12" fill="#000000" text-anchor="middle" font-size="12px"
            font-family="Helvetica">Client</text>
      </g>
    </g>
  </svg>
`;