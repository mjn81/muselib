import { createContext } from 'react';
import { IMusicContext, IMusicState } from './types';

export const initialState: IMusicState = {
  playing: false,
  currentTrack: {
    link: '',
    id: '',
    title: '',
    year: new Date(),
    singers: [],
    genres: [],
  },
};

const initialContext: IMusicContext = {
  state: initialState,
  dispatch: () => null,
};

export const MusicContext =
  createContext<IMusicContext>(initialContext);
