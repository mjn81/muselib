// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { ToastContainer } from "react-toastify";

import type { AppRouter } from "../server/router";
import "styles/globals.css";
import "styles/alert.css";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "utils/storage";



const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    const links = [
      loggerLink(),
      httpBatchLink({
        url,
        maxBatchSize: 10,
      }),
    ];
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 10,
          },
        },
      },
      headers: () => {
        const token = getToken();
        if (token.length == 0)
          return {};
        return {
          authorization:  `TOKEN ${token}`
        };
      },
      links,
      transformer: superjson,
    };
  },

  ssr: false,
})(MyApp);
