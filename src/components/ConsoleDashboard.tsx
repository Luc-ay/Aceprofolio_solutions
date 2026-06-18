import { motion } from 'motion/react';
import { 
  X, 
  Terminal, 
  BookOpen, 
  Brain, 
  Briefcase, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Layers,
  FileText,
  Bookmark,
  Share2
} from 'lucide-react';
import { EnrolledCourse, MentorshipRequest, HireRequest } from '../types';
import { COURSES } from '../data';
import { useState } from 'react';

interface ConsoleDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourses: EnrolledCourse[];
  mentorshipRequests: MentorshipRequest[];
  hireRequests: HireRequest[];
  onTriggerToast: (message: string, type: 'success' | 'info') => void;
}

export default function ConsoleDashboard({
  isOpen,
  onClose,
  enrolledCourses,
  mentorshipRequests,
  hireRequests,
  onTriggerToast,
}: ConsoleDashboardProps) {
  const [activeTab, setActiveTab] = useState<'learning' | 'mentors' | 'hiring'>('learning');
  const [certCourseId, setCertCourseId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleShareCert = (title: string) => {
    onTriggerToast(`Copied sharable credential hash for "${title}" to clipboard!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/40 backdrop-blur-md"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-surface-container-lowest text-primary w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 md:p-8 z-10 border border-outline-variant/20 flex flex-col"
        id="dashboard-container-modal"
      >
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-primary"
          aria-label="Close dashboard console"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/10">
          <div className="w-10 h-10 rounded-lg bg-[#007aff]/10 text-accent flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#768dad] uppercase block">
              Aceprofolio Workstation
            </span>
            <h3 className="font-sans text-xl font-extrabold text-primary">
              My Activities & Match Tracker
            </h3>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-outline-variant/10 mb-6 pb-0.5">
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2.5 text-xs font-semibold select-none cursor-pointer border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'learning'
                ? 'border-accent text-accent'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <BookOpen size={14} />
            My Enrolled Classes ({enrolledCourses.length})
          </button>
          
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-4 py-2.5 text-xs font-semibold select-none cursor-pointer border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'mentors'
                ? 'border-accent text-accent'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <Brain size={14} />
            Mentorship Submissions ({mentorshipRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('hiring')}
            className={`px-4 py-2.5 text-xs font-semibold select-none cursor-pointer border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'hiring'
                ? 'border-accent text-accent'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <Briefcase size={14} />
            Contract Projects ({hireRequests.length})
          </button>
        </div>

        {/* Window Content */}
        <div className="overflow-y-auto flex-grow max-h-[460px] pr-1 space-y-4 text-on-surface">
          {activeTab === 'learning' && (
            <div className="space-y-4">
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-14 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/10">
                  <BookOpen className="mx-auto text-secondary/35 mb-3" size={36} />
                  <p className="text-sm font-semibold text-primary">No active class registrations found.</p>
                  <p className="text-xs text-[#768dad] mt-1 max-w-sm mx-auto">
                    Accelerate your trajectory! Search courses in our learning path grid below and click Study.
                  </p>
                </div>
              ) : (
                enrolledCourses.map((ec) => {
                  const course = COURSES.find(c => c.id === ec.courseId);
                  if (!course) return null;
                  const isFinished = ec.progress === 100;

                  return (
                    <div 
                      key={ec.courseId}
                      className="p-5 rounded-lg bg-surface-container-low border border-outline-variant/10"
                    >
                      <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-accent/10 text-accent px-2 py-0.5 rounded font-bold">
                            {course.badge}
                          </span>
                          <h4 className="font-sans text-base font-bold text-primary mt-1">
                            {course.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-secondary">
                          Joined: {ec.enrolledAt}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-mono text-secondary mb-1">
                          <span>Progress Rate</span>
                          <span className="font-bold text-accent">{ec.progress}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-accent h-full transition-all duration-500"
                            style={{ width: `${ec.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-outline-variant/10">
                        <span className="text-xs font-mono text-secondary">
                          {ec.completedLessons.length} checkpoints validation passed.
                        </span>

                        <div className="flex gap-2">
                          {isFinished ? (
                            <button
                              onClick={() => setCertCourseId(course.id)}
                              className="px-3.5 py-1.5 bg-[#009b4d] text-white rounded text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Award size={13} />
                              Print Credential
                            </button>
                          ) : (
                            <span className="text-xs text-secondary-container font-medium italic">
                              Complete quiz validation for Cert
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'mentors' && (
            <div className="space-y-4">
              {mentorshipRequests.length === 0 ? (
                <div className="text-center py-14 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/10">
                  <Brain className="mx-auto text-secondary/35 mb-3" size={36} />
                  <p className="text-sm font-semibold text-primary">No active mentorship profiles.</p>
                  <p className="text-xs text-[#768dad] mt-1 max-w-sm mx-auto">
                    Submit the "Meet a Mentor" criteria sheet to isolate appropriate Netflix/Spotify compatible guides.
                  </p>
                </div>
              ) : (
                mentorshipRequests.map((req) => (
                  <div 
                    key={req.id}
                    className="p-5 rounded-lg bg-surface-container-low border border-outline-variant/10"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
                      <div>
                        <h4 className="font-sans font-bold text-primary text-base">
                          {req.fullName}
                        </h4>
                        <p className="text-xs text-secondary-container">{req.email}</p>
                      </div>
                      <span className="text-xs font-mono text-[#009b4d] bg-[#e3fcf0] px-2.5 py-0.5 rounded font-bold">
                        Matching Active
                      </span>
                    </div>

                    <div className="space-y-2 mt-4 text-xs text-secondary">
                      <div>
                        <span className="font-semibold text-primary">Target Skills:</span> {req.skills || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-semibold text-primary">Objectives:</span> {req.objectives}
                      </div>
                      <div className="text-[10px] font-mono text-[#768dad] pt-1">
                        Application Key: {req.id} • Registered: {req.submittedAt}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'hiring' && (
            <div className="space-y-4">
              {hireRequests.length === 0 ? (
                <div className="text-center py-14 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/10">
                  <Briefcase className="mx-auto text-secondary/35 mb-3" size={36} />
                  <p className="text-sm font-semibold text-primary">No project inquiries posted.</p>
                  <p className="text-xs text-[#768dad] mt-1 max-w-sm mx-auto">
                    Activate the "Hire a Professional" directory to secure certified tech developers for custom build cycles.
                  </p>
                </div>
              ) : (
                hireRequests.map((req) => (
                  <div 
                    key={req.id}
                    className="p-5 rounded-lg bg-surface-container-low border border-outline-variant/10"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
                      <div>
                        <h4 className="font-sans font-bold text-primary text-base">
                          {req.companyName}
                        </h4>
                        <p className="text-xs text-secondary">{req.email}</p>
                      </div>
                      <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded font-bold">
                        {req.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 mt-3 text-xs text-secondary">
                      <div>
                        <span className="font-semibold text-primary">Budget Assigned:</span> {req.budget}
                      </div>
                      <p className="text-xs leading-relaxed italic text-secondary-container mt-2">
                        "{req.details}"
                      </p>
                      <div className="text-[10px] font-mono text-[#768dad] pt-2">
                        Ticket UUID: {req.id} • Registered: {req.submittedAt}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Certificate Rendering Area on top */}
        {certCourseId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md">
            <div className="bg-white text-[#111] p-8 md:p-12 rounded-xl shadow-2xl border-8 border-double border-accent/20 max-w-2xl w-full text-center relative">
              <button 
                onClick={() => setCertCourseId(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#444] cursor-pointer"
                aria-label="Close cert modal"
              >
                <X size={18} />
              </button>

              <Award size={64} className="mx-auto text-[#007aff] mb-6 animate-bounce" />
              
              <span className="text-xs font-mono tracking-widest text-[#768dad] uppercase block mb-3 font-bold">
                COMMUNITY CERTIFICATION OF ACCOMPLISHMENT
              </span>

              <h4 className="font-sans text-3xl font-extrabold text-[#000f22] tracking-tight leading-tight mb-2">
                TechHub Professional Credential
              </h4>
              
              <div className="w-16 h-0.5 bg-[#007aff] mx-auto my-4" />

              <p className="text-xs font-mono text-[#768dad]">This certificate is generated to confirm that</p>
              <p className="text-lg font-bold text-primary my-3 uppercase tracking-wide">
                Authorized Engineering Learner
              </p>
              
              <p className="text-xs font-mono text-[#768dad] max-w-md mx-auto leading-relaxed">
                has successfully passed all system validation checkpoints and completed the rigorous requirements for
              </p>

              <h5 className="text-xl font-extrabold text-[#000f22] my-4 uppercase tracking-tight">
                {COURSES.find(c => c.id === certCourseId)?.title}
              </h5>

              <div className="mt-8 pt-6 border-t border-[#eee] flex justify-between items-center text-left">
                <div>
                  <span className="text-[9px] font-mono text-[#768dad] block leading-none">VALIDATION ENGINE ID</span>
                  <span className="text-[11px] font-mono font-bold text-primary block mt-1">CS-{certCourseId?.toUpperCase()}-2026</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#768dad] block leading-none">ISSUANCE DATE</span>
                  <span className="text-[11px] font-mono font-bold text-primary block mt-1">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2 justify-center">
                <button
                  onClick={() => setIsFinishedPrint()}
                  className="px-5 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  Confirm Offline Print
                </button>
                <button
                  onClick={() => handleShareCert(COURSES.find(c => c.id === certCourseId)?.title || '')}
                  className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0066d6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 size={13} />
                  Share Signature Hash
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  function setIsFinishedPrint() {
    onTriggerToast('Sending PDF payload metadata to standard system print queues...', 'info');
    window.print();
  }
}
