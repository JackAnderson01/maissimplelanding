import React from "react";
import Home from "../components/Home";
import Head from "next/head";

const home = () => {
  return (
    <>
      <Head>
        <title>Maid Simpl</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&family=Fira+Sans+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,500&family=Fira+Sans:wght@100;200;400;500;600;700&family=Noto+Sans:ital,wght@0,100;0,300;0,500;0,600;0,700;1,300&family=Noto+Serif+Old+Uyghur&family=Poppins:wght@200;300;400;500;600;700;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=VT323&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <Home />
    </>
  );
};

export default home;
