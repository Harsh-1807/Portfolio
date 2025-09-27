// queries/getTimeline.ts
import { getTimeline as getTimelineData } from '../services/dataService';
import { TimelineItem } from '../types';

export async function getTimeline(): Promise<TimelineItem[]> {
  const data = await getTimelineData();
  return data;
}
