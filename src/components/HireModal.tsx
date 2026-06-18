import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, ChevronRight, CheckCircle, Search, Mail, Building, DollarSign, Sparkles } from 'lucide-react';
import { Professional, HireRequest } from '../types';
import { PROFESSIONALS } from '../data';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequest: (req: HireRequest) => void;
  onTriggerToast: (message: string, type: 'success' | 'info') => void;
}

export default function HireModal({
  isOpen,
  onClose,
  onAddRequest,
  onTriggerToast,
}: HireModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('Under $5k');

  // Hire states
  const [isSearching, setIsSearching] = useState(false);
  const [matchedTalents, setMatchedTalents] = useState<Professional[]>([]);
  const [initiatedContracts, setInitiatedContracts] = useState<string[]>([]); // contractor IDs targeted

  if (!isOpen) return null;

  const runTalentScout = () => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      // Basic text parser to find skills or roles
      const textQuery = details.toLowerCase();
      
      const filtered = PROFESSIONALS.filter(p => {
        // Find matching skills
        const hasSkill = p.skills.some(s => textQuery.includes(s.toLowerCase()));
        const hasRole = textQuery.includes(p.role.toLowerCase()) || textQuery.includes('dev') || textQuery.includes('designer');
        
        // If query is broad, return top people. Otherwise, match by skill content.
        return true; 
      });

      // Sort by availability
      const sorted = [...filtered].sort((a, b) => {
        if (a.availability === 'Available' && b.availability === 'Busy') return -1;
        if (a.availability === 'Busy' && b.availability === 'Available') return 1;
        return 0;
      });

      setMatchedTalents(sorted);
      setIsSearching(false);

      // Save inquiry request
      const newInquiry: HireRequest = {
        id: 'hire-' + Math.random().toString(36).substr(2, 9),
        companyName,
        email,
        details,
        budget,
        submittedAt: new Date().toLocaleDateString(),
        status: 'Received'
      };
      onAddRequest(newInquiry);

      // Fire email notifier API securely
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'hire',
          formData: {
            companyName,
            email,
            details,
            budget
          }
        })
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('Hiring email dispatched successfully:', data.message);
          } else {
            console.error('Hiring email dispatched failure:', data.error);
          }
        })
        .catch(err => {
          console.error('Hiring email network dispatch/transport error:', err);
        });

      onTriggerToast(`High-performance talent query indexed. matched contractors unlocked!`, 'success');
    }, 1800);

    return () => clearTimeout(timer);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !details) return;
    runTalentScout();
  };

  const handleInitiateInquiry = (profId: string, name: string) => {
    setInitiatedContracts(prev => [...prev, profId]);
    onTriggerToast(`Engagement draft sent to ${name}! Direct secure meeting coordinate issued to your mail.`, 'success');
  };

  const handleReset = () => {
    setCompanyName('');
    setEmail('');
    setDetails('');
    setBudget('Under $5k');
    setMatchedTalents([]);
    setInitiatedContracts([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleReset}
        className="absolute inset-0 bg-primary/45 backdrop-blur-md"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-primary-container text-white w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl p-6 md:p-10 z-10 border border-outline-variant/10 text-on-primary"
        id="hire-container-modal"
      >
        <button 
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSearching ? (
          /* Search Animation Loading State */
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <span className="relative flex h-14 w-14 mb-8">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-14 w-14 bg-accent flex items-center justify-center">
                <Search className="text-white" size={24} />
              </span>
            </span>
            <h3 className="font-sans text-xl font-extrabold text-white mb-2">
              Auditing Talent Reserves...
            </h3>
            <p className="text-[#768dad] text-xs font-mono max-w-sm mt-1">
              Matching budget matrices, processing skill dependencies, and checking secure developer check-ins...
            </p>
          </div>
        ) : matchedTalents.length > 0 ? (
          /* Display Computed Contractor Recommendations */
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-accent bg-accent/20 px-3 py-1 rounded-full font-bold inline-block mb-2">
                ACTIVE VETTED CONTRACTORS
              </span>
              <h3 className="font-sans text-2xl font-extrabold text-white">
                Compatible Vetted Professionals
              </h3>
              <p className="text-xs text-[#768dad] mt-1">
                Your specifications fit the standards of our vetted developer grid. Propose task scopes to coordinates below:
              </p>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {matchedTalents.map((prof) => {
                const initiated = initiatedContracts.includes(prof.id);
                return (
                  <div 
                    key={prof.id}
                    className="p-5 rounded-lg bg-[#07192b] border border-outline-variant/5 flex flex-col sm:flex-row gap-4 items-start justify-between"
                  >
                    <div className="flex gap-4 items-start">
                      <img 
                        src={prof.imageUrl} 
                        alt={prof.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-outline-variant/10 shrink-0 mt-1" 
                      />
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="font-bold text-white text-base leading-none">
                            {prof.name}
                          </h4>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                            prof.availability === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                          }`}>
                            {prof.availability}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-container mt-1.5 font-semibold">
                          {prof.role} • <span className="text-accent">{prof.experience}</span>
                        </p>
                        <p className="text-xs text-[#768dad] mt-2 leading-relaxed">
                          {prof.bio}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {prof.skills.map(skill => (
                            <span key={skill} className="text-[9px] font-mono bg-primary/40 px-1.5 py-0.5 rounded text-secondary-container">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="sm:self-center shrink-0 w-full sm:w-auto text-right flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-[#768dad] block sm:text-right text-left mb-1.5 sm:mb-0">
                        {prof.hourlyRate} / hour
                      </span>
                      <button
                        onClick={() => handleInitiateInquiry(prof.id, prof.name)}
                        disabled={prof.availability === 'Busy' && !initiated}
                        className={`w-full sm:w-auto text-xs px-4 py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                          initiated 
                            ? 'bg-emerald-600 text-white cursor-default flex items-center justify-center gap-1.5' 
                            : prof.availability === 'Busy'
                              ? 'bg-primary border border-outline-variant/10 text-secondary-container cursor-not-allowed hover:bg-primary'
                              : 'bg-accent hover:bg-accent-hover text-white'
                        }`}
                      >
                        {initiated ? (
                          <>
                            <CheckCircle size={13} />
                            Invoiced
                          </>
                        ) : prof.availability === 'Busy' ? 'Busy' : 'Hire Talent'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] text-on-primary-container italic font-medium leading-relaxed font-semibold text-[#3c88ff]">
                "our top 20 corresponding picks to your form answers will be sent to your mail to choose from with contact details"
              </p>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#007aff] hover:opacity-95 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Clear and Return
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="text-on-tertiary-container" size={24} />
                <h3 className="font-sans text-2xl font-extrabold text-white">
                  Hire a Professional
                </h3>
              </div>
              <p className="text-sm text-on-primary-container">
                Access our vetted directory of top-tier talent for your next critical milestone. Precision engineering on demand.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-primary-container" htmlFor="hire-companyName">Name or Company Name</label>
              <div className="relative">
                <Building size={16} className="absolute left-3.5 top-3.5 text-on-primary-container" />
                <input 
                  id="hire-companyName"
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="John Doe or Acme Corp" 
                  required 
                  className="bg-primary/50 border border-outline/30 rounded-lg pl-10 pr-3.5 py-3 text-sm text-white w-full placeholder:text-on-primary-container focus:border-on-tertiary-container focus:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-primary-container" htmlFor="hire-email">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-on-primary-container" />
                <input 
                  id="hire-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@acme.com" 
                  required 
                  className="bg-primary/50 border border-outline/30 rounded-lg pl-10 pr-3.5 py-3 text-sm text-white w-full placeholder:text-on-primary-container"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-primary-container" htmlFor="hire-details">Service Required in Details</label>
              <textarea 
                id="hire-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe the exact service details, developer skill focus, or visual design needs..." 
                required 
                rows={3} 
                className="bg-primary/50 border border-outline/30 rounded-lg p-3 text-sm text-white placeholder:text-on-primary-container focus:border-on-tertiary-container focus:ring-0 leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-primary-container" htmlFor="hire-budget">Estimated Project Budget Range</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-3.5 text-on-primary-container" />
                <select 
                  id="hire-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-primary/50 border border-outline/30 rounded-lg pl-10 pr-3.5 py-3 text-sm text-white w-full focus:border-on-tertiary-container cursor-pointer"
                >
                  <option value="Under $5k" className="bg-[#0c1c2a]">Under $5,000 USD</option>
                  <option value="$5k - $20k" className="bg-[#0c1c2a]">$5,000 - $20,000 USD</option>
                  <option value="$20k - $50k" className="bg-[#0c1c2a]">$20,000 - $50,000 USD</option>
                  <option value="$50k+" className="bg-[#0c1c2a]">$50,000+ USD (High Scale)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#3c88ff] hover:opacity-90 text-white py-4 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(60,136,255,0.15)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Analyze Stack & Recommend Professionals
              <ChevronRight size={16} />
            </button>

            <p className="italic text-[10px] text-[#3c88ff] text-center leading-relaxed font-semibold">
              "our top 20 corresponding picks to your form answers will be sent to your mail to choose from with contact details"
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
