import { PropsWithChildren, useReducer } from 'react';
import { MusicContext } from './context';
import { reducer } from './reducer';

const initialValue = {
  currentTrack: null,
  playing: false,
};

export const MusicProvider = ({
  children,
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialValue
  );
  return (
    <MusicContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicContext.Provider>
  );
};
