import type { ScreenId } from '../app/watchReducer';

// The feed is a direct neighbor of the watch face reached with a rightward
// finger swipe, as clarified by the user. Leftward finger swipes open these pages.
export const leftSequence: ScreenId[] = ['face', 'activity', 'multisport', 'heart-rate', 'sleep', 'spo2', 'stress'];

export const settingItems = [
  { id: 'ring', label: 'Ring & Vibrate', icon: 'bell', color: '#36d2ff' },
  { id: 'auto-sport', label: 'Auto Sport Recognition', icon: 'runner', color: '#ff9e54' },
  { id: 'dnd', label: 'DND', icon: 'dnd', color: '#36ceff' },
  { id: 'display', label: 'Display', icon: 'brightness', color: '#3dd8fc' },
  { id: 'hotkey', label: 'Hot Key', sub: 'Phone', icon: 'watch', color: '#40d8ff' },
  { id: 'language', label: 'Language', icon: 'language', color: '#47d9ff' },
  { id: 'battery', label: 'Battery', icon: 'battery', color: '#41dcf6' },
  { id: 'power', label: 'Power Off', icon: 'power', color: '#ff5459' },
  { id: 'restart', label: 'Restart', icon: 'gear', color: '#3bd5ff' },
  { id: 'reset', label: 'Reset', icon: 'gear', color: '#3bd5ff' },
] as const;

export type SettingId = (typeof settingItems)[number]['id'];
