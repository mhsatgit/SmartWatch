import { useEffect, useReducer, useState, type ReactNode } from 'react';
import WatchIcon from '../components/WatchIcon';
import { apps } from '../data/apps';
import { settingItems } from '../data/navigation';
import { useClock } from '../hooks/useClock';
import { useWatchGestures } from '../hooks/useWatchGestures';
import { createInitialState, watchReducer, type Action, type Goal, type Sport, type WatchState } from './watchReducer';
import { demoReadings, type SettingsValues } from './watchState';
import '../styles/global.css';

type Send = React.Dispatch<Action>;

function IconButton({ icon, color, label, onClick, className = '' }: { icon: string; color?: string; label: string; onClick: () => void; className?: string }) {
  return <button className={`icon-button ${className}`} title={label} aria-label={label} onClick={onClick}><WatchIcon name={icon} color={color} /></button>;
}

function Header({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return <div className="screen-header">{onBack && <button className="back-button" aria-label="Back" onClick={onBack}>‹</button>}<strong>{title}</strong>{right && <span className="header-right">{right}</span>}</div>;
}

function ClockFace({ date, aod = false }: { date: Date; aod?: boolean }) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;
  return <div className={aod ? 'aod-face' : 'clock-face'} aria-label={`Actual time ${date.toLocaleTimeString()}`}>
    <svg viewBox="0 0 220 220" role="img" aria-label="Analog clock">
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1="110" y1="13" x2="110" y2={i % 3 === 0 ? '31' : '24'} transform={`rotate(${i * 30} 110 110)`} className="clock-tick" />)}
      <line x1="110" y1="110" x2="110" y2="61" transform={`rotate(${hours * 30} 110 110)`} className="hour-hand" />
      <line x1="110" y1="110" x2="110" y2="35" transform={`rotate(${minutes * 6} 110 110)`} className="minute-hand" />
      <circle cx="110" cy="110" r="3.5" fill="white" />
    </svg>
  </div>;
}

function XFace({ date }: { date: Date }) {
  return <div className="x-face" aria-label={`Watch face, ${date.toLocaleTimeString()}`}><svg viewBox="0 0 240 240" aria-hidden="true"><defs><filter id="xglow"><feGaussianBlur stdDeviation="11"/></filter><linearGradient id="xgradient" x1="0" x2="1"><stop stopColor="#27fb18"/><stop offset=".55" stopColor="#08ed0d"/><stop offset="1" stopColor="#20ff40"/></linearGradient></defs><path d="M24 27 100 119 26 215h35l60-72 58 72h35l-74-96 75-92h-36l-58 70-58-70Z" fill="#08ed16" opacity=".75" filter="url(#xglow)"/><path d="M24 27 100 119 26 215h35l60-72 58 72h35l-74-96 75-92h-36l-58 70-58-70Z" fill="url(#xgradient)"/></svg></div>;
}

function ActivityScreen() {
  const measures = [
    { icon: 'shoe', value: '1880', unit: 'Steps', color: '#ff693c', pct: 100 },
    { icon: 'flame', value: '73', unit: 'Cal', color: '#ff342b', pct: 100 },
    { icon: 'runner', value: '0', unit: 'min', color: '#04e6d1', pct: 100 },
    { icon: 'runner', value: '6', unit: 've hrs', color: '#2599fb', pct: 48 },
  ];
  return <div className="activity-screen">
    <div className="activity-measures">{measures.map(m => <div className="activity-measure" key={m.unit}><WatchIcon name={m.icon} color={m.color} size="1.45em"/><div><b>{m.value}</b><small>{m.unit}</small></div></div>)}</div>
    <div className="activity-bars">{measures.map(m => <div className="activity-track" key={m.unit}><div style={{ height: `${m.pct}%`, background: m.color }} /></div>)}</div>
  </div>;
}

function MultisportScreen({ send }: { send: Send }) {
  const tiles: { title: Sport | 'More'; icon: string }[] = [{ title: 'Indoor Walk', icon: 'treadmill' }, { title: 'Outdoor Run', icon: 'runner' }, { title: 'Outdoor Walk', icon: 'walk' }, { title: 'More', icon: 'more' }];
  return <div className="multisport-screen"><h2>Recent Multisport</h2><div className="sport-grid">{tiles.map(({ title, icon }) => <button key={title} className="sport-tile" onClick={() => title === 'More' ? send({ type: 'OPEN', screen: 'more-sports' }) : send({ type: 'OPEN_SPORT', sport: title })}><WatchIcon name={icon} color={title === 'More' ? '#ffd6ec' : '#18f14b'} size="2.5em"/><span>{title}</span></button>)}</div></div>;
}

function WorkoutSetup({ state, send }: { state: WatchState; send: Send }) {
  return <div className="workout-setup"><Header title={state.sport} onBack={() => send({ type: 'BACK' })}/><div className="workout-icon"><WatchIcon name={state.sport.includes('Run') ? 'runner' : state.sport.includes('Walk') ? 'walk' : 'activity'} size="2.8em" color="#18ec4f"/></div><button className="goal-link" onClick={() => send({ type: 'OPEN', screen: 'goal-picker' })}>{state.goal}{state.goal !== 'No Goal' ? ` · ${state.goalValue}${state.goal === 'Time' ? ' min' : state.goal === 'Distance' ? ' km' : ' Cal'}` : ''} ›</button><button className="start-button" onClick={() => send({ type: 'START_WORKOUT' })} aria-label={`Start ${state.sport}`}>▶</button></div>;
}

function GoalPicker({ state, send }: { state: WatchState; send: Send }) {
  const [value, setValue] = useState(state.goalValue);
  return <div className="generic-screen"><Header title="Goal" onBack={() => send({ type: 'BACK' })}/><div className="scroll-content goal-list">{(['No Goal', 'Time', 'Distance', 'Calories'] as Goal[]).map(goal => <button className="list-row" key={goal} onClick={() => send({ type: 'SELECT_GOAL', goal, value })}><span>{goal}</span><span className="row-end">{state.goal === goal ? '✓' : '›'}</span></button>)}<label className="slider-label">Goal amount <input type="number" min="1" max="999" value={value} onChange={e => setValue(Number(e.target.value))} /></label></div></div>;
}

function MoreSports({ send }: { send: Send }) {
  return <div className="generic-screen"><Header title="More Sports" onBack={() => send({ type: 'BACK' })}/><div className="scroll-content">{(['Cycling', 'Treadmill', 'Yoga', 'Free Training'] as Sport[]).map(sport => <button className="list-row" key={sport} onClick={() => send({ type: 'OPEN_SPORT', sport })}><WatchIcon name={sport === 'Treadmill' ? 'treadmill' : 'activity'} color="#16e250"/><span>{sport}</span><span className="row-end">›</span></button>)}</div></div>;
}

function elapsedMs(unit: { startedAt: number | null; elapsedBeforePause: number; paused: boolean }, now: Date) { return Math.max(0, unit.elapsedBeforePause + (!unit.paused && unit.startedAt ? now.getTime() - unit.startedAt : 0)); }
function duration(ms: number) { const seconds = Math.floor(ms / 1000); return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }

function WorkoutSession({ state, send, now }: { state: WatchState; send: Send; now: Date }) {
  return <div className="session-screen"><Header title={state.sport}/><span className="demo-tag">SIMULATED WORKOUT</span><div className="session-duration">{duration(elapsedMs(state.workout, now))}</div><div className="session-stats"><div><b>0.00</b><small>km</small></div><div><b>0</b><small>Cal</small></div><div><b>--</b><small>bpm</small></div></div><div className="session-actions"><button onClick={() => send({ type: 'PAUSE_WORKOUT' })}>{state.workout.paused ? 'Resume' : 'Pause'}</button><button onClick={() => send({ type: 'FINISH_WORKOUT' })}>Finish</button></div></div>;
}

function Chart({ type }: { type: 'heart-rate' | 'spo2' | 'stress' }) {
  return <div className={`mini-chart chart-${type}`}><div className="chart-grid"><span className="y-top">{type === 'heart-rate' ? '95' : '100'}</span><span className="y-bottom">{type === 'heart-rate' ? '62' : type === 'spo2' ? '70' : '0'}</span>{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ left: `${i * 25}%` }}/>)}</div>{type === 'heart-rate' && <div className="heart-bars">{[31, 45, 66, 55, 49, 38].map((h, i) => <i key={i} style={{ height: `${h}%` }}/>)}</div>}{type === 'stress' && <div className="stress-bars">{[23, 28, 33].map((h, i) => <i key={i} style={{ height: `${h}%` }}/>)}</div>}<div className="chart-labels"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span></div></div>;
}

function SensorScreen({ type, send }: { type: 'heart-rate' | 'spo2' | 'stress'; send: Send }) {
  const [measuring, setMeasuring] = useState(true);
  const [cycle, setCycle] = useState(0);
  useEffect(() => { setMeasuring(true); const t = window.setTimeout(() => setMeasuring(false), 4500); return () => clearTimeout(t); }, [type, cycle]);
  const config = { 'heart-rate': { title: 'Heart Rate', icon: 'heart', color: '#f41755', value: demoReadings.heartRate, unit: 'bpm' }, spo2: { title: 'SpO2', icon: 'drop', color: '#ff1761', value: demoReadings.spo2, unit: '%' }, stress: { title: 'Stress', icon: 'stress', color: '#edb3ff', value: demoReadings.stress, unit: '' } }[type];
  return <div className="sensor-screen"><Header title={config.title} right={type !== 'heart-rate' && <button className="info-button" onClick={() => send({ type: 'OPEN', screen: 'sensor-info' })}>ⓘ</button>}/><div className="sensor-reading"><WatchIcon name={config.icon} color={config.color} size="2.1em"/><b>{measuring ? '--' : config.value}</b><span style={{ color: config.color }}>{config.unit}</span></div>{type === 'heart-rate' && <div className="heart-range"><span>↑ 95</span><span>↓ 70</span></div>}<Chart type={type}/>{type === 'heart-rate' && <div className="resting">Resting&nbsp; <b>{measuring ? '--' : '72'}</b> bpm</div>}<button className="measure-state" onClick={() => setCycle(cycle + 1)}>{measuring ? 'Measuring...' : 'Measure again'}</button><small className="sim-note">Simulated reading</small></div>;
}

function SleepScreen() {
  return <div className="sleep-screen scroll-content"><h2 className="sleep-heading">Sleep</h2><div className="sleep-icon"><WatchIcon name="sleep" color="#f8fbff" size="4em"/></div><div className="sleep-summary"><div className="sleep-total">00 <small>hr</small> 30 <small>min</small></div><p>06:20 AM - 06:50 AM</p><div className="sleep-line"/></div>{[['Deep Sleep', '0 min', '#8d7dff'], ['Light Sleep', '30 min', '#43d6ff'], ['Awake', '0 min', '#ffffff'], ['REM', '0 min', '#f6a3ef']].map(([label, value, color]) => <div className="sleep-detail" key={label}><div><span style={{ background: color }}/><b style={{ color }}>{label}</b></div><em>{value}</em></div>)}</div>;
}

function QuickSettings({ state, send, page, now }: { state: WatchState; send: Send; page: 1 | 2; now: Date }) {
  const s = state.settings;
  const toggle = (key: keyof SettingsValues) => send({ type: 'SET_SETTING', key, value: !s[key] });
  const page1 = [
    { icon: 'dnd', label: 'DND', color: s.dnd ? '#438dff' : '#979ba6', action: () => toggle('dnd') },
    { icon: 'brightness', label: 'Brightness', color: '#238fee', action: () => send({ type: 'OPEN_SETTING', settingId: 'display' }) },
    { icon: 'flashlight', label: 'Flashlight', color: s.flashlight ? '#ffc448' : '#a0a5b0', action: () => toggle('flashlight') },
    { icon: 'phone', label: 'Mute phone', color: s.phoneMuted ? '#e5243d' : '#9ba5aa', action: () => toggle('phoneMuted') },
    { icon: 'airplane', label: 'Airplane mode', color: s.airplane ? '#2d9df6' : '#9aa3b1', action: () => toggle('airplane') },
    { icon: 'gear', label: 'Settings', color: '#247fb8', action: () => send({ type: 'OPEN', screen: 'settings' }) },
  ];
  const page2 = [
    { icon: 'findphone', label: 'Find phone', color: '#ababc1', action: () => send({ type: 'OPEN_APP', appId: 'findphone' }) },
    { icon: 'sync', label: 'Sync', color: s.sync ? '#2ecdb7' : '#9ba5aa', action: () => toggle('sync') },
    { icon: 'bell', label: 'Vibrate', color: s.vibrate ? '#1897e8' : '#9ba5aa', action: () => toggle('vibrate') },
    { icon: 'flashlight', label: 'Flashlight', color: s.flashlight ? '#ffc343' : '#c9a343', action: () => toggle('flashlight') },
    { icon: 'watch', label: 'Raise to wake', color: s.raiseToWake ? '#238ee6' : '#9ba5aa', action: () => toggle('raiseToWake') },
    { icon: 'health', label: 'SOS', color: '#b8b7c2', action: () => send({ type: 'OPEN_APP', appId: 'wellness' }) },
  ];
  return <div className="quick-screen"><div className="quick-status"><span className="status-left"><i>♟</i><i>✿</i><WatchIcon name="airplane" color="#32e0ed" size="1.2em"/></span><span>62% <span className="battery-outline"><i/></span></span></div><div className="quick-date">{now.toLocaleDateString('en-GB').replaceAll('/', '/')} &nbsp;{now.toLocaleDateString('en-US', { weekday: 'short' })}</div><div className="quick-grid">{(page === 1 ? page1 : page2).map(item => <IconButton key={item.label} icon={item.icon} color={item.color} label={item.label} onClick={item.action}/>)}</div><div className="page-dots"><i className={page === 1 ? 'selected' : ''}/><i className={page === 2 ? 'selected' : ''}/></div></div>;
}

function Notifications({ state, send }: { state: WatchState; send: Send }) {
  return <div className="notifications-screen"><WatchIcon name="bell" size="5.5em" color="#fff"/><strong>{state.demoNotification ? 'Demo Notification' : 'No Notifications'}</strong>{state.demoNotification && <button className="subtle-button" onClick={() => send({ type: 'NOTIFICATION_DEMO' })}>Clear</button>}</div>;
}

function Drawer({ send }: { send: Send }) {
  return <div className="drawer-screen scroll-content"><div className="app-grid">{apps.map(app => <button key={app.id} aria-label={app.title} title={app.title} onClick={() => send({ type: 'OPEN_APP', appId: app.id })}><WatchIcon name={app.icon} color={app.color} size="2.5em"/></button>)}</div></div>;
}

function Feed({ send, now }: { send: Send; now: Date }) {
  return <div className="feed-screen scroll-content"><h1>{now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}</h1><section><h2>Recent Activities</h2><div className="feed-shortcuts"><IconButton icon="runner" color="#fb7966" label="Multisport" onClick={() => send({ type: 'OPEN', screen: 'multisport' })}/><IconButton icon="watch" color="#399fff" label="Watch Faces" onClick={() => send({ type: 'OPEN_APP', appId: 'watchfaces' })}/><IconButton icon="gear" color="#44c6f0" label="Settings" onClick={() => send({ type: 'OPEN', screen: 'settings' })}/></div></section><button className="feed-card feed-weather" onClick={() => send({ type: 'OPEN_APP', appId: 'weather' })}><WatchIcon name="weather" color="#f5f2ff"/><div><small>Check the connection with app to get Weather data</small></div></button><button className="feed-card feed-todo" onClick={() => send({ type: 'OPEN_APP', appId: 'todo' })}><WatchIcon name="clipboard" color="#35b9ff"/><div><small>Create To-Do List from app</small></div></button><button className="voice-pill" onClick={() => send({ type: 'OPEN_APP', appId: 'voice' })}><WatchIcon name="wave"/> AI Voice</button><h2 className="feed-section-title">Music</h2><button className="feed-card feed-music" onClick={() => send({ type: 'OPEN_APP', appId: 'music' })}><WatchIcon name="music" color="#ff73c1"/><div><small>Check the connection between your smart watch and the app</small></div></button><section><h2>Games</h2><div className="feed-shortcuts"><IconButton icon="dice" color="#83d7ff" label="Dice" onClick={() => send({ type: 'OPEN_APP', appId: 'games' })}/><IconButton icon="gameboard" color="#8fe78c" label="Games" onClick={() => send({ type: 'OPEN_APP', appId: 'games' })}/><IconButton icon="game-star" color="#f5bc54" label="Puzzle" onClick={() => send({ type: 'OPEN_APP', appId: 'games' })}/></div></section><section><h2>Clock</h2><div className="feed-shortcuts"><IconButton icon="timer" color="#5cb8ff" label="Timer" onClick={() => send({ type: 'OPEN_APP', appId: 'reminders' })}/><IconButton icon="alarm" color="#58beff" label="Alarm" onClick={() => send({ type: 'OPEN_APP', appId: 'calendar' })}/><IconButton icon="stopwatch" color="#53baff" label="Stopwatch" onClick={() => send({ type: 'OPEN_APP', appId: 'reminders' })}/></div></section></div>;
}

function Settings({ send }: { send: Send }) {
  return <div className="generic-screen"><Header title="Settings" onBack={() => send({ type: 'BACK' })}/><div className="scroll-content settings-list">{settingItems.map(item => <button className="list-row" key={item.id} onClick={() => send({ type: 'OPEN_SETTING', settingId: item.id })}><WatchIcon name={item.icon} color={item.color} size="1.65em"/><span>{item.label}{'sub' in item && <small>{item.sub}</small>}</span><span className="row-end">›</span></button>)}</div></div>;
}

function SettingDetail({ state, send }: { state: WatchState; send: Send }) {
  const id = state.settingId; const s = state.settings;
  const item = settingItems.find(x => x.id === id);
  const set = (key: keyof SettingsValues, value: SettingsValues[keyof SettingsValues]) => send({ type: 'SET_SETTING', key, value });
  const toggleRow = (label: string, key: keyof SettingsValues) => <button className="list-row" onClick={() => set(key, !s[key])}><span>{label}</span><span className={`toggle ${s[key] ? 'on' : ''}`} /></button>;
  return <div className="generic-screen"><Header title={item?.label || 'Settings'} onBack={() => send({ type: 'BACK' })}/><div className="scroll-content detail-list">
    {id === 'ring' && <>{toggleRow('Ring', 'ring')}{toggleRow('Vibrate', 'vibrate')}{toggleRow('Mute phone', 'phoneMuted')}</>}
    {id === 'auto-sport' && <>{toggleRow('Auto Sport Recognition', 'autoSport')}<p className="detail-copy">Detect walking and running in this demo.</p></>}
    {id === 'dnd' && <>{toggleRow('Do Not Disturb', 'dnd')}<p className="detail-copy">Silence watch alerts while enabled.</p></>}
    {id === 'display' && <><label className="slider-label">Brightness <b>{s.brightness}%</b><input type="range" min="10" max="100" value={s.brightness} onChange={e => set('brightness', Number(e.target.value))}/></label>{toggleRow('Raise to wake', 'raiseToWake')}</>}
    {id === 'hotkey' && <>{['Phone', 'Multisport', 'Settings'].map(v => <button className="list-row" key={v} onClick={() => set('hotKey', v)}><span>{v}</span><span className="row-end">{s.hotKey === v ? '✓' : ''}</span></button>)}</>}
    {id === 'language' && <>{['English', 'हिन्दी', 'Español'].map(v => <button className="list-row" key={v} onClick={() => set('language', v)}><span>{v}</span><span className="row-end">{s.language === v ? '✓' : ''}</span></button>)}</>}
    {id === 'battery' && <div className="battery-detail"><WatchIcon name="battery" color="#28d7d1" size="3em"/><b>62%</b><small>Simulated battery level</small></div>}
  </div></div>;
}

function GenericApp({ state, send, now }: { state: WatchState; send: Send; now: Date }) {
  const info = apps.find(a => a.id === state.appId);
  const id = state.appId;
  const [calc, setCalc] = useState('0');
  const [localToggle, setLocalToggle] = useState(false);
  const flash = state.settings.flashlight;
  const timerMs = elapsedMs(state.timer, now);
  return <div className="generic-screen"><Header title={info?.title || 'App'} onBack={() => send({ type: 'BACK' })}/><div className="scroll-content app-detail">
    <WatchIcon name={info?.icon || 'info'} color={info?.color || '#39bff7'} size="3.5em"/>
    {id === 'about' && <div className="app-copy"><b>Fastrack FT_A9508</b><p>Firmware v6.7.16</p><small>Interactive frontend simulation</small></div>}
    {id === 'watchfaces' && <><p>Watch Face</p><button className="app-choice" onClick={() => send({ type: 'OPEN', screen: 'face' })}>Green X face ›</button><button className="app-choice" onClick={() => send({ type: 'OPEN', screen: 'aod' })}>Analog AOD ›</button></>}
    {id === 'appgrid' && <button className="app-choice" onClick={() => send({ type: 'OPEN', screen: 'drawer' })}>Open App Drawer ›</button>}
    {id === 'flashlight' && <button className={`flash-panel ${flash ? 'lit' : ''}`} onClick={() => send({ type: 'SET_SETTING', key: 'flashlight', value: !flash })}>{flash ? 'Tap to turn off' : 'Tap to turn on'}</button>}
    {id === 'calculator' && <><div className="calc-readout">{calc}</div><div className="calc-grid">{['7','8','9','4','5','6','1','2','3','C','0','='].map(k => <button key={k} onClick={() => setCalc(k === 'C' ? '0' : k === '=' ? calc : calc === '0' ? k : calc + k)}>{k}</button>)}</div></>}
    {id === 'reminders' && <><span className="demo-tag">TIMER</span><div className="timer-display">{duration(timerMs)}</div><div className="app-actions"><button onClick={() => state.timer.active ? send({ type: 'TIMER_PAUSE' }) : send({ type: 'TIMER_START' })}>{!state.timer.active ? 'Start' : state.timer.paused ? 'Resume' : 'Pause'}</button><button onClick={() => send({ type: 'TIMER_RESET' })}>Reset</button></div><button className="app-choice" onClick={() => send({ type: 'NOTIFICATION_DEMO' })}>{state.demoNotification ? 'Clear demo notification' : 'Send demo notification'}</button></>}
    {id === 'games' && <><p>Dice game</p><div className="game-score">{state.gameScore ? (state.gameScore % 6) + 1 : '•'}</div><button className="app-choice" onClick={() => send({ type: 'GAME_POINT' })}>Roll dice</button></>}
    {id === 'weather' && <p className="app-copy">Check the connection with app to get Weather data</p>}
    {id === 'todo' && <><p className="app-copy">Create To-Do List from app</p><button className="app-choice" onClick={() => setLocalToggle(!localToggle)}>{localToggle ? '✓ Demo task complete' : 'Add demo task'}</button></>}
    {id === 'music' && <><p className="app-copy">Check the connection between your smart watch and the app</p><button className="app-choice" onClick={() => setLocalToggle(!localToggle)}>{localToggle ? '❚❚ Pause demo' : '▶ Play demo'}</button></>}
    {id === 'calendar' && <><div className="calendar-date">{now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div><p>{now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}</p><button className="app-choice" onClick={() => setLocalToggle(!localToggle)}>{localToggle ? 'Alarm set for 07:00' : 'Set demo alarm'}</button></>}
    {['voice', 'phone', 'wellness', 'findphone', 'camera'].includes(id || '') && <><p className="app-copy">{({ voice: 'AI Voice', phone: 'Phone control', wellness: 'Wellness', findphone: 'Find Phone', camera: 'Camera shutter' } as Record<string, string>)[id || '']} demo</p><button className="app-choice" onClick={() => setLocalToggle(!localToggle)}>{localToggle ? 'Active — tap to stop' : id === 'camera' ? 'Take demo photo' : 'Start demo'}</button></>}
  </div></div>;
}

function Screen({ state, send, now }: { state: WatchState; send: Send; now: Date }) {
  switch (state.screen) {
    case 'aod': return <ClockFace date={now} aod/>;
    case 'face': return <XFace date={now}/>;
    case 'activity': return <ActivityScreen/>;
    case 'multisport': return <MultisportScreen send={send}/>;
    case 'workout-setup': return <WorkoutSetup state={state} send={send}/>;
    case 'goal-picker': return <GoalPicker state={state} send={send}/>;
    case 'more-sports': return <MoreSports send={send}/>;
    case 'workout-session': return <WorkoutSession state={state} send={send} now={now}/>;
    case 'heart-rate': case 'spo2': case 'stress': return <SensorScreen type={state.screen} send={send}/>;
    case 'sleep': return <SleepScreen/>;
    case 'quick-1': case 'quick-2': return <QuickSettings state={state} send={send} page={state.screen === 'quick-1' ? 1 : 2} now={now}/>;
    case 'notifications': return <Notifications state={state} send={send}/>;
    case 'drawer': return <Drawer send={send}/>;
    case 'feed': return <Feed send={send} now={now}/>;
    case 'settings': return <Settings send={send}/>;
    case 'setting-detail': return <SettingDetail state={state} send={send}/>;
    case 'app': return <GenericApp state={state} send={send} now={now}/>;
    case 'sensor-info': return <div className="generic-screen"><Header title="About measurement" onBack={() => send({ type: 'BACK' })}/><p className="detail-copy">This interactive replica uses simulated readings and has no physical sensors.</p></div>;
    case 'power-confirm': return <div className="generic-screen"><Header title={settingItems.find(i => i.id === state.settingId)?.label || 'Power'} onBack={() => send({ type: 'BACK' })}/><div className="confirm-page"><WatchIcon name="power" color="#f66" size="3em"/><p>{state.settingId === 'reset' ? 'Reset demo settings?' : `${settingItems.find(i => i.id === state.settingId)?.label} the watch?`}</p><button onClick={() => send({ type: 'POWER_ACTION', action: state.settingId === 'reset' ? 'reset' : state.settingId === 'restart' ? 'restart' : 'power' })}>Confirm</button></div></div>;
  }
}

export default function App() {
  const [state, send] = useReducer(watchReducer, undefined, createInitialState);
  const now = useClock();
  const gestures = useWatchGestures(direction => send({ type: 'SWIPE', direction }));
  useEffect(() => { localStorage.setItem('ft-a9508-settings', JSON.stringify(state.settings)); }, [state.settings]);
  const scrollable = ['drawer', 'feed', 'sleep', 'settings', 'setting-detail', 'goal-picker', 'more-sports', 'app'].includes(state.screen);
  useEffect(() => {
    const onArrowKey = (event: KeyboardEvent) => {
      const directions = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' } as const;
      const direction = directions[event.key as keyof typeof directions];
      if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select'))) return;
      event.preventDefault();
      if (scrollable && (direction === 'up' || direction === 'down')) {
        const content = document.querySelector<HTMLElement>('.display .scroll-content');
        if (content) {
          content.scrollBy({ top: content.clientHeight * (direction === 'up' ? 0.7 : -0.7), behavior: 'auto' });
          return;
        }
      }
      if (!event.repeat) send({ type: 'SWIPE', direction });
    };
    window.addEventListener('keydown', onArrowKey);
    return () => window.removeEventListener('keydown', onArrowKey);
  }, [scrollable]);
  return <main className="stage"><div className="watch" data-screen={state.screen}>
    <div className="strap strap-top"><div className="strap-texture"/><div className="strap-logo">fastrack</div><div className="strap-lug"/></div>
    <div className="strap strap-bottom"><div className="strap-lug"/><div className="strap-texture"/><div className="strap-holes"><i/><i/><i/><i/></div></div>
    <div className="watch-case"><div className="case-rim"><div className="display" style={{ filter: `brightness(${Math.max(.55, state.settings.brightness / 100)})`, touchAction: scrollable ? 'pan-y' : 'none' }} {...gestures}><div key={state.screen} className="screen-transition"><Screen state={state} send={send} now={now}/></div></div></div></div>
    <button className="side-button menu-button" aria-label="Physical MENU crown" onClick={() => send({ type: 'MENU' })}><span/></button><button className="side-button sports-button" aria-label="Physical SPORTS button" onClick={() => send({ type: 'SPORTS' })}/>
  </div><div className="stage-caption"><strong>Smart Watch Simulation</strong></div></main>;
}
