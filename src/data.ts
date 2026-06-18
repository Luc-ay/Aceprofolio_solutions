import { Course, Mentor, Professional } from './types';

export const COURSES: Course[] = [
  {
    id: 'fullstack-web',
    title: 'Fullstack Web Development',
    description: 'Master modern frameworks, deployment pipelines, and scalable backend architectures.',
    category: 'Course',
    iconName: 'code',
    badge: 'Course',
    actionIcon: 'open_in_new',
    duration: '12 weeks',
    details: [
      'React & Next.js deep-dive with state management',
      'Scalable server structures in Node.js & Express',
      'Database modeling (PostgreSQL / Prisma / Redis)',
      'CI/CD, Docker containerization & Cloud Run deployments',
      'Advanced Security: OAuth2, CORS, JWT, rate-limiting'
    ],
    modules: [
      'Module 1: Modern Frontend Architecture & State Solutions',
      'Module 2: Serverless Frameworks & Scalable Backend Services',
      'Module 3: Database Optimization, Indexes & Transactions',
      'Module 4: Deployment, Containers & Server-side Security'
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Fundamentals',
    description: 'Systematic approach to visual hierarchy, component systems, and user research protocols.',
    category: 'Course',
    iconName: 'draw',
    badge: 'Course',
    actionIcon: 'open_in_new',
    duration: '8 weeks',
    details: [
      'Design psychology, layouts, and grid structures',
      'Building cohesive components & fully tokenized design systems',
      'High-fidelity interactive prototyping in Figma',
      'A/B testing, user journey framing, and feedback audits',
      'Designing for accessibility (WCAG compliance, dark/light contrast)'
    ],
    modules: [
      'Module 1: UX Fundamentals, Wireframing & Information Ecology',
      'Module 2: Typography, Color Theory & Visual Hierarchy',
      'Module 3: Advanced Figma Tokens & Component Library Systems',
      'Module 4: Design Validation, Usability Audits & Hand-off Plans'
    ]
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    description: 'Leverage automation and analytical models to drive data-centric decisions.',
    category: 'Course',
    iconName: 'database',
    badge: 'Course',
    actionIcon: 'open_in_new',
    duration: '10 weeks',
    details: [
      'Scientific computing with NumPy, Pandas, and Matplotlib',
      'Statistical modeling, hypothesis testing, and regressions',
      'Machine learning pipelines using Scikit-Learn',
      'Feature engineering and production deployment of models',
      'AI prompt customization & predictive analysis workflows'
    ],
    modules: [
      'Module 1: Wrangling Complex Datasets with Pandas',
      'Module 2: Statistical Inference and Exploratory Data Analysis',
      'Module 3: Machine Learning Pipelines and Feature Engineering',
      'Module 4: Productionalizing Models & API Wrappers'
    ]
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture Guide (PDF)',
    description: 'Critical documentation for orchestrating resilient and secure infrastructure at scale.',
    category: 'E-Book',
    iconName: 'cloud',
    badge: 'E-Book',
    actionIcon: 'download',
    duration: '240 Pages E-Book',
    details: [
      'Multi-region high availability setup blueprint',
      'Infrastructure as Code (Terraform / CloudFormation)',
      'Zero-Trust networking configurations',
      'Cost-optimization & container orchestrations (Kubernetes)',
      'Real-world disaster recovery case studies'
    ],
    modules: [
      'Section 1: global routing & CDN strategies',
      'Section 2: microservices orchestration configurations',
      'Section 3: fine-grained IAM & zero-trust boundaries',
      'Section 4: cost-performance curve calculations'
    ]
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

export const TELEGRAM_LINK = 'https://t.me/techhub_community_placeholder';
