import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  // TODO: create HOC for routegaurding

  return (
    <>
      <Head>
        <title>MuseLib</title>
        <meta
          name='description'
          content='The best online private music library'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col'>
        <Link href='/auth/login'>Login</Link>
        <Link href='/auth/register'>Register</Link>
        <Link href='/app/'>App</Link>
      </div>
    </>
  );
};

export default Home;
