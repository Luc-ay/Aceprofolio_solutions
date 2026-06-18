export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'E-Book';
  iconName: 'code' | 'draw' | 'database' | 'cloud';
  badge: string;
  actionIcon: 'open_in_new' | 'download';
  details?: string[];
  duration?: string;
  modules?: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  skills: string[];
  imageUrl: string;
  rating: number;
  completedSessions: number;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  company?: string;
  experience: string;
  bio: string;
  skills: string[];
  imageUrl: string;
  hourlyRate: string;
  availability: 'Available' | 'Busy';
}

export interface MentorshipRequest {
  id: string;
  fullName: string;
  email: string;
  socials: string;
  skills: string;
  objectives: string;
  roleModels: string;
  submittedAt: string;
}

export interface HireRequest {
  id: string;
  companyName: string;
  email: string;
  details: string;
  budget: string;
  submittedAt: string;
  status: 'Received' | 'Reviewing' | 'Talent Matched';
}

export interface EnrolledCourse {
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: string;
}
