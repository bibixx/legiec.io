import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import init from '@socialgouv/matomo-next';

import { MATOMO_URL, MATOMO_SITE_ID } from 'constants/env';

import './global.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
