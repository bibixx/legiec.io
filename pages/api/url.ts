import type { NextApiRequest, NextApiResponse } from 'next';
import { UrlRow } from 'types/Airtable';
import { basicAuthCheck } from 'utils/basicAuthCheck';
import { getAirtableBase } from 'utils/getAirtableBase';
import { getLinkRow } from 'utils/getAirtableRow';
import { getSlug } from 'utils/getSlug';
import { validateCreateUrl } from 'utils/validators/createUrl';
import { isValidSlug } from 'utils/validators/createUrl.utils';

export interface CreateUrlResponseDTO {
  URL: string;
  SLUG: string;
  ACTIVE: boolean;
  CREATED_AT: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await basicAuthCheck(req, res);

  if (req.method !== 'POST') {
    return res.status(404).send('');
  }

  const result = validateCreateUrl(req.body);

  if (!result.valid) {
    return res.status(422).json({ error: result.error });
  }

  const { data } = result;

  if (data.SLUG !== undefined && isValidSlug(data.SLUG)) {
    return res.status(422).json({ error: 'Specified SLUG is invalid' });
  }

  const airtableRow =
    data.SLUG === undefined ? undefined : await getLinkRow(data.SLUG);

  if (airtableRow !== undefined) {
    return res
      .status(422)
      .json({ error: 'Redirect with specified SLUG already exists' });
  }

  const links = getAirtableBase();

  const now = new Date();
  const newRowData: UrlRow = {
    url: data.URL,
    slug: data.SLUG !== undefined && data.SLUG !== '' ? data.SLUG : getSlug(),
    active: true,
    createdAt: now.toISOString(),
  };

  const [createdRow] = await links.create([
    {
      fields: newRowData,
    },
  ]);

  const responseData: CreateUrlResponseDTO = {
    URL: createdRow.fields.url,
    SLUG: createdRow.fields.slug,
    ACTIVE: createdRow.fields.active,
    CREATED_AT: createdRow.fields.createdAt,
  };

  res.status(200).json(responseData);
};

export default handler;
