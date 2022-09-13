export interface IMusic {
  id: string;
  title: string;
  link: string;
  year: Date;
  singers: string[];
  genres: string[];
}

export interface IMusicState {
  playing: boolean;
  currentTrack: IMusic;
}

export interface IMusicContext {
  state: IMusicState;
  dispatch: React.Dispatch<IMusicAction>;
}

export interface IMusicAction {
  type: string;
  payload?: IMusic;
}

export const MUSIC_ACTIONS = {
  START: 'START',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
};
