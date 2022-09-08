import { MusicContext } from 'context';
import { truncate } from 'fs/promises';
import { useContext, useEffect, useRef } from 'react';

/// refactor
const MusicPlayer = () => {
  const { state } = useContext(MusicContext);
  const id = state.currentTrack?.link;
  const url = `${process.env.NEXT_PUBLIC_MJOLNIR_URL}/file/${id}`;
  const playing = state.playing;
  const audioCtx = new AudioContext();
  const audioSrc = audioCtx.createBufferSource();
  audioSrc.connect(audioCtx.destination);
  useEffect(() => {
    const load = () => {
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        let audioData = request.response;
        audioCtx.decodeAudioData(
          audioData,
          (buffer) => {
            audioSrc.buffer = buffer;

            if (playing) {
              audioSrc.start();
            }
          },
          (e) => {
            // on error callback
            console.log('An error occurred');
            console.log(e);
          }
        );
      };

      request.setRequestHeader(
        'Authorization',
        process.env.NEXT_PUBLIC_MJOLNIR_TOKEN ?? ''
      );
      request.send();
    };
    id && load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='min-w-[300px]'>
      <h1>Music Player</h1>
      <button onClick={() => audioSrc.stop()}>close</button>
      <button onClick={() => audioCtx.resume()}>
        play
      </button>
    </div>
  );
};

export default MusicPlayer;
