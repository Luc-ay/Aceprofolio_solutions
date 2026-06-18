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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hire states
  const [isSearching, setIsSearching] = useState(false);
  const [matchedTalents, setMatchedTalents] = useState<Professional[]>([]);
  const [initiatedContracts, setInitiatedContracts] = useState<string[]>([]); // contractor IDs targeted

  if (!isOpen) return null;

  const runTalentScout = () => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setIsSearching(false);
      setIsSubmitted(true);

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

      onTriggerToast(`Inquiry submitted! Our support team has been notified.`, 'success');
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
        ) : isSubmitted ? (
          /* Custom Success Screen with support notification */
          <div className="py-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle size={36} className="text-emerald-400" />
            </div>
            
            <h3 className="font-sans text-2xl font-extrabold text-white mb-3">
              Inquiry Received successfully!
            </h3>
            
            <p className="text-sm text-on-primary-container max-w-md mx-auto mb-8 leading-relaxed">
              Your business requirements have been successfully received and dispatched via our secure mailing system. Our administrators or support team will review your requirements and reach out to you directly!
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 bg-[#3c88ff] hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md"
            >
              Done & Return
            </button>
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
