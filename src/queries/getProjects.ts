// queries/getProjects.ts
import { getProjects as getProjectsData } from '../services/dataService';
import { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  const data = await getProjectsData();
  return data;
}
