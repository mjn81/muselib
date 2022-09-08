import { createContext } from 'react';
import { IMusicContext, IMusicState } from './types';

export const initialState = {
  state: { playing: false, currentTrack: null },
  dispatch: () => null,
};

export const MusicContext =
  createContext<IMusicContext>(initialState);
