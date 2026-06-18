import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Brain, ArrowRight, UserCheck, CheckCircle, Sparkles, AlertCircle, Link, Mail, Laptop } from 'lucide-react';
import { Mentor, MentorshipRequest } from '../types';
import { MENTORS } from '../data';

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequest: (req: MentorshipRequest) => void;
  onTriggerToast: (message: string, type: 'success' | 'info') => void;
}

export default function MentorModal({
  isOpen,
  onClose,
  onAddRequest,
  onTriggerToast,
}: MentorModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [socials, setSocials] = useState('');
  const [skills, setSkills] = useState('');
  const [objectives, setObjectives] = useState('');
  const [roleModels, setRoleModels] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Matching Workflow states
  const [isMatching, setIsMatching] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const [matchedMentors, setMatchedMentors] = useState<{ mentor: Mentor; score: number }[]>([]);
  const [isBooked, setIsBooked] = useState<string[]>([]); // booked mentor IDs

  if (!isOpen) return null;

  const runCompatMatching = () => {
    setIsMatching(true);
    setMatchingStep(0);

    // Simulated staggered parsing calculations
    const timers = [
      setTimeout(() => setMatchingStep(1), 800),
      setTimeout(() => setMatchingStep(2), 1600),
      setTimeout(() => {
        setIsMatching(false);
        setIsSubmitted(true);

        // Record request
        const newRequest: MentorshipRequest = {
          id: Math.random().toString(36).substr(2, 9),
          fullName,
          email,
          socials,
          skills,
          objectives,
          roleModels,
          submittedAt: new Date().toLocaleDateString()
        };
        onAddRequest(newRequest);

        // Fire email notifier API securely
        fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'mentor',
            formData: {
              name: fullName,
              email,
              socials,
              skills,
              objectives,
              roleModels
            }
          })
        }).then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log('Mentorship email matched successfully:', data.message);
            } else {
              console.error('Mentorship email matched failure:', data.error);
            }
          })
          .catch(err => {
            console.error('Mentorship email dispatch network/transport error:', err);
          });

        onTriggerToast('Application submitted! Our response dispatch has been triggered.', 'success');
      }, 2400)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !objectives) return;
    runCompatMatching();
  };

  const handleBookSession = (mentorId: string, name: string) => {
    setIsBooked(prev => [...prev, mentorId]);
    onTriggerToast(`Meeting request dispatched to ${name}! Check email inbox for schedule links.`, 'success');
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setSocials('');
    setSkills('');
    setObjectives('');
    setRoleModels('');
    setMatchedMentors([]);
    setIsBooked([]);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetForm}
        className="absolute inset-0 bg-primary/40 backdrop-blur-md"
      />

      {/* Content wrapper */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-surface-container-highest w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 md:p-10 z-10 border border-outline-variant/20"
        id="mentor-container-modal"
      >
        <button 
          onClick={resetForm}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-primary"
          aria-label="Close modal"
          id="mentor-close-btn"
        >
          <X size={20} />
        </button>

        {/* Dynamic State Selection */}
        {isMatching ? (
          /* Match Progress Animation Loading Screen */
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent mb-8 flex items-center justify-center"
            >
              <Brain className="text-accent" size={24} />
            </motion.div>

            <h3 className="font-sans text-xl font-extrabold text-primary mb-2">
              Executing Alignment Vectors...
            </h3>
            
            <div className="text-sm text-secondary max-w-md h-[40px] flex items-center justify-center font-mono">
              {matchingStep === 0 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  🔍 Parsing technical skill arrays...
                </motion.span>
              )}
              {matchingStep === 1 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#3c88ff]">
                  🌐 Scout route validation (Netflix, Google, Spotify)...
                </motion.span>
              )}
              {matchingStep === 2 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent">
                  ⚡ Compiling top 20 candidate priority picks...
                </motion.span>
              )}
            </div>
            
            <div className="w-48 bg-surface-container h-1 rounded-full overflow-hidden mt-6">
              <div 
                className="bg-accent h-full transition-all duration-700"
                style={{ width: matchingStep === 0 ? '30%' : matchingStep === 1 ? '65%' : '90%' }}
              />
            </div>
          </div>
        ) : isSubmitted ? (
          /* Custom Success Screen with support notification */
          <div className="py-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            
            <h3 className="font-sans text-2xl font-extrabold text-primary mb-3">
              Application Received successfully!
            </h3>
            
            <p className="text-sm text-secondary max-w-md mx-auto mb-8 leading-relaxed">
              Your details have been successfully received and dispatched via our secure mailing system. Our administrators or support team will review your objectives and reach out to you directly!
            </p>

            <button
              onClick={resetForm}
              className="px-8 py-3.5 bg-accent hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="text-accent" size={24} />
                <h3 className="font-sans text-2xl font-extrabold text-primary">
                  Meet a Mentor
                </h3>
              </div>
              <p className="text-sm text-secondary">
                Connect with vetted industry veterans who have built what you're active on. Recieve structured guidance for ambitious developers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-secondary" htmlFor="mentor-fullName">Full Name</label>
                <input 
                  id="mentor-fullName"
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe" 
                  required 
                  className="bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm text-primary focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-secondary" htmlFor="mentor-email">Email</label>
                <input 
                  id="mentor-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  required 
                  className="bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm text-primary focus:border-accent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-secondary" htmlFor="mentor-socials">Social Media Profile Links</label>
              <div className="relative">
                <Link size={16} className="absolute left-3.5 top-3.5 text-secondary" />
                <input 
                  id="mentor-socials"
                  type="text" 
                  value={socials}
                  onChange={(e) => setSocials(e.target.value)}
                  placeholder="https://github.com/username or LinkedIn link" 
                  className="bg-surface border border-outline-variant/30 rounded-lg pl-10 pr-3.5 py-3 text-sm text-primary w-full focus:border-accent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-secondary" htmlFor="mentor-skills">Current Skills / Stack Focus</label>
              <input 
                id="mentor-skills"
                type="text" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., JavaScript, React, Go, Python" 
                className="bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm text-primary focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-secondary" htmlFor="mentor-objectives">What would you like to learn under supervision?</label>
              <textarea 
                id="mentor-objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Briefly describe your learning goals, current bottlenecks, and technologies you want to master..." 
                required 
                rows={3} 
                className="bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm text-primary focus:border-accent leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-secondary" htmlFor="mentor-roleModels">Role Models</label>
              <input 
                id="mentor-roleModels"
                type="text" 
                value={roleModels}
                onChange={(e) => setRoleModels(e.target.value)}
                placeholder="Who are your role models in the tech industry? (so you're connected to the right mentor)" 
                required
                className="bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm text-primary focus:border-accent"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_22px_rgba(0,122,255,0.18)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Analyze Adaptability & Match
              <ArrowRight size={16} />
            </button>

            <p className="italic text-[10px] text-secondary text-center leading-relaxed font-semibold text-[#007aff]">
              "our top 20 corresponding picks to your form answers will be sent to your mail to choose from with contact details"
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
