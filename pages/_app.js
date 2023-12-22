

import "../style/globals.css"
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";




function MyApp({ Component, pageProps: { session, ...pageProps } }) {



  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
