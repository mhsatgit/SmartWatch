import type { CSSProperties, ReactNode } from 'react';

type Props = { name: string; size?: number | string; color?: string; className?: string; style?: CSSProperties };

export default function WatchIcon({ name, size = '1.6em', color, className, style }: Props) {
  let drawing: ReactNode;
  switch (name) {
    case 'activity': drawing = <><circle cx="12" cy="3.5" r="1.8" fill="currentColor"/><path d="M3 8h18M12 5.8v8.1M12 13.9l-5.1 6.9M12 13.9l5.1 6.9"/></>; break;
    case 'runner': drawing = <><circle cx="15" cy="3.5" r="1.6" fill="currentColor"/><path d="m12 7 3.2 2.4 3.2-.2M12 7 9.5 11 6 12m6-5-2 6 4 2.2 3.5 5M10 13l-3 6-3 1"/></>; break;
    case 'walk': drawing = <><circle cx="14" cy="3.5" r="1.6" fill="currentColor"/><path d="m11 7 3 2 2.8-1.2M11 7l-1 6 3.5 1.5 2 6M10 13l-4 6M3 21h18"/></>; break;
    case 'treadmill': drawing = <><circle cx="10" cy="5" r="1.5" fill="currentColor"/><path d="m8 9 3 2 3-1m-3 1-2 5-3 3m3-3 4 4M16 6h3v13M3 20h18"/></>; break;
    case 'shoe': drawing = <path d="M2 17c3-1 5-3 7-7l3 2 7 3c2 .7 3 2 3 4H2z" fill="currentColor" stroke="none"/>; break;
    case 'flame': drawing = <path d="M12 2c1 4-3 5-3 9-2-1-2-3-2-4-2 3-4 5-4 9a9 9 0 0 0 18 0c0-5-3-8-6-11 .2 3-1 5-2 6 0-3 0-5-1-9Z" fill="currentColor" stroke="none"/>; break;
    case 'heart': drawing = <path d="M12 21s-9-5.9-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.1-9 12-9 12Z" fill="currentColor" stroke="none"/>; break;
    case 'health': drawing = <><path d="M12 21S3 15.2 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.2-9 12-9 12Z" fill="currentColor" stroke="none"/><circle cx="16.5" cy="8" r="5" fill="white" stroke="none"/><path d="M16.5 5.5v5M14 8h5" stroke="#e94775" strokeWidth="1.6"/></>; break;
    case 'sleep': drawing = <><path d="M19.8 17.7A9 9 0 0 1 8.3 4.2 9 9 0 1 0 19.8 17.7Z" fill="currentColor" stroke="none"/><path d="m18.5 2 .7 1.8L21 4.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="currentColor" stroke="none"/></>; break;
    case 'more': drawing = <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><circle cx="7.5" cy="12" r="1" fill="#777" stroke="none"/><circle cx="12" cy="12" r="1" fill="#777" stroke="none"/><circle cx="16.5" cy="12" r="1" fill="#777" stroke="none"/></>; break;
    case 'drop': drawing = <path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z" fill="currentColor" stroke="none"/>; break;
    case 'stress': drawing = <><path d="M8 5c-3 2-4 5-4 8s2 6 5 7h6c3-1 5-4 5-7s-1-6-4-8z" fill="currentColor" stroke="none"/><path d="M7 11c2-2 3 2 5 0s3 2 5 0M7 15c2-2 3 2 5 0s3 2 5 0" stroke="#4b284e" strokeWidth="1.3"/></>; break;
    case 'bell': drawing = <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 20h4" fill="currentColor" stroke="none"/><path d="M2 8c0-2 1-4 2-5m16 0c1 1 2 3 2 5"/></>; break;
    case 'dnd': drawing = <><circle cx="12" cy="12" r="9"/><path d="M7 12h10"/></>; break;
    case 'brightness': drawing = <><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/><path d="M12 2v2M12 20v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></>; break;
    case 'watch': drawing = <><path d="M9 2h6l1 4H8l1-4Zm-1 16h8l-1 4H9l-1-4Z" fill="currentColor" stroke="none"/><rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" stroke="none"/><path d="m8 15 3-2 2 1 3-2" stroke="#087eaf" strokeWidth="1.1"/></>; break;
    case 'airplane': drawing = <path d="m2 13 9-2.5L10 2l3 1 3 7 5-1c1-.2 2 .5 2 1.5 0 .8-.5 1.4-1.3 1.6L16 14l-3 7-3 1 1-8-9 1-2 2v-5Z" fill="currentColor" stroke="none"/>; break;
    case 'gear': drawing = <><path d="m10 2 1-.8h2l1 .8.5 2 2 .8 1.8-1 1.5 1.5-1 1.8.8 2 2 .5.8 1v2l-.8 1-2 .5-.8 2 1 1.8-1.5 1.5-1.8-1-2 .8-.5 2-.9.8h-2.2l-1-.8-.5-2-2-.8-1.8 1-1.5-1.5 1-1.8-.8-2-2-.5-.8-1v-2l.8-1 2-.5.8-2-1-1.8 1.5-1.5 1.8 1 2-.8z" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="3" fill="#0e688e" stroke="none"/></>; break;
    case 'flashlight': drawing = <><path d="M7 8h10l-1 5-2 2v6h-4v-6l-2-2z" fill="currentColor" stroke="none"/><path d="M12 2v3M5 4l2 2M19 4l-2 2"/></>; break;
    case 'sync': drawing = <><path d="M20 8a8 8 0 0 0-14-3L3 8m0 0V4m0 4h4M4 16a8 8 0 0 0 14 3l3-3m0 0v4m0-4h-4"/></>; break;
    case 'phone': drawing = <path d="M7 2c-2 0-4 2-3.5 5 1 6 7.5 12.5 13.5 13.5 3 .5 5-1.5 5-3.5l-5-3-2.5 2c-2.2-1-4.5-3.3-5.5-5.5l2-2.5Z" fill="currentColor" stroke="none"/>; break;
    case 'findphone': drawing = <><rect x="3" y="2" width="12" height="19" rx="2" fill="currentColor" stroke="none"/><circle cx="16" cy="15" r="5" fill="#12384c"/><path d="m20 19 3 3"/></>; break;
    case 'music': drawing = <><path d="M9 6v12a3 3 0 1 1-2-2.8V4l11-2v12a3 3 0 1 1-2-2.8V5Z" fill="currentColor" stroke="none"/></>; break;
    case 'wave': drawing = <><circle cx="12" cy="12" r="10"/><path d="M3 12h4l2-5 2 10 2-7 2 3 2-2h4"/></>; break;
    case 'wellness': drawing = <path d="M10 2h4v7h7v4h-7v9h-4v-9H3V9h7z" fill="currentColor" stroke="none"/>; break;
    case 'fourdots': drawing = <><circle cx="7" cy="7" r="3" fill="#31d9e7" stroke="none"/><circle cx="17" cy="7" r="3" fill="#ef519f" stroke="none"/><circle cx="7" cy="17" r="3" fill="#35eac2" stroke="none"/><circle cx="17" cy="17" r="3" fill="#3ebeff" stroke="none"/></>; break;
    case 'camera': drawing = <><path d="M3 7h4l2-2h6l2 2h4v13H3z" fill="currentColor" stroke="none"/><circle cx="12" cy="13" r="3.5" fill="#126b9b" stroke="none"/></>; break;
    case 'clipboard': drawing = <><rect x="4" y="4" width="16" height="18" rx="2" fill="currentColor" stroke="none"/><rect x="9" y="2" width="6" height="4" rx="1" fill="#165d8a" stroke="none"/><path d="m7 11 1 1 2-2m2 1h5m-10 5 1 1 2-2m2 1h5" stroke="white" strokeWidth="1.3"/></>; break;
    case 'weather': drawing = <><path d="M7 18h12a4 4 0 0 0 0-8 6 6 0 0 0-11-1 5 5 0 0 0-1 9Z" fill="currentColor" stroke="none"/><circle cx="16" cy="6" r="3" fill="#f8d4a8" stroke="none"/></>; break;
    case 'check': drawing = <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m6 12 4 4 8-8" stroke="#0f6696" strokeWidth="2"/></>; break;
    case 'calculator': drawing = <><rect x="3" y="3" width="17" height="18" rx="2" fill="currentColor" stroke="none"/><path d="M6 8h5m-2.5-2.5v5M14 8h4M7 15h4m-4 3h4M14 15h4m-4 3h4" stroke="white" strokeWidth="1.2"/></>; break;
    case 'calendar': drawing = <><rect x="3" y="4" width="18" height="17" rx="2" fill="currentColor" stroke="none"/><path d="M3 9h18M8 2v4m8-4v4" stroke="#0b6e9f" strokeWidth="1.6"/><circle cx="8" cy="13" r="1" fill="white" stroke="none"/><circle cx="13" cy="13" r="1" fill="white" stroke="none"/><circle cx="17" cy="13" r="1" fill="white" stroke="none"/></>; break;
    case 'game': drawing = <><path d="M6 8h12c2 0 3 2 4 7l.5 3c.4 3-2 4-4 2l-3-3H9l-3 3c-2 2-4.5 1-4-2l.5-3C3 10 4 8 6 8Z" fill="currentColor" stroke="none"/><path d="M7 11v5m-2.5-2.5h5M16 12h.1M19 14h.1" stroke="white" strokeWidth="1.5"/></>; break;
    case 'info': drawing = <><path d="M3 4h18v14H8l-4 3v-3H3Z" fill="currentColor" stroke="none"/><path d="M12 9v6m0-8v.2" stroke="white" strokeWidth="1.8"/></>; break;
    case 'battery': drawing = <><rect x="2" y="6" width="18" height="12" rx="2"/><path d="M22 10v4M5 9h9v6H5z" fill="currentColor" stroke="none"/></>; break;
    case 'language': drawing = <><path d="M3 4h18v14H8l-4 3v-3H3Z" fill="currentColor" stroke="none"/></>; break;
    case 'power': drawing = <><path d="M12 2v9M6 5a9 9 0 1 0 12 0"/></>; break;
    case 'alarm': drawing = <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M4 3 2 6m18-3 2 3M7 21l-2 2m12-2 2 2"/></>; break;
    case 'stopwatch': drawing = <><circle cx="12" cy="13" r="8"/><path d="M12 9v5l3 2M9 2h6M12 2v3"/></>; break;
    case 'dice': drawing = <><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.2" fill="#326b92" stroke="none"/><circle cx="16" cy="16" r="1.2" fill="#326b92" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="#326b92" stroke="none"/></>; break;
    case 'gameboard': drawing = <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><circle cx="8" cy="7" r="1.8" fill="#f7d955" stroke="none"/><circle cx="16" cy="7" r="1.8" fill="#f7d955" stroke="none"/><circle cx="8" cy="16" r="1.8" fill="#fa7975" stroke="none"/><circle cx="16" cy="16" r="1.8" fill="#fa7975" stroke="none"/></>; break;
    case 'game-star': drawing = <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m12 4 2.3 5 5.5.6-4.1 3.8 1.1 5.3-4.8-2.7-4.8 2.7 1.1-5.3-4.1-3.8 5.5-.6Z" fill="#ff7774" stroke="none"/></>; break;
    case 'timer': drawing = <><circle cx="12" cy="13" r="8" fill="currentColor" stroke="none"/><path d="M12 3V1M7 3h10" stroke="currentColor"/><path d="M12 7v6" stroke="#14588c" strokeWidth="1.5"/></>; break;
    case 'puzzle': drawing = <path d="M9 3h3c0 3 4 3 4 0h5v6c-3 0-3 4 0 4v8h-7c0-3-4-3-4 0H3v-7c3 0 3-4 0-4V3h3c0 3 3 3 3 0Z" fill="currentColor" stroke="none"/>; break;
    default: drawing = <circle cx="12" cy="12" r="9"/>;
  }

  return <svg className={className} aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} style={{ color, flexShrink: 0, ...style }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{drawing}</svg>;
}
