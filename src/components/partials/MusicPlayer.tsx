import {
  IMusic,
  MusicContext,
  MUSIC_ACTIONS,
} from 'context';
import { useContext, useEffect, useRef } from 'react';
import { TiArrowRepeat } from 'react-icons/ti';
import {
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoShuffleOutline,
} from 'react-icons/io5';
import { IoMdPause } from 'react-icons/io';
/// refactor needed
const MusicPlayer = () => {
  const { dispatch } = useContext(MusicContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, playing } =
    useContext(MusicContext).state;
  const { link, title, year, singers } = currentTrack;
  const onPlay = () => {
    dispatch({
      type: !playing
        ? MUSIC_ACTIONS.PLAY
        : MUSIC_ACTIONS.PAUSE,
    });
  };

  useEffect(() => {
    if (!link) return;
    console.log(link);
    const audio = document.querySelector(
      'audio'
    ) as HTMLAudioElement;

    // const canvas = document.querySelector(
    //   '.visualizer'
    // ) as HTMLCanvasElement;
    // const audioCtx = new AudioContext();
    // const ctx = canvas.getContext(
    //   '2d'
    // ) as CanvasRenderingContext2D;
    // const audioSrc =
    //   audioCtx.createMediaElementSource(audio);
    // const analyser = audioCtx.createAnalyser();
    // audioSrc.connect(analyser);
    // audioSrc.connect(audioCtx.destination);

    // analyser.fftSize = 32;
    // const bufferLength = analyser.frequencyBinCount;
    // console.log(bufferLength);
    // const dataArray = new Uint8Array(bufferLength);

    // const barWidth = (500 / bufferLength) * 2.5;
    // let barHeight;
    // let x = 0;

    // for (let i = 0; i < bufferLength; i++) {
    //   barHeight = (dataArray[i] as number) / 2;
    //   console.log(barHeight);
    //   ctx.fillStyle =
    //     'rgb(' + (barHeight + 100) + ',50,50)';
    //   ctx.fillRect(
    //     x,
    //     200 - barHeight / 2,
    //     barWidth,
    //     barHeight
    //   );

    //   x += barWidth + 1;
    // }
  }, [link]);
  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
    console.log(audioRef.current.duration);
  }, [playing]);
  return (
    <div className='min-w-[300px] min-h-[400px] bg-extra_dark_purple text-center rounded-3xl'>
      <h2 className='text-cwhite text-lg font-semibold capitalize'>
        {title || 'empty'}
      </h2>
      <h3 className='text-gray-400 text-sm font-light'>
        {singers.join(', ') || 'empty'}
      </h3>
      <audio
        ref={audioRef}
        preload={playing ? 'auto' : 'none'}
        crossOrigin='anonymous'
        src={
          link &&
          `${process.env.NEXT_PUBLIC_MJOLNIR_URL}/file/${link}`
        }
      />
      {/* visualizer range component */}
      {/* <canvas className='visualizer' /> */}
      <input type='range' />
      <section className=' px-4 text-2xl text-gray-400 flex justify-between items-center'>
        <button>
          <TiArrowRepeat />
        </button>
        <section className='text-gray-100 space-x-5 flex items-center justify-center'>
          <button>
            <IoPlaySkipBack />
          </button>
          <button
            onClick={onPlay}
            className='text-extra_light_purple rounded-full p-3.5 bg-gray-100'
          >
            {!playing ? <IoPlay /> : <IoMdPause />}
          </button>
          <button>
            <IoPlaySkipForward />
          </button>
        </section>
        <button>
          <IoShuffleOutline />
        </button>
      </section>
    </div>
  );
};

export default MusicPlayer;
