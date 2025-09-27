// queries/getWorkPermit.ts
import { getWorkPermit as getWorkPermitData } from '../services/dataService';
import { WorkPermit } from '../types';

export async function getWorkPermit(): Promise<WorkPermit> {
  const data = await getWorkPermitData();
  return data;
}
