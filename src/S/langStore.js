import { persistentAtom } from '@nanostores/persistent';

// Gemmer sproget i localStorage, så det huskes ved reload
export const lang = persistentAtom('lang', 'en');
