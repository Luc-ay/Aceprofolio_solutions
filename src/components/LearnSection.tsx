import { useState } from 'react';
import { 
  Code, 
  Palette, 
  Database, 
  Cloud
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
  onTriggerToast
}: LearnSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'ebooks'>('all');

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
          </div>
        </div>

        {/* Classes & E-Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            return (
              <div 
                key={course.id}
                className="glass-card p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden group border border-outline-variant/10 cursor-default animate-fade-in"
                id={`course-card-${course.id}`}
              >
                <div>
                  {/* Category symbol container */}
                  <div className="w-11 h-11 rounded-lg bg-surface-container-high/60 flex items-center justify-center mb-6 transition-transform">
                    {getIcon(course.iconName)}
                  </div>

                  <h3 className="font-sans text-xl font-bold text-primary mb-2 line-clamp-1 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-secondary mb-6 leading-relaxed min-h-[60px] line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-secondary bg-surface-container-high/60 px-2.5 py-1 rounded">
                    {course.badge}
                  </span>
                  <span className="text-xs font-mono text-secondary/60 font-semibold">
                    Curriculum Resource
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
