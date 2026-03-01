import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const SystemFlow = lazy(() => import("./SystemFlow"));

// Staggered reveal animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } },
};

function Hero() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="hero-badge mono">
            <span className="hero-badge-dot"></span>
            SYS.STATUS // OPEN_TO_OPPORTUNITIES
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-name">
            <span className="hero-greeting">root@shruti:~#</span><br/>
            Shruti Kakade<span className="accent-dot">_</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="hero-headline">
            <span className="hero-headline-static">Architecting</span>
            <span className="hero-headline-dynamic"> Scalable Systems</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-description text-gray-400 leading-relaxed text-lg">
            Computer Engineering student specializing in robust backend infrastructure and full-stack MERN/Java ecosystems. Bridging the gap between complex logic and elegant execution.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-links mono mt-4">
            <a
              href="https://www.linkedin.com/in/shruti-kakade-a6b3032b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link transition-transform hover:scale-105"
            >
              [ LINKEDIN ↗ ]
            </a>
            <a
              href="https://github.com/shrutikakade29"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link transition-transform hover:scale-105"
            >
              [ GITHUB ↗ ]
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-cta mt-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="btn btn-primary shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
              onClick={(e) => handleNavClick(e, "projects")}
            >
              EXECUTE_PROJECTS
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download="Shruti_Kakade_CV.pdf"
              className="btn btn-secondary border-white/10 hover:border-white/20"
            >
              GET_RESUME
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn btn-secondary border-white/10 hover:border-white/20"
              onClick={(e) => handleNavClick(e, "contact")}
            >
              INIT_CONTACT
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
          <div className="visual-glow"></div>
          <Suspense fallback={<div className="visual-fallback"></div>}>
            <SystemFlow />
          </Suspense>
        </motion.div>
      </div>

      <motion.div 
        className="hero-scroll mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>SCROLL_DOWN</span>
        <motion.div 
          className="hero-scroll-line"
          animate={{ height: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}

export default Hero;