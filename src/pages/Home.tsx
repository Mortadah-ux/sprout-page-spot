import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero3DProfile } from '@/components/Hero3DProfile';

/**
 * Homepage with immersive hero section and featured projects grid
 * Showcases SOC analyst with 3D animated profile
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section - Full viewport with 3D profile */}
        <section className="relative min-h-screen w-full overflow-hidden bg-background py-20 md:py-0">
          {/* Background with gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyber/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyber/10 via-transparent to-transparent" />
            {/* Animated grid background */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Hero Content - Split layout */}
          <div className="relative h-full min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left - Text Content */}
                <motion.div
                  className="space-y-6 text-center md:text-left order-2 md:order-1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="flex justify-center md:justify-start mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber/50 bg-background/80 backdrop-blur-sm">
                      <Shield className="size-4 text-cyber" />
                      <span className="text-sm font-mono text-cyber font-semibold">SOC ANALYST</span>
                    </div>
                  </motion.div>
                  
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-white text-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {photographerInfo.name.toUpperCase()}
                  </motion.h1>
                  
                  <motion.p
                    className="text-lg md:text-xl font-semibold tracking-wide text-cyber text-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {photographerInfo.tagline}
                  </motion.p>

                  <motion.p
                    className="text-base font-medium leading-relaxed text-white max-w-lg mx-auto md:mx-0 text-shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {photographerInfo.heroIntroduction}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Link
                      to="/portfolio"
                      className="px-6 py-3 bg-cyber text-background font-medium rounded-sm hover:bg-cyber-glow transition-colors"
                    >
                      View Projects
                    </Link>
                    <Link
                      to="/contact"
                      className="px-6 py-3 border border-border hover:border-cyber hover:text-cyber font-medium rounded-sm transition-colors"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right - 3D Profile */}
                <motion.div
                  className="order-1 md:order-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Hero3DProfile />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ScrollIndicator />
          </motion.div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border bg-background/60 backdrop-blur-sm">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-white text-shadow-md">
                Featured Projects
              </h2>
              <p className="text-lg text-white font-medium tracking-wide text-shadow-sm">
                Hands-on security labs and research
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-cyber transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
