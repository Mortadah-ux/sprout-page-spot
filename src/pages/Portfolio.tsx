import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Portfolio page with masonry grid
 * Features smooth animations and responsive layout
 */
export default function Portfolio() {

  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/cv/Mortadah_Jaballah_CV.pdf';
    link.download = 'Mortadah_Jaballah_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead 
        title="Portfolio"
        description="Browse my complete photography portfolio featuring portraits, landscapes, editorial work, architecture, and documentary projects."
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
              A curated collection of photography spanning diverse subjects and styles
            </p>
          </motion.div>
        </div>
      </section>

      {/* CV Download Section */}
      <section className="py-16 px-6 lg:px-8 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-xl border border-cyber/30 bg-background/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber/10 border border-cyber/30">
                <FileText className="w-8 h-8 text-cyber" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold">Download My CV</h3>
                <p className="text-muted-foreground text-sm">
                  Get a complete overview of my skills, certifications, and experience
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleDownloadCV}
              className="bg-cyber hover:bg-cyber/90 text-background font-medium px-6 py-3 gap-2"
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Edge to edge */}
      <section className="py-12 md:py-16 px-2 md:px-4">
        <PortfolioGrid projects={projects} />
      </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
