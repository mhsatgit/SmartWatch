import { useRef, type PointerEvent, type WheelEvent } from 'react';
import type { Direction } from '../app/watchReducer';

export function useWatchGestures(onSwipe: (direction: Direction) => void) {
  const start = useRef<{ x: number; y: number; scroll: HTMLElement | null; scrollTop: number; pointerType: string } | null>(null);
  const suppressedUntil = useRef(0);

  function pointerDown(event: PointerEvent<HTMLElement>) {
    const scroll = (event.target as HTMLElement).closest<HTMLElement>('.scroll-content');
    start.current = { x: event.clientX, y: event.clientY, scroll, scrollTop: scroll?.scrollTop ?? 0, pointerType: event.pointerType };
  }

  function pointerMove(event: PointerEvent<HTMLElement>) {
    const s = start.current;
    if (!s || s.pointerType !== 'mouse' || !s.scroll) return;
    const dx = event.clientX - s.x;
    const dy = event.clientY - s.y;
    if (Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx) * 1.15) s.scroll.scrollTop = s.scrollTop - dy;
  }

  function pointerUp(event: PointerEvent<HTMLElement>) {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = event.clientX - s.x;
    const dy = event.clientY - s.y;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    if (ax < 28 && ay < 28) return;
    suppressedUntil.current = Date.now() + 300;
    if (ax > 30 && ax > ay * 1.15) onSwipe(dx > 0 ? 'right' : 'left');
    else if (ay > 30 && ay > ax * 1.15 && !s.scroll) onSwipe(dy > 0 ? 'down' : 'up');
  }

  function wheel(event: WheelEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target.closest('.scroll-content')) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 18) {
      onSwipe(event.deltaX > 0 ? 'left' : 'right');
    }
  }

  function clickCapture(event: React.MouseEvent<HTMLElement>) {
    if (Date.now() < suppressedUntil.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return { onPointerDown: pointerDown, onPointerMove: pointerMove, onPointerUp: pointerUp, onPointerCancel: () => { start.current = null; }, onWheel: wheel, onClickCapture: clickCapture };
}
