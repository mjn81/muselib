import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  // TODO: create HOC for routegaurding
  
  const router = useRouter();
  const { error, warning } = router.query;
  if (error)
    toast.error(error);
  if (warning)
    toast.warning(warning);

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
