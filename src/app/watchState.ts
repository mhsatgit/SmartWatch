export type SettingsValues = {
  brightness: number;
  dnd: boolean;
  airplane: boolean;
  flashlight: boolean;
  ring: boolean;
  vibrate: boolean;
  autoSport: boolean;
  raiseToWake: boolean;
  phoneMuted: boolean;
  sync: boolean;
  language: string;
  hotKey: string;
};

export const defaultSettings: SettingsValues = {
  brightness: 70,
  dnd: false,
  airplane: true,
  flashlight: false,
  ring: true,
  vibrate: true,
  autoSport: false,
  raiseToWake: true,
  phoneMuted: true,
  sync: true,
  language: 'English',
  hotKey: 'Phone',
};

export function restoreSettings(): SettingsValues {
  try {
    const saved = JSON.parse(localStorage.getItem('ft-a9508-settings') || '{}') as Partial<SettingsValues>;
    return { ...defaultSettings, ...saved };
  } catch {
    return defaultSettings;
  }
}

export const demoReadings = { heartRate: 76, spo2: 98, stress: 28 } as const;
