import { PropsWithChildren, useReducer } from 'react';
import { initialState, MusicContext } from './context';
import { reducer } from './reducer';

export const MusicProvider = ({
  children,
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <MusicContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicContext.Provider>
  );
};
