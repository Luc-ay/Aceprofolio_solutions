import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  ArrowRight, 
  Brain, 
  Briefcase, 
  Laptop, 
  Sparkles, 
  Heart,
  ExternalLink,
  MessageCircle,
  Bell,
  CheckCircle2,
  Info
} from 'lucide-react';

import { EnrolledCourse, MentorshipRequest, HireRequest } from './types';
import { TELEGRAM_LINK, COURSES } from './data';

import TopAppBar from './components/TopAppBar';
import LearnSection from './components/LearnSection';
import MentorModal from './components/MentorModal';
import HireModal from './components/HireModal';
import ConsoleDashboard from './components/ConsoleDashboard';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

export default function App() {
  // Persistence Loading Safeties
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(() => {
    try {
      const saved = localStorage.getItem('th_enrolled_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(() => {
    try {
      const saved = localStorage.getItem('th_mentorship_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [hireRequests, setHireRequests] = useState<HireRequest[]>(() => {
    try {
      const saved = localStorage.getItem('th_hire_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal Toggles
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  
  // Custom Toast Notifier State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Navigation Active State tracker
  const [activeSection, setActiveSection] = useState('join');

  // Triggering visual toasts
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('th_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('th_mentorship_requests', JSON.stringify(mentorshipRequests));
  }, [mentorshipRequests]);

  useEffect(() => {
    localStorage.setItem('th_hire_requests', JSON.stringify(hireRequests));
  }, [hireRequests]);

  // Section Tracking on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['join', 'learn', 'engagement-triggers'];
      const scrollPos = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleEnroll = (courseId: string) => {
    // avoid double registration
    if (enrolledCourses.some((c) => c.courseId === courseId)) return;

    const newEnrollment: EnrolledCourse = {
      courseId,
      progress: 0,
      completedLessons: [],
      enrolledAt: new Date().toLocaleDateString()
    };
    setEnrolledCourses((prev) => [...prev, newEnrollment]);
  };

  const handleUpdateProgress = (courseId: string, progress: number, completedLessons: string[]) => {
    setEnrolledCourses((prev) =>
      prev.map((c) => (c.courseId === courseId ? { ...c, progress, completedLessons } : c))
    );
  };

  const handleAddMentorRequest = (req: MentorshipRequest) => {
    setMentorshipRequests((prev) => [req, ...prev]);
  };

  const handleAddHireRequest = (req: HireRequest) => {
    setHireRequests((prev) => [req, ...prev]);
  };

  const handleJoinTelegram = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerToast('Redirecting to Aceprofolio Telegram community... Welcome to the circle of elite specialists!', 'success');
    setTimeout(() => {
      window.open(TELEGRAM_LINK, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <div className="bg-surface font-sans text-on-surface select-text min-h-screen flex flex-col selection:bg-accent/20 selection:text-primary">
      
      {/* Top sticky head navigation */}
      <TopAppBar 
        onOpenMentor={() => setIsMentorOpen(true)}
        onOpenHire={() => setIsHireOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section 
          className="relative overflow-hidden min-h-[calc(100vh-76px)] flex flex-col items-center justify-center text-center px-4 py-8 md:py-12" 
          id="join"
        >
          {/* Subtle background decoration workspace & tech grids */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" 
              alt="Elite Tech Workspace" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            {/* Smooth linear gradient masks to melt the photo into surrounding background */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/75 to-surface"></div>
            {/* Subtle blue network dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#007aff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08]"></div>
          </div>

          <div className="max-w-4xl mx-auto z-10 relative">
            {/* Dynamic visual tag */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs text-accent font-semibold uppercase tracking-widest leading-none">
                Global Tech Hub
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight mb-6"
            >
              Welcome to the Tech Hub
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Learn free classes (vetted courses & PDF guides), connect directly with staff engineering mentors, or hire premium veteed contractors at Aceprofolio Solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                onClick={handleJoinTelegram}
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-semibold shadow-[0_4px_20px_rgba(3,122,255,0.22)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer text-sm w-full sm:w-auto"
                id="hero-join-telegram-btn"
              >
                Join the Hub (Telegram)
                <Send size={15} className="stroke-[2.5]" />
              </a>

              <a
                href="#learn"
                className="inline-flex items-center justify-center gap-1.5 border border-outline-variant/30 hover:bg-surface-container-low text-[#0a2540] px-7 py-4 rounded-xl font-semibold transition-all cursor-pointer text-sm w-full sm:w-auto"
              >
                Learn Free Classes
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* LEARN CURRICULUM GRID */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <LearnSection 
            enrolledCourses={enrolledCourses}
            onEnroll={handleEnroll}
            onUpdateProgress={handleUpdateProgress}
            onTriggerToast={triggerToast}
          />
        </motion.div>

        {/* INTERACTIVE ENGAGEMENT CALLS SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="py-24 max-w-7xl mx-auto px-6 lg:px-12" 
          id="engagement-triggers"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mentor Booking Trigger Hero Card */}
            <motion.div 
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setIsMentorOpen(true)}
              className="flex flex-col items-start text-left bg-surface-container-highest p-8 md:p-12 rounded-2xl border border-outline-variant/10 cursor-pointer group hover:border-[#3c88ff]/30 transition-all relative overflow-hidden" 
              id="mentor-trigger-card"
            >
              {/* Blur accent glow */}
              <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-accent/5 filter blur-3xl pointer-events-none"></div>

              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Brain size={28} className="stroke-[2.2]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                Meet a Mentor
              </h3>
              
              <p className="text-sm md:text-base text-secondary mb-8 leading-relaxed max-w-md">
                Connect with veterans who have built what you're building. Structured guidance for ambitious learners.
              </p>
              
              <div className="mt-auto inline-flex items-center gap-2 text-accent font-bold text-sm tracking-wide group-hover:underline">
                Get Started 
                <ArrowRight size={15} />
              </div>
            </motion.div>

            {/* Contractor Procurement Trigger Hero Card */}
            <motion.div 
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setIsHireOpen(true)}
              className="flex flex-col items-start text-left bg-[#021324] text-white p-8 md:p-12 rounded-2xl border border-outline-variant/5 cursor-pointer group hover:border-[#3c88ff]/30 transition-all relative overflow-hidden"
              id="hire-trigger-card"
            >
              {/* Blur accent glow */}
              <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-accent/10 filter blur-3xl pointer-events-none"></div>

              <div className="w-14 h-14 rounded-xl bg-[#007aff]/20 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Briefcase size={28} className="stroke-[2.2]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Hire a Professional
              </h3>
              
              <p className="text-sm md:text-base text-[#768dad] mb-8 leading-relaxed max-w-md">
                Access our vetted directory of top-tier talent for your next critical mission. Precision engineering on demand.
              </p>
              
              <div className="mt-auto inline-flex items-center gap-2 text-on-tertiary-container font-bold text-sm tracking-wide group-hover:underline">
                Find Talent 
                <ArrowRight size={15} />
              </div>
            </motion.div>

          </div>
        </motion.section>



      </main>

      {/* FOOTER */}
      <footer className="w-full py-12 bg-surface-container-lowest border-t border-outline-variant/15 text-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Footer Logo */}
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/logo.svg" 
              alt="Aceprofolio Solutions" 
              className="w-9 h-9 rounded shadow-sm border border-outline-variant/20" 
            />
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="font-sans text-[11px] font-extrabold text-primary tracking-tight block animate-fade-in">
                Aceprofolio
              </span>
              <span className="font-sans text-[11px] font-extrabold text-accent tracking-tight block mt-0.5 animate-fade-in">
                Solutions
              </span>
            </div>
          </div>

          {/* Quick link actions */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href="#join" className="text-xs text-secondary hover:text-accent font-medium transition-colors">Join</a>
            <a href="#learn" className="text-xs text-secondary hover:text-accent font-medium transition-colors">Learn</a>
            <button onClick={() => setIsMentorOpen(true)} className="text-xs text-secondary hover:text-accent font-medium transition-colors cursor-pointer">Mentor</button>
            <button onClick={() => setIsHireOpen(true)} className="text-xs text-secondary hover:text-accent font-medium transition-colors cursor-pointer">Hire</button>
            <button onClick={() => triggerToast('Privacy Policy registered under standard Aceprofolio Solutions parameters.', 'info')} className="text-xs text-secondary hover:text-accent font-medium transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => triggerToast('Terms of Service regulated under systematic tech licensing guides.', 'info')} className="text-xs text-secondary hover:text-accent font-medium transition-colors cursor-pointer">Terms</button>
          </div>

          <p className="text-xs text-secondary text-center md:text-right">
            © {new Date().getFullYear()} Aceprofolio Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* DYNAMIC BACKDROP MODALS CONTAINER */}
      <AnimatePresence>
        {isMentorOpen && (
          <MentorModal 
            isOpen={isMentorOpen}
            onClose={() => setIsMentorOpen(false)}
            onAddRequest={handleAddMentorRequest}
            onTriggerToast={triggerToast}
          />
        )}

        {isHireOpen && (
          <HireModal 
            isOpen={isHireOpen}
            onClose={() => setIsHireOpen(false)}
            onAddRequest={handleAddHireRequest}
            onTriggerToast={triggerToast}
          />
        )}

        {isDashboardOpen && (
          <ConsoleDashboard 
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
            enrolledCourses={enrolledCourses}
            mentorshipRequests={mentorshipRequests}
            hireRequests={hireRequests}
            onTriggerToast={triggerToast}
          />
        )}
      </AnimatePresence>

      {/* VISUAL RECTACTIVE FLOATING TOAST NOTIFIER BOX */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="p-4 rounded-xl shadow-xl flex gap-3 items-start bg-white text-[#111] border border-outline-variant/20 pointer-events-auto"
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' ? (
                  <CheckCircle2 size={16} className="text-[#009b4d]" />
                ) : (
                  <Info size={16} className="text-[#007aff]" />
                )}
              </div>
              <div className="flex-grow">
                <p className="text-xs text-left leading-relaxed font-medium">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
