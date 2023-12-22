import React from 'react'
import ContactUs from '../components/ContactUs'
import Head from 'next/head'

const contactus = () => {
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
     <ContactUs />   
    </>
  )
}

export default contactus