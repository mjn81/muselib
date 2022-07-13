import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { trpc } from 'utils/trpc';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>MuseLib</title>
				<meta
					name="description"
					content="The best online private music library"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex flex-col">

				<Link href="/auth/login">Login</Link>
				<Link href="/auth/register">Register</Link>
			</div>
		</>
	);
};

export default Home;
