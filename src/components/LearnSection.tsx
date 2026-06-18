import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Palette, 
  Database, 
  Cloud, 
  ExternalLink, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  X, 
  Award, 
  ChevronRight, 
  Play, 
  FileText,
  Bookmark
} from 'lucide-react';
import { Course, EnrolledCourse } from '../types';
import { COURSES } from '../data';

interface LearnSectionProps {
  enrolledCourses: EnrolledCourse[];
  onEnroll: (courseId: string) => void;
  onUpdateProgress: (courseId: string, progress: number, completedLessons: string[]) => void;
  onTriggerToast: (message: string, type: 'success' | 'info') => void;
}

export default function LearnSection({
  enrolledCourses,
  onEnroll,
  onUpdateProgress,
  onTriggerToast,
}: LearnSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'ebooks'>('all');
  
  // Interactive simulator states
  const [simulatorCourse, setSimulatorCourse] = useState<Course | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredCourses = COURSES.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'courses') return course.category === 'Course';
    if (activeTab === 'ebooks') return course.category === 'E-Book';
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={24} className="text-accent" />;
      case 'draw':
        return <Palette size={24} className="text-accent" />;
      case 'database':
        return <Database size={24} className="text-accent" />;
      case 'cloud':
        return <Cloud size={24} className="text-accent" />;
      default:
        return <Code size={24} className="text-accent" />;
    }
  };

  // Mock quiz questions to make learning interactive and real
  const courseQuizzes: Record<string, { q: string; opts: string[]; correct: number; explanation: string }[]> = {
    'fullstack-web': [
      {
        q: 'Which React optimization is typically used to prevent unnecessary re-render of complex child nodes?',
        opts: ['React.memo()', 'useCallback()', 'useMemo()', 'useEffect()'],
        correct: 0,
        explanation: 'React.memo is a higher-order component that memoizes the rendered output of a functional component to bypass renders if props are identical.'
      },
      {
        q: 'What is the primary architectural purpose of a reverse proxy like NGINX in front of a Node.js API?',
        opts: ['Directing browser DOM updates', 'TLS termination, load balancing, and static file caching', 'Encrypting database indexed files', 'Compiling TypeScript code'],
        correct: 1,
        explanation: 'A reverse proxy manages external HTTPS queries, acts as a load distributor, caches content, and offloads heavy requests from the Node process.'
      }
    ],
    'ui-ux-design': [
      {
        q: 'In WCAG 2.1 contrast standards, what is the minimum required contrast ratio for small text under Level AA?',
        opts: ['3.0 : 1', '4.5 : 1', '7.0 : 1', '2.1 : 1'],
        correct: 1,
        explanation: 'Level AA requires a contrast ratio of at least 4.5:1 for normal-sized text to satisfy standard readability parameters.'
      },
      {
        q: 'What represents the core definition of "Design Tokens" within modern design systems?',
        opts: ['Encrypted blockchain symbols', 'Visual design guidelines stored in PDFs', 'Platform-agnostic key-value pairs representing design decisions (colors, spacing, etc.)', 'Interactive mouse cursors'],
        correct: 2,
        explanation: 'Design tokens are atomic design variables (e.g., color hexes, size measures) managed centrally and converted into platform-specific configurations.'
      }
    ],
    'python-data-science': [
      {
        q: 'Which Pandas library command is used to quickly query general descriptive stats (mean, min, max) of a DataFrame?',
        opts: ['df.info()', 'df.describe()', 'df.summary()', 'df.head()'],
        correct: 1,
        explanation: '`df.describe()` outputs statistical counts, means, standard deviations, quartiles, minimum, and maximum figures for numeric columns.'
      },
      {
        q: 'Why do data scientists prefer vectorization over standard nested Python loops when operating in NumPy?',
        opts: ['Vectorization compiles Python directly into HTML5', 'Numerical code is computed concurrently in optimized C subroutines without GIL blocks', 'Loops don\'t work in Jupyter environments', 'Loops require excessive memory pagination'],
        correct: 1,
        explanation: 'NumPy arrays execute calculations using vectorized formulas compiled in optimized C, vastly improving processing speed over standard python loops.'
      }
    ],
    'cloud-architecture': [
      {
        q: 'Which Infrastructure-as-code parameter guarantees that resources are deployed in an exact, deterministic order?',
        opts: ['state tracking', 'depends_on metadata', 'concurrency locking', 'resource pooling'],
        correct: 1,
        explanation: 'The `depends_on` flag in systems like Terraform explicitly sets operational dependencies so infrastructure sets up in order.'
      },
      {
        q: 'What does "Zero Trust" imply in network cluster design?',
        opts: ['Disable all firewalls for simplicity', 'Never assume internal service safety; continuously authenticate and authorize every interaction', 'Reject all incoming API payloads', 'Only rely on local non-web storage'],
        correct: 1,
        explanation: 'Zero Trust demands strict verification, access limits, and payload encryption for all entities, regardless of whether they exist inside or outside the network.'
      }
    ]
  };

  const currentQuizzes = simulatorCourse ? (courseQuizzes[simulatorCourse.id] || []) : [];

  const handleEnrollBtn = (course: Course) => {
    onEnroll(course.id);
    onTriggerToast(`Enrolled in "${course.title}" successfully! Check out your custom training console.`, 'success');
    setSimulatorCourse(course);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleDownloadEbook = (course: Course) => {
    onTriggerToast(`Downloading Guide: "${course.title}" - (240 Pages Masterclass Workbook).pdf`, 'success');
    // Simulated elegant virtual file download
    const element = document.createElement("a");
    const file = new Blob([
      `Thank you for downloading the ${course.title}!\n\nThis workbook consists of rigorous systems blueprints, production code patterns, and practical case studies for technical excellence.\n\nEnjoy learning!\n- TechHub Editorial Board © 2026`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${course.id}-techhub-guide.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!simulatorCourse) return;
    
    // Calculate final score
    let correctCount = 0;
    currentQuizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const completionRate = Math.round((correctCount / currentQuizzes.length) * 100);
    const completedLessonIds = currentQuizzes
      .filter((_, idx) => selectedAnswers[idx] === _.correct)
      .map((_, idx) => `lesson-${idx + 1}`);

    setQuizSubmitted(true);
    onUpdateProgress(simulatorCourse.id, completionRate, completedLessonIds);

    if (completionRate === 100) {
      onTriggerToast(`🏆 100% Score! You earned your Certification credentials in ${simulatorCourse.title}!`, 'success');
    } else {
      onTriggerToast(`Form processed! Score: ${completionRate}%. Review the questions below to hit 100%.`, 'info');
    }
  };

  const isEnrolled = (courseId: string) => enrolledCourses.some(e => e.courseId === courseId);
  const getEnrollment = (courseId: string) => enrolledCourses.find(e => e.courseId === courseId);

  return (
    <section className="py-24 bg-surface-container-low" id="learn">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">Accelerated Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Learn Free Classes
            </h2>
            <p className="text-secondary mt-3 max-w-xl text-base leading-relaxed">
              Accelerate your trajectory with industry-standard resources and structured learning paths curated for the modern stack.
            </p>
          </div>

          {/* Filtering Tabs & Action Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="flex bg-surface-container p-1 rounded-lg border border-outline-variant/10">
              {(['all', 'courses', 'ebooks'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {tab === 'all' ? 'All Classes' : tab}
                </button>
              ))}
            </div>
            
            <a 
              href="#join"
              onClick={() => onTriggerToast('Welcome! Read detailed documentation or check resources in the grid below.', 'info')}
              className="text-accent text-sm font-semibold flex items-center gap-1.5 hover:underline pl-1 cursor-pointer"
            >
              View all resources
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Classes & E-Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            const progressObj = getEnrollment(course.id);

            return (
              <div 
                key={course.id}
                className="glass-card p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden group border border-outline-variant/10 cursor-default"
                id={`course-card-${course.id}`}
              >
                {enrolled && (
                  <div className="absolute top-0 right-0 bg-accent/10 border-b border-l border-accent/20 px-2.5 py-1 text-[10px] font-mono text-accent font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    ACTIVE STUDY
                  </div>
                )}

                <div>
                  {/* Category symbol container */}
                  <div className="w-11 h-11 rounded-lg bg-surface-container-high/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {getIcon(course.iconName)}
                  </div>

                  <h3 className="font-sans text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-secondary mb-6 leading-relaxed min-h-[60px] line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/10">
                  {/* Dynamic tracking metrics */}
                  {enrolled && progressObj && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-mono text-secondary mb-1">
                        <span>Progress</span>
                        <span className="text-accent font-bold">{progressObj.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-accent h-full transition-all duration-500" 
                          style={{ width: `${progressObj.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-secondary bg-surface-container-high/60 px-2.5 py-1 rounded">
                      {course.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="text-xs font-semibold text-secondary hover:text-accent cursor-pointer underline flex items-center gap-0.5"
                        title="View Details & Syllabus"
                      >
                        Syllabus
                      </button>
                      
                      <button
                        onClick={() => {
                          if (course.category === 'E-Book') {
                            handleDownloadEbook(course);
                          } else {
                            if (enrolled) {
                              setSimulatorCourse(course);
                              setQuizSubmitted(false);
                            } else {
                              handleEnrollBtn(course);
                            }
                          }
                        }}
                        className={`p-2 rounded-lg bg-primary-container text-accent hover:bg-accent hover:text-white transition-all cursor-pointer`}
                        id={`btn-action-${course.id}`}
                        aria-label={`Action for ${course.title}`}
                      >
                        {course.category === 'E-Book' ? (
                          <Download size={14} className="stroke-[2.5]" />
                        ) : enrolled ? (
                          <Play size={14} className="stroke-[2.5] fill-accent group-hover:fill-white" />
                        ) : (
                          <ExternalLink size={14} className="stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Curriculum / Syllabus Modal Overlay */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="absolute inset-0 bg-primary/45 backdrop-blur-sm"
              />

              {/* Box */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-surface-container-lowest max-w-xl w-full rounded-xl overflow-hidden shadow-2xl border border-outline-variant/20 p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col"
              >
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer text-primary"
                  aria-label="Close details"
                  id="syllabus-close"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-surface-container font-semibold">
                    {getIcon(selectedCourse.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full font-bold">
                      {selectedCourse.category} Outline
                    </span>
                    <h3 className="font-sans text-xl font-extrabold text-primary mt-1">
                      {selectedCourse.title}
                    </h3>
                  </div>
                </div>

                <div className="overflow-y-auto pr-1 flex-grow mb-6 space-y-5 text-on-surface">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#768dad] mb-2 font-bold flex items-center gap-1.5">
                      <BookOpen size={13} />
                      Course Objective
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed">
                      This curriculum is engineered for rapid mastery. Built with systematic testing, clear implementation criteria, and absolute fidelity to web standards.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#768dad] mb-2 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      Technical Focus Areas
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedCourse.details?.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#768dad] mb-2 font-bold flex items-center gap-1.5">
                      <FileText size={13} />
                      Curriculum Modules
                    </h4>
                    <div className="space-y-2">
                      {selectedCourse.modules?.map((module, idx) => (
                        <div key={idx} className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/10 flex items-center justify-between">
                          <span className="text-xs font-medium text-primary">{module}</span>
                          <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded">Core</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end items-center pt-4 border-t border-outline-variant/10 mt-auto">
                  <span className="text-xs font-mono text-secondary mr-auto">
                    Duration: {selectedCourse.duration}
                  </span>
                  
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 border border-outline-variant/20 rounded-lg text-xs font-semibold hover:bg-surface-container cursor-pointer text-primary"
                  >
                    Close Description
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      if (selectedCourse.category === 'E-Book') {
                        handleDownloadEbook(selectedCourse);
                      } else {
                        handleEnrollBtn(selectedCourse);
                      }
                    }}
                    className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-lg text-xs font-semibold transition-all shadow-[0_2px_8px_rgba(0,122,255,0.15)] cursor-pointer"
                  >
                    {selectedCourse.category === 'E-Book' ? 'Download E-Book' : isEnrolled(selectedCourse.id) ? 'Enter Simulator' : 'Enroll Now'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic Focused Interactive Training Workspace / Quiz */}
        <AnimatePresence>
          {simulatorCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSimulatorCourse(null)}
                className="absolute inset-0 bg-primary/50 backdrop-blur-md"
              />

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-surface-container-lowest max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 p-6 md:p-8 z-10 max-h-[90vh] flex flex-col"
              >
                <button 
                  onClick={() => setSimulatorCourse(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer text-primary"
                  aria-label="Exit Simulator"
                  id="simulator-close"
                >
                  <X size={18} />
                </button>

                {/* Simulator Head */}
                <div className="mb-6 pb-4 border-b border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#007aff]/10 text-accent font-mono text-[10px] font-bold">
                      ACTIVE TESTING SANDBOX
                    </span>
                    <span className="text-[10px] text-secondary font-mono">• Interactive validation</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Award size={20} className="text-accent" />
                    {simulatorCourse.title} Workspace
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    Pass the validation checkpoint with 100% correct answers to earn your Certification Badge, persisted permanently.
                  </p>
                </div>

                {/* Submitting Container */}
                <div className="overflow-y-auto pr-1 flex-grow space-y-6 mb-6">
                  {currentQuizzes.length > 0 ? (
                    currentQuizzes.map((quiz, quizIdx) => {
                      const selectedOpt = selectedAnswers[quizIdx];
                      const isCorrect = selectedOpt === quiz.correct;

                      return (
                        <div 
                          key={quizIdx} 
                          className={`p-5 rounded-xl border transition-colors ${
                            quizSubmitted 
                              ? isCorrect 
                                ? 'bg-[#e3fcf0] border-[#009b4d]/20 text-on-surface' 
                                : 'bg-[#fff5f5] border-error/10 text-on-surface'
                              : 'bg-surface-container-low border-outline-variant/10 text-on-surface'
                          }`}
                        >
                          <span className="text-xs font-mono font-semibold text-secondary block mb-1">
                            CHECKPOINT 0{quizIdx + 1}
                          </span>
                          
                          <p className="text-sm font-semibold text-primary mb-4 leading-relaxed">
                            {quiz.q}
                          </p>

                          <div className="space-y-2">
                            {quiz.opts.map((opt, optIdx) => {
                              const isSelected = selectedOpt === optIdx;
                              const isThisCorrect = quiz.correct === optIdx;

                              let btnStyle = "border-outline-variant/20 hover:bg-surface text-secondary";
                              if (isSelected) btnStyle = "bg-primary border-primary text-white";
                              
                              if (quizSubmitted) {
                                if (isThisCorrect) {
                                  btnStyle = "bg-[#009b4d] border-[#009b4d] text-white";
                                } else if (isSelected && !isCorrect) {
                                  btnStyle = "bg-error border-error text-white";
                                } else {
                                  btnStyle = "opacity-55 border-outline-variant/10 text-secondary-container";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectAnswer(quizIdx, optIdx)}
                                  className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && !quizSubmitted && <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>}
                                  {quizSubmitted && isThisCorrect && <span className="text-[10px] font-mono uppercase bg-white/20 px-1.5 py-0.5 rounded">Correct</span>}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-3 border-t border-black/5 text-xs text-secondary-container flex items-start gap-2"
                            >
                              <span className="font-bold shrink-0 text-primary">Rational basis:</span>
                              <span className="text-secondary leading-relaxed">{quiz.explanation}</span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 bg-surface-container rounded-xl">
                      <BookOpen className="mx-auto text-secondary/35 mb-3" size={32} />
                      <p className="text-sm font-semibold text-primary">No quiz configured for this resource yet.</p>
                      <p className="text-xs text-secondary mt-1">Please explore the curriculum or check back later.</p>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10 mt-auto">
                  <span className="text-xs font-mono text-secondary">
                    {Object.keys(selectedAnswers).length} of {currentQuizzes.length} answered
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSimulatorCourse(null)}
                      className="px-4 py-2 border border-outline-variant/20 rounded-lg text-xs font-semibold hover:bg-surface-container cursor-pointer text-primary"
                    >
                      Exit Sandbox
                    </button>

                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                        }}
                        className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        Retry Checkpoint
                      </button>
                    ) : (
                      <button
                        disabled={Object.keys(selectedAnswers).length < currentQuizzes.length}
                        onClick={handleSubmitQuiz}
                        className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                          Object.keys(selectedAnswers).length < currentQuizzes.length
                            ? 'bg-surface-container text-secondary-container cursor-not-allowed opacity-50'
                            : 'bg-accent hover:bg-accent-hover text-white shadow-[0_2px_8px_rgba(0,122,255,0.15)] cursor-pointer'
                        }`}
                      >
                        Submit Responses
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
