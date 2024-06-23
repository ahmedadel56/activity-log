import Head from 'next/head';
import EventList from '../components/EventList';

import '../styles/globals.css'

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Activity Log</title>
        <meta name="description" content="Activity Log" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl mb-4">Activity Log</h1>
        <EventList />
      </main>
    </div>
  );
};

export default Home;
