import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  History, 
  HelpCircle, 
  FileText,
  Eye
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const sidebarLinks = [
    { to: '/detect', label: 'Detection Panel', icon: <ShieldAlert className="w-5 h-5" /> },
    { to: '/dashboard', label: 'Analytics Panel', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/history', label: 'Detection History', icon: <History className="w-5 h-5" /> },
    { to: '/docs', label: 'User Guides', icon: <FileText className="w-5 h-5" /> },
    { to: '/about', label: 'About Tech', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  return (
    <aside className="w-64 border-r border-border-custom bg-surface p-6 hidden lg:flex flex-col gap-6 sticky top-[73px] h-[calc(100vh-73px)]">
      
      {/* Platform Title */}
      <div className="flex items-center gap-2 px-2 text-text-secondary select-none">
        <Eye className="w-4 h-4 text-accent-cyan" />
        <span className="text-xs uppercase tracking-widest font-heading font-semibold">
          Platform Suite
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-primary-indigo/10 text-primary-indigo border-l-2 border-primary-indigo'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};
