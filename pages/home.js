import React from 'react'
import Home from '../components/Home'
import Head from 'next/head'

const home = () => {
  return (
    <>
    <Head>
        <title>Maid Simpl</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <Home />  
    </>
  )
}

export default home