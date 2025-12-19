import { Linkedin, Github } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';

/**
 * Minimal footer component with social links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {photographerInfo.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {photographerInfo.socialLinks.github && (
              <a
                href={photographerInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
            )}
            {photographerInfo.socialLinks.linkedin && (
              <a
                href={photographerInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {photographerInfo.socialLinks.tryhackme && (
              <a
                href={photographerInfo.socialLinks.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="TryHackMe"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 00-4.107 4.5 4.525 4.525 0 004.52 4.52h6.608l2.463-4.193h3.3l-1.932 3.281 2.523 4.287h-3.3l-.733-1.247h-6.92A7.298 7.298 0 010 9.792 7.298 7.298 0 015.998 2.5 7.295 7.295 0 0110.705 0zm2.59 4.615l-4.2 7.14h3.3l2.266-3.855 2.268 3.855h3.3l-4.2-7.14z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
