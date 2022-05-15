import AirtableError from 'airtable/lib/airtable_error';
import { getAirtableBase } from './getAirtableBase';
import { sanitizeSlug } from './sanitizeSlug';

export const getLinkRow = async (slug: string) => {
  try {
    const links = getAirtableBase();
    const sanitizedSlug = sanitizeSlug(slug);

    if (sanitizedSlug === '') {
      return undefined;
    }

    const [airtableRow] = await links
      .select({
        filterByFormula: `{SLUG} = '${sanitizedSlug}'`,
        maxRecords: 1,
      })
      .firstPage();

    return airtableRow;
  } catch (error) {
    if (error instanceof AirtableError && error.error === 'NOT_FOUND') {
      return undefined;
    }

    throw error;
  }
};
