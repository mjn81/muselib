// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";

import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

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
        return {
          authorization:
            "TOKEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1qam5uODFAZ21haWwuY29tIiwiaWQiOiJjbDVsZW90cG8wMDIwZ2VveHFtbnd3bmNuIiwiaWF0IjoxNjU3ODI4MDEzLCJleHAiOjE2NTgwODcyMTN9.mtkaF7fWj9QLLILIrMTqTDiykHuV_zWF7drmzHaQbTM",
        };
      },
      links,
      transformer: superjson,
    };
  },

  ssr: false,
})(MyApp);
