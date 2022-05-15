import Airtable from 'airtable';
import { UrlRow } from 'types/Airtable';
import { AIRTABLE_KEY, AIRTABLE_BASE } from 'constants/env';

export const getAirtableBase = () => {
  const airtableBase = new Airtable({ apiKey: AIRTABLE_KEY }).base(
    AIRTABLE_BASE,
  );
  const links = airtableBase<UrlRow>('Links');

  return links;
};
