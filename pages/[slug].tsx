import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import MatomoTracker from 'matomo-tracker';
import { MATOMO_URL, MATOMO_SITE_ID, MATOMO_TOKEN } from 'constants/env';
import { getLinkRow } from 'utils/getAirtableRow';

const Slug: NextPage = () => null;
export default Slug;

type Params = {
  slug: string;
};

type GetServerSideReturnValue = GetServerSidePropsResult<{}>;
const respondWithMatomo = (
  options: GetServerSideReturnValue,
  req: GetServerSidePropsContext['req'],
  resolvedUrl: string,
): GetServerSideReturnValue => {
  const matomo = new MatomoTracker(
    MATOMO_SITE_ID,
    `https:${MATOMO_URL}matomo.php`,
  );

  const domain = req.headers['x-vercel-deployment-url'];
  const protocol = req.headers['x-forwarded-proto'];
  const url = `${protocol}://${domain}${resolvedUrl}`;

  const trackOptions = {
    url,
    ua: req.headers['user-agent'],
    lang: req.headers['accept-language'],
    cip: req.headers['x-real-ip'],
    urlref: req.headers['referer'],
    token_auth: MATOMO_TOKEN,
    cvar: JSON.stringify({
      notFound: (options as any).notFound === true,
      redirectTo: (options as any).redirect?.destination,
    }),
  };

  matomo.track(trackOptions);

  return options;
};

export const getServerSideProps: GetServerSideProps<{}, Params> = async ({
  params,
  resolvedUrl,
  req,
}) => {
  const slug = params?.slug;

  if (!slug) {
    return respondWithMatomo(
      {
        notFound: true,
      },
      req,
      resolvedUrl,
    );
  }

  const airtableRow = await getLinkRow(slug);

  if (!airtableRow || !airtableRow.fields.active) {
    return respondWithMatomo(
      {
        notFound: true,
      },
      req,
      resolvedUrl,
    );
  }

  return respondWithMatomo(
    {
      redirect: {
        destination: airtableRow.fields.url,
        permanent: true,
      },
    },
    req,
    resolvedUrl,
  );
};
