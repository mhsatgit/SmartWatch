export type AppId =
  | 'activity' | 'health' | 'sleep' | 'multisport' | 'watchfaces' | 'voice'
  | 'music' | 'phone' | 'wellness' | 'findphone' | 'appgrid' | 'camera'
  | 'todo' | 'weather' | 'reminders' | 'calculator' | 'calendar' | 'flashlight'
  | 'games' | 'settings' | 'about';

export type AppInfo = { id: AppId; title: string; icon: string; color: string; observedLabel: boolean };

// Exact order and icon shapes are observed at 0.00–7.92 in appdrawer(presssidebutton).mp4.
// Most names are inferred because the recording has no labels.
export const apps: AppInfo[] = [
  { id: 'activity', title: 'Activity', icon: 'activity', color: '#ff7252', observedLabel: false },
  { id: 'health', title: 'Heart Rate', icon: 'health', color: '#ff578d', observedLabel: false },
  { id: 'sleep', title: 'Sleep', icon: 'sleep', color: '#eeb0ff', observedLabel: false },
  { id: 'multisport', title: 'Multisport', icon: 'runner', color: '#ff7356', observedLabel: false },
  { id: 'watchfaces', title: 'Watch Faces', icon: 'watch', color: '#30b7ff', observedLabel: false },
  { id: 'voice', title: 'AI Voice', icon: 'wave', color: '#21e6a3', observedLabel: true },
  { id: 'music', title: 'Music', icon: 'music', color: '#fa4a9e', observedLabel: true },
  { id: 'phone', title: 'Phone', icon: 'phone', color: '#26eac0', observedLabel: false },
  { id: 'wellness', title: 'Wellness', icon: 'wellness', color: '#26e1c1', observedLabel: false },
  { id: 'findphone', title: 'Find Phone', icon: 'findphone', color: '#39b9ff', observedLabel: false },
  { id: 'appgrid', title: 'Apps', icon: 'fourdots', color: '#38d7f5', observedLabel: false },
  { id: 'camera', title: 'Camera', icon: 'camera', color: '#42bbff', observedLabel: false },
  { id: 'todo', title: 'To-Do', icon: 'clipboard', color: '#43bfff', observedLabel: true },
  { id: 'weather', title: 'Weather', icon: 'weather', color: '#f3f5ff', observedLabel: true },
  { id: 'reminders', title: 'Reminders', icon: 'check', color: '#35bdff', observedLabel: false },
  { id: 'calculator', title: 'Calculator', icon: 'calculator', color: '#3cbaff', observedLabel: false },
  { id: 'calendar', title: 'Calendar', icon: 'calendar', color: '#36c7ff', observedLabel: false },
  { id: 'flashlight', title: 'Flashlight', icon: 'flashlight', color: '#ffd95b', observedLabel: false },
  { id: 'games', title: 'Games', icon: 'game', color: '#ff755d', observedLabel: true },
  { id: 'settings', title: 'Settings', icon: 'gear', color: '#43c8ff', observedLabel: true },
  { id: 'about', title: 'About', icon: 'info', color: '#39c9ff', observedLabel: false },
];
