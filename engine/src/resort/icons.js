// Row icons that resorts and countries need on info pages ("icon" in a block), added to the house guide's own set.
const GI = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const MORE_GUIDE_ICONS = {
  money: GI('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v5M18 9.5v5"/>'),
  plug: GI('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>'),
  bus: GI('<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 18v3M16 18v3"/><circle cx="8" cy="14.5" r=".8" fill="currentColor"/><circle cx="16" cy="14.5" r=".8" fill="currentColor"/>'),
  plane: GI('<path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4.5-5a2 2 0 0 1 3 3l-5 4.5.5 8L14 22l-2.5-7.5z"/><path d="M6 17l-3 1 1-3"/>'),
  boat: GI('<path d="M3 15h18l-2.5 4.5h-13z"/><path d="M12 3v12M12 4l6 9h-6"/><path d="M2 21.5c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/>'),
  weather: GI('<circle cx="9" cy="8" r="3"/><path d="M9 2v1.5M3 8h1.5M4.8 3.8l1 1M13.2 3.8l-1 1"/><path d="M7 20h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6 1.5A3.3 3.3 0 0 0 7 20z"/>'),
  shield: GI('<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
  bell: GI('<path d="M4 17a8 8 0 0 1 16 0z"/><path d="M2 20h20M12 9V6.5M10.5 6.5h3"/>'),
  family: GI('<circle cx="8" cy="6" r="2.5"/><circle cx="16.5" cy="9" r="2"/><path d="M4 21v-6a4 4 0 0 1 8 0v6M13.5 21v-4a3 3 0 0 1 6 0v4"/>')
};
