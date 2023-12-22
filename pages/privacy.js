import React from 'react'
import Privacy from '../components/Privacy'
import Head from 'next/head'


const privacy = () => {
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
      <Privacy />  
    </>
  )
}

export default privacy