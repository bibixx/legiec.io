import type { GetServerSideProps, NextPage } from 'next';
import { getLinkRow } from 'utils/getAirtableRow';

const Slug: NextPage = () => null;
export default Slug;

type Params = {
  slug: string;
};

export const getServerSideProps: GetServerSideProps<{}, Params> = async (
  context,
) => {
  const slug = context.params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const airtableRow = await getLinkRow(slug);

  if (!airtableRow || !airtableRow.fields.active) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: airtableRow.fields.url,
      permanent: true,
    },
    props: {},
  };
};
