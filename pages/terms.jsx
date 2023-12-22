import React from 'react'
import Terms from '../components/Terms'
import Head from 'next/head'

const terms = () => {
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
        <Terms />
    </>
  )
}

export default terms