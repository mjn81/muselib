export interface IMusic {
  id: string;
  title: string;
  link: string;
}

export interface IMusicState {
  playing: boolean;
  currentTrack: IMusic | null;
}

export interface IMusicContext {
  state: IMusicState;
  dispatch: React.Dispatch<IMusicAction>;
}

export interface IMusicAction {
  type: string;
  payload: IMusic;
}

export const MUSIC_ACTIONS = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
};
