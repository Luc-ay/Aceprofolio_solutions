import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Briefcase } from 'lucide-react';

interface TopAppBarProps {
  onOpenMentor: () => void;
  onOpenHire: () => void;
  activeSection: string;
}

export default function TopAppBar({
  onOpenMentor,
  onOpenHire,
  activeSection,
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
      <nav id="nav-container" className="flex justify-between items-center px-6 lg:px-12 py-3 max-w-7xl mx-auto w-full">
        {/* Logo and centralized stacked name */}
        <a 
          href="#join" 
          className="flex flex-col items-center text-center gap-1 group cursor-pointer" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img 
            src="/logo.svg" 
            alt="Aceprofolio Solutions" 
            className="w-9 h-9 rounded-lg shadow-sm border border-outline-variant/15 group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col items-center justify-center leading-none">
            <span className="font-sans text-[11px] font-extrabold text-primary tracking-tight block">
              Aceprofolio
            </span>
            <span className="font-sans text-[11px] font-extrabold text-accent tracking-tight block mt-0.5">
              Solutions
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
