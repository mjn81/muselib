import {
  IMusicAction,
  IMusicState,
  MUSIC_ACTIONS,
} from './types';

export const reducer = (
  state: IMusicState,
  action: IMusicAction
) => {
  switch (action.type) {
    case MUSIC_ACTIONS.START:
      return {
        ...state,
        playing: true,
        currentTrack: action.payload,
      };
    case MUSIC_ACTIONS.PAUSE:
      return {
        ...state,
        playing: false,
      };
    case MUSIC_ACTIONS.PLAY:
      return {
        ...state,
        playing: true,
      };

    default:
      return state;
  }
};
