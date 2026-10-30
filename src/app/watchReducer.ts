import type { AppId } from '../data/apps';
import type { SettingId } from '../data/navigation';
import { defaultSettings, restoreSettings, type SettingsValues } from './watchState';

export type ScreenId =
  | 'aod' | 'face' | 'activity' | 'multisport' | 'heart-rate' | 'sleep' | 'spo2' | 'stress'
  | 'feed' | 'quick-1' | 'quick-2' | 'notifications' | 'drawer' | 'settings'
  | 'setting-detail' | 'workout-setup' | 'more-sports' | 'goal-picker' | 'workout-session'
  | 'app' | 'sensor-info' | 'power-confirm';

export type Sport = 'Indoor Walk' | 'Outdoor Run' | 'Outdoor Walk' | 'Cycling' | 'Treadmill' | 'Yoga' | 'Free Training';
export type Goal = 'No Goal' | 'Time' | 'Distance' | 'Calories';
export type Direction = 'left' | 'right' | 'up' | 'down';

export type WatchState = {
  screen: ScreenId;
  history: ScreenId[];
  appId: AppId | null;
  settingId: SettingId | null;
  sensorId: 'spo2' | 'stress' | null;
  sport: Sport;
  goal: Goal;
  goalValue: number;
  workout: { active: boolean; paused: boolean; startedAt: number | null; elapsedBeforePause: number };
  timer: { active: boolean; paused: boolean; startedAt: number | null; elapsedBeforePause: number };
  settings: SettingsValues;
  feedOrigin: 'face' | 'aod';
  demoNotification: boolean;
  gameScore: number;
};

export type Action =
  | { type: 'MENU' } | { type: 'SPORTS' } | { type: 'BACK' }
  | { type: 'SWIPE'; direction: Direction }
  | { type: 'OPEN'; screen: ScreenId }
  | { type: 'OPEN_APP'; appId: AppId }
  | { type: 'OPEN_SETTING'; settingId: SettingId }
  | { type: 'OPEN_SPORT'; sport: Sport }
  | { type: 'SELECT_GOAL'; goal: Goal; value?: number }
  | { type: 'SET_SETTING'; key: keyof SettingsValues; value: SettingsValues[keyof SettingsValues] }
  | { type: 'START_WORKOUT' } | { type: 'PAUSE_WORKOUT' } | { type: 'FINISH_WORKOUT' }
  | { type: 'TIMER_START' } | { type: 'TIMER_PAUSE' } | { type: 'TIMER_RESET' }
  | { type: 'NOTIFICATION_DEMO' } | { type: 'GAME_POINT' }
  | { type: 'POWER_ACTION'; action: 'power' | 'restart' | 'reset' };

export function createInitialState(): WatchState {
  return {
    screen: 'aod', history: [], appId: null, settingId: null, sensorId: null,
    sport: 'Indoor Walk', goal: 'No Goal', goalValue: 30,
    workout: { active: false, paused: false, startedAt: null, elapsedBeforePause: 0 },
    timer: { active: false, paused: false, startedAt: null, elapsedBeforePause: 0 },
    settings: restoreSettings(), feedOrigin: 'face', demoNotification: false, gameScore: 0,
  };
}

function open(state: WatchState, screen: ScreenId): WatchState {
  return { ...state, screen, history: [...state.history, state.screen] };
}

function back(state: WatchState): WatchState {
  if (state.history.length) {
    return { ...state, screen: state.history[state.history.length - 1], history: state.history.slice(0, -1) };
  }
  if (state.screen === 'aod') return { ...state, screen: 'face' };
  return { ...state, screen: 'face' };
}

const sequence: ScreenId[] = ['face', 'activity', 'multisport', 'heart-rate', 'sleep', 'spo2', 'stress'];

export function watchReducer(state: WatchState, action: Action): WatchState {
  switch (action.type) {
    case 'MENU':
      if (state.screen === 'aod') return { ...state, screen: 'face', history: [] };
      if (state.screen === 'face') return { ...state, screen: 'drawer', history: ['face'] };
      return back(state);
    case 'SPORTS':
      return open(state, 'multisport');
    case 'BACK': return back(state);
    case 'SWIPE': {
      const { direction } = action;
      if (state.screen === 'aod') {
        if (direction === 'right') return { ...state, screen: 'feed', feedOrigin: 'aod', history: [] };
        return state;
      }
      if (state.screen === 'face') {
        if (direction === 'left') return { ...state, screen: 'activity', history: [] };
        if (direction === 'right') return { ...state, screen: 'feed', feedOrigin: 'face', history: [] };
        if (direction === 'down') return { ...state, screen: 'quick-1', history: ['face'] };
        if (direction === 'up') return { ...state, screen: 'notifications', history: ['face'] };
      }
      if (state.screen === 'feed') {
        if (direction === 'left') return { ...state, screen: state.feedOrigin === 'aod' ? 'aod' : 'face', history: [] };
        if (direction === 'right') return { ...state, screen: 'face', history: [] };
      }
      if (state.screen === 'quick-1') {
        if (direction === 'right') return { ...state, screen: 'quick-2' };
        if (direction === 'up' || direction === 'left') return { ...state, screen: 'face', history: [] };
      }
      if (state.screen === 'quick-2') {
        if (direction === 'left') return { ...state, screen: 'quick-1' };
        if (direction === 'up') return { ...state, screen: 'face', history: [] };
      }
      if (state.screen === 'notifications' && direction === 'down') return { ...state, screen: 'face', history: [] };
      const index = sequence.indexOf(state.screen);
      if (index >= 0 && direction === 'left' && index < sequence.length - 1) return { ...state, screen: sequence[index + 1], history: [] };
      if (index > 0 && direction === 'right') return { ...state, screen: sequence[index - 1], history: [] };
      if (direction === 'right' && state.screen !== 'drawer') return back(state);
      return state;
    }
    case 'OPEN': return open(state, action.screen);
    case 'OPEN_APP': {
      const routes: Partial<Record<AppId, ScreenId>> = {
        activity: 'activity', health: 'heart-rate', sleep: 'sleep', multisport: 'multisport', settings: 'settings',
      };
      return { ...open(state, routes[action.appId] || 'app'), appId: action.appId };
    }
    case 'OPEN_SETTING': return { ...open(state, action.settingId === 'power' || action.settingId === 'restart' || action.settingId === 'reset' ? 'power-confirm' : 'setting-detail'), settingId: action.settingId };
    case 'OPEN_SPORT': return { ...open(state, 'workout-setup'), sport: action.sport, goal: 'No Goal', goalValue: 30 };
    case 'SELECT_GOAL': return { ...state, goal: action.goal, goalValue: action.value ?? state.goalValue, screen: 'workout-setup', history: state.history.slice(0, -1) };
    case 'SET_SETTING': return { ...state, settings: { ...state.settings, [action.key]: action.value } };
    case 'START_WORKOUT': return { ...open(state, 'workout-session'), workout: { active: true, paused: false, startedAt: Date.now(), elapsedBeforePause: 0 } };
    case 'PAUSE_WORKOUT': {
      const w = state.workout;
      if (!w.active) return state;
      return { ...state, workout: w.paused
        ? { ...w, paused: false, startedAt: Date.now() }
        : { ...w, paused: true, elapsedBeforePause: w.elapsedBeforePause + (w.startedAt ? Date.now() - w.startedAt : 0), startedAt: null } };
    }
    case 'FINISH_WORKOUT': return { ...state, screen: 'workout-setup', history: state.history.slice(0, -1), workout: { active: false, paused: false, startedAt: null, elapsedBeforePause: 0 } };
    case 'TIMER_START': return { ...state, timer: { ...state.timer, active: true, paused: false, startedAt: Date.now() } };
    case 'TIMER_PAUSE': {
      const t = state.timer;
      if (!t.active) return state;
      return { ...state, timer: t.paused
        ? { ...t, paused: false, startedAt: Date.now() }
        : { ...t, paused: true, elapsedBeforePause: t.elapsedBeforePause + (t.startedAt ? Date.now() - t.startedAt : 0), startedAt: null } };
    }
    case 'TIMER_RESET': return { ...state, timer: { active: false, paused: false, startedAt: null, elapsedBeforePause: 0 } };
    case 'NOTIFICATION_DEMO': return { ...state, demoNotification: !state.demoNotification };
    case 'GAME_POINT': return { ...state, gameScore: state.gameScore + 1 };
    case 'POWER_ACTION': {
      if (action.action === 'reset') return { ...createInitialState(), settings: defaultSettings };
      return { ...state, screen: 'aod', history: [], workout: { active: false, paused: false, startedAt: null, elapsedBeforePause: 0 } };
    }
  }
}
