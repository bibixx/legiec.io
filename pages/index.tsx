import type { NextPage } from 'next';
import Head from 'next/head';

import classes from './index.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bartek Legięć | legiec.io</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
          integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={classes.home}>
        <video muted loop autoPlay>
          <source src="./spain.mp4" type="video/mp4" />
        </video>
        <nav>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/bartoszlegiec/"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            target="_blank"
            href="https://twitter.com/bibix1999"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a target="_blank" href="https://github.com/bibixx" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a target="_blank" href="https://codepen.io/bibixx" rel="noreferrer">
            <i className="fab fa-codepen"></i>
          </a>
          <a target="_blank" href="http://m.me/bartek.legiec" rel="noreferrer">
            <i className="fab fa-facebook-messenger"></i>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Home;
