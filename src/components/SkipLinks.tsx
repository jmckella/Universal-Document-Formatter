import React from 'react';
import { useFocusManagement } from '../hooks/useFocusManagement';

interface SkipLink {
  id: string;
  label: string;
  target: string;
}

interface SkipLinksProps {
  isDarkMode: boolean;
  links?: SkipLink[];
}

const defaultLinks: SkipLink[] = [
  { id: 'skip-to-main', label: 'Skip to main content', target: 'main-content' },
  { id: 'skip-to-input', label: 'Skip to content input', target: 'content-input' },
  { id: 'skip-to-platforms', label: 'Skip to platform selection', target: 'platform-selector' },
  { id: 'skip-to-output', label: 'Skip to formatted output', target: 'output-section' },
];

const SkipLinks: React.FC<SkipLinksProps> = ({ isDarkMode, links = defaultLinks }) => {
  const { activateSkipLink } = useFocusManagement();

  const handleSkipLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    activateSkipLink(targetId);
  };

  return (
    <nav aria-label="Skip navigation links" className="sr-only">
      <ul className="list-none">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.target}`}
              className={`skip-link fixed top-4 left-4 z-50 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 transform -translate-y-16 focus:translate-y-0 ${
                isDarkMode 
                  ? 'bg-slate-800 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900' 
                  : 'bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
              onClick={(e) => handleSkipLinkClick(e, link.target)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  activateSkipLink(link.target);
                }
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SkipLinks;