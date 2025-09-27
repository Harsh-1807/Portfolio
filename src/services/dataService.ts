import portfolioData from '../data/portfolioData.json';
import { 
  ProfileBanner, 
  ContactMe, 
  Project, 
  Skill, 
  Certification, 
  TimelineItem, 
  WorkPermit,
  VideoGame
} from '../types';

// Simulate async behavior to match the original API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProfileBanner = async (): Promise<ProfileBanner> => {
  await delay(100); // Simulate network delay
  return portfolioData.profileBanner;
};

export const getContactMe = async (): Promise<ContactMe> => {
  await delay(100);
  return portfolioData.contactMe;
};

export const getProjects = async (): Promise<Project[]> => {
  await delay(100);
  return portfolioData.projects;
};

export const getSkills = async (): Promise<Skill[]> => {
  await delay(100);
  return portfolioData.skills;
};

export const getCertifications = async (): Promise<Certification[]> => {
  await delay(100);
  return portfolioData.certifications;
};

export const getTimeline = async (): Promise<TimelineItem[]> => {
  await delay(100);
  return portfolioData.timeline.map(item => ({
    ...item,
    timelineType: item.timelineType as 'work' | 'education'
  }));
};

export const getWorkPermit = async (): Promise<WorkPermit> => {
  await delay(100);
  return {
    ...portfolioData.workPermit,
    expiryDate: new Date(portfolioData.workPermit.expiryDate)
  };
};

export const getVideoGames = async (): Promise<VideoGame[]> => {
  await delay(100);
  return portfolioData.videoGames;
};
