// queries/getContactMe.ts
import { getContactMe as getContactMeData } from '../services/dataService';
import { ContactMe } from '../types';

export async function getContactMe(): Promise<ContactMe> {
  const data = await getContactMeData();
  return data;
}
