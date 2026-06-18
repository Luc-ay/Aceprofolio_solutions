import { Course, Mentor, Professional } from './types';

export const COURSES: Course[] = [
  {
    id: 'pro-copywriting',
    title: 'Be a Pro Copywriting',
    description: 'Master the high-income skill of premium persuasive writing, copy architectures, and consumer narrative hooks.',
    category: 'Course',
    iconName: 'code',
    badge: 'Copywriting',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/1qmUVytHqzXqq2LzcksMJbX9qiU6cyicr?usp=drive_link'
  },
  {
    id: 'pro-degen',
    title: 'Be a Pro DEGEN',
    description: 'Accelerate your understanding of decentralized networks, web3 economics, and community crypto ecosystem tracking.',
    category: 'Course',
    iconName: 'database',
    badge: 'Crypto DEGEN',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/1WWK44AzCdKQMNArU2mIy3HWjraQ58k7c?usp=drive_link'
  },
  {
    id: 'ebook-monetization',
    title: 'Be a Pro EBOOK Monetization',
    description: 'A comprehensive playbook detailing how to architect, promote, and monetize premium digital publications successfully.',
    category: 'E-Book',
    iconName: 'cloud',
    badge: 'Monetization Guide',
    actionIcon: 'download',
    link: 'https://drive.google.com/drive/folders/19bf1YbTy21PDXea9MFaR58LTwcg5av-4?usp=drive_link'
  },
  {
    id: 'pro-linkedin',
    title: 'Be a Pro LinkedIn',
    description: 'Step-by-step branding handbook to optimization of your profile, executive reach, and inbound lead generation standard.',
    category: 'Course',
    iconName: 'draw',
    badge: 'LinkedIn Branding',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/1v1ENn6jiU856DTUlrdX9uqWClmA4gcr6?usp=drive_link'
  },
  {
    id: 'video-editing-capcut',
    title: 'Be a Pro Video Editing (CAPCUT)',
    description: 'Master high-performance editing protocols, modern framing, retention-based pacing, and sound design using CapCut.',
    category: 'Course',
    iconName: 'draw',
    badge: 'CapCut Video',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/1Bq6yE1Fa6Tyqt7aMbh9fCTvIUYZwUGDY?usp=drive_link'
  },
  {
    id: 'whatsapp-automation',
    title: 'Be a Pro Whatsapp Automation',
    description: 'Set up advanced serverless chat responder loops, CRM integrations, broadcast matrices, and seamless pipeline routing.',
    category: 'Course',
    iconName: 'code',
    badge: 'WhatsApp CRM',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/1DRAuMeGTsRNv3yLeqcMLotFHadYZcbYJ?usp=drive_link'
  },
  {
    id: 'excel-class',
    title: 'Excel Class (Jerry X Digital Witch)',
    description: 'Unlock enterprise-grade financial modeling, complex data pivots, dashboards, VLOOKUPS, and programmatic formulas.',
    category: 'Course',
    iconName: 'database',
    badge: 'Excel Modeling',
    actionIcon: 'open_in_new',
    link: 'https://drive.google.com/drive/folders/12B5B8AEFTzwKIRWINYlsqs2Sx_ww3ZIY?usp=drive_link'
  },
  {
    id: 'lead-generation-secrets',
    title: 'Lead Generation Secrets',
    description: 'The classified handbook covering organic scrapers, premium cold email frameworks, and direct B2B lead conversion channels.',
    category: 'E-Book',
    iconName: 'cloud',
    badge: 'Lead Secrets E-Book',
    actionIcon: 'download',
    link: 'https://drive.google.com/file/d/1Vcklm5rrAZ_yJRrYUmUvOMZi09qaH8Jr/view?usp=drive_link'
  }
];

export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Connor',
    title: 'Staff Software Engineer',
    company: 'Netflix',
    bio: 'Ex-Google. Architected stream rendering systems. Passionate about system performance, React internals, and distributed databases.',
    skills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9,
    completedSessions: 342
  },
  {
    id: 'm2',
    name: 'Alex Rivera',
    title: 'Principal Product Designer',
    company: 'Airbnb',
    bio: 'Focused on developer-centric design systems and fluid micro-interactions. Champion of accessible interfaces and design systems.',
    skills: ['Figma', 'UI/UX Design', 'Design Tokens', 'Design Systems', 'Prototyping'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    completedSessions: 219
  },
  {
    id: 'm3',
    name: 'Elena Rostova',
    title: 'Lead Data Scientist',
    company: 'Spotify',
    bio: 'Specialist in recommending system algorithms, deep learning for pattern analysis, and big-data streaming tools.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow', 'SQL'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    completedSessions: 410
  },
  {
    id: 'm4',
    name: 'Chen Wei',
    title: 'Senior Cloud Architect',
    company: 'Google Cloud Corp',
    bio: 'Secures and scales regional clusters handling tens of millions of active connections. Advocate for Zero-Trust and Terraform.',
    skills: ['Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Security', 'Go'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9,
    completedSessions: 184
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Marcus Aurelius',
    role: 'Lead Fullstack Go & React Developer',
    company: 'Independent Contractor',
    experience: '8+ Years',
    bio: 'Specializes in high-frequency event streaming, solid React dashboards, and high-performance Go backends.',
    skills: ['Go', 'React', 'TypeScript', 'Docker', 'WebSockets', 'GraphQL'],
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    hourlyRate: '$120 - $150',
    availability: 'Available'
  },
  {
    id: 'p2',
    name: 'Sophia Loren',
    role: 'Senior UI/UX & Design System Architect',
    experience: '6+ Years',
    bio: 'Designs unified components, clean layout metrics, and fully responsive fluid grids. Focuses on premium brand expressions.',
    skills: ['Visual Design', 'Figma', 'CSS/Tailwind', 'Design Tokens', 'Storybook'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    hourlyRate: '$95 - $120',
    availability: 'Available'
  },
  {
    id: 'p3',
    name: 'Liam Patel',
    role: 'Cloud Native DevOps & Security Specialist',
    company: 'Kubex Systems',
    experience: '7 Years',
    bio: 'Hardens Kubernetes ingress security, drafts infrastructure-as-code scripts, and deploys high-availability networks.',
    skills: ['Kubernetes', 'Terraform', 'AWS/GCP', 'Linux Shell', 'IAM Security'],
    imageUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=200&h=200',
    hourlyRate: '$130 - $160',
    availability: 'Busy'
  },
  {
    id: 'p4',
    name: 'Priya Mehta',
    role: 'AI Model Integration Engineer',
    experience: '5 Years',
    bio: 'Bridges deep ML pipelines with accessible web interfaces. Expert in LLMs, Gemini vector search, and data pipeline orchestration.',
    skills: ['Python', 'FastAPI', 'Gemini API', 'Scikit-Learn', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    hourlyRate: '$110 - $140',
    availability: 'Available'
  }
];

export const TELEGRAM_LINK = 'https://t.me/AceProfolio';
