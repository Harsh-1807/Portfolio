// queries/getCertifications.ts
import { getCertifications as getCertificationsData } from '../services/dataService';
import { Certification } from '../types';

export async function getCertifications(): Promise<Certification[]> {
  const data = await getCertificationsData();
  return data;
}
