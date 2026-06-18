import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, BookOpen, UserCheck, Briefcase, GraduationCap } from 'lucide-react';

interface TopAppBarProps {
  onOpenMentor: () => void;
  onOpenHire: () => void;
  onOpenDashboard: () => void;
  activeSection: string;
  hasEnrolled: boolean;
}

export default function TopAppBar({
  onOpenMentor,
  onOpenHire,
  onOpenDashboard,
  activeSection,
  hasEnrolled,
}: TopAppBarProps) {
  const [isOpenInput, setIsOpenInput] = useState(false);

  const navItems = [
    { label: 'Join', id: 'join', href: '#join' },
    { label: 'Learn', id: 'learn', href: '#learn' },
    { label: 'Mentor', id: 'mentor', onClick: onOpenMentor },
    { label: 'Hire', id: 'hire', onClick: onOpenHire },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
      <nav id="nav-container" className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <a href="#join" className="flex items-center gap-2.5 group cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
            <Briefcase size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <span className="font-sans text-xl font-extrabold text-primary tracking-tight block">
              Aceprofolio <span className="text-accent">Solutions</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#768dad] block -mt-1 leading-none">
              Premium Tech Hub Group
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const linkClasses = `text-sm font-medium tracking-wide transition-all duration-200 relative py-1.5 cursor-pointer ${
              isActive
                ? 'text-accent font-semibold border-b-2 border-accent'
                : 'text-secondary hover:text-primary'
            }`;

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-sm font-medium tracking-wide text-secondary hover:text-primary transition-all duration-200 py-1.5 cursor-pointer"
                  id={`nav-${item.id}-btn`}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <a key={item.label} href={item.href} className={linkClasses}>
                {item.label}
              </a>
            );
          })}

          {/* Action Dashboard Indicator */}
          {hasEnrolled && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20 hover:bg-accent/20 transition-all cursor-pointer"
            >
              <GraduationCap size={14} />
              <span>MY LEARNING</span>
            </motion.button>
          )}

          <button
            onClick={onOpenDashboard}
            className="bg-primary hover:bg-accent hover:shadow-[0_4px_12px_rgba(0,122,255,0.2)] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
            id="nav-quick-join-btn"
          >
            My Dashboard
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpenInput(!isOpenInput)}
          className="md:hidden p-2 text-primary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Menu"
          id="mobile-nav-toggle"
        >
          {isOpenInput ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpenInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-outline-variant/10 bg-surface-container-lowest"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpenInput(false);
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      const el = document.querySelector(item.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-left py-2.5 font-medium text-secondary hover:text-accent border-b border-surface-container shadow-none text-base cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsOpenInput(false);
                  onOpenDashboard();
                }}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white py-3 rounded-lg text-base font-semibold transition-all cursor-pointer"
              >
                <Briefcase size={18} />
                Open My Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
