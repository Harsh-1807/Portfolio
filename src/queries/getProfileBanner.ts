// queries/getProfileBanner.ts
import { getProfileBanner as getProfileBannerData } from '../services/dataService';
import { ProfileBanner } from '../types';

export async function getProfileBanner(): Promise<ProfileBanner> {
  const data = await getProfileBannerData();
  console.log("🚀 ~ getProfileBanner ~ data:", data);
  return data;
}
