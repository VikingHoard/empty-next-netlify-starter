import { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/instagram');
      const data = await res.json();
      setFeed(data.feed);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        {feed && feed.data && feed.data.map((item, index) => (
		  <div key={index}>
			<h3>Item {index+1}</h3>
			<p><strong>ID:</strong> {item.id}</p>
			<p><strong>Caption:</strong> {item.caption}</p>
			<p><strong>Media Type:</strong> {item.media_type}</p>
			{item.media_type === 'IMAGE' && <img src={item.media_url} alt={item.caption} />}
			{item.media_type === 'VIDEO' && <video controls src={item.media_url}>Your browser does not support the video tag.</video>}
			<p><strong>Permalink:</strong> <a href={item.permalink}>Link</a></p>
		  </div>
		))}

      </main>

      <Footer />
    </div>
  )
}
