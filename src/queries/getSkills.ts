// queries/getSkills.ts
import { getSkills as getSkillsData } from '../services/dataService';
import { Skill } from '../types';

export async function getSkills(): Promise<Skill[]> {
  const data = await getSkillsData();
  return data;
}
