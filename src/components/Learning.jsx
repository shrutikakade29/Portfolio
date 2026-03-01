import { motion } from 'framer-motion'
import './Learning.css'

const learningItems = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
            </svg>
        ),
        title: 'Legacy Data Migration (PMC)',
        description: 'Designing an ETL pipeline to migrate legacy FoxPro (.dbf) HR data into MySQL schemas using Python.'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: 'Daily Core CS & DSA',
        description: 'Focusing intensely on Data Structures, OOP, and Computer Science fundamentals.'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: 'Full-Stack GenAI Systems',
        description: 'Exploring Next.js, FastAPI, and Generative AI to build intelligent, scalable applications.'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'Scalable Architecture',
        description: 'Studying practical scalability, API optimization, and solid backend systems.'
    }
]

// Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
}

const cardVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    show: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
    }
}

function Learning() {
    return (
        <section className="learning section overflow-hidden" id="learning">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">04. Research</h2>
                    <p className="section-subtitle">What I'm Currently Working On</p>
                </motion.div>
                
                <div className="learning-content m-0 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="learning-text">
                        <motion.p 
                            className="mono text-gray-400 mb-8 leading-relaxed text-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[var(--accent)]">{`>`}</span> From data migrations for municipal corporations to deepening my understanding 
                            of Core Java and GenAI — I'm always looking for ways to grow and improve 
                            as an engineer.
                        </motion.p>

                        <motion.div 
                            className="learning-items space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {learningItems.map((item, index) => (
                                <motion.div 
                                    className="learning-item flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm cursor-default hover:bg-white/10 hover:border-[var(--accent)]/30 transition-all duration-300 group" 
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="learning-item-icon text-[var(--accent)] bg-[var(--accent)]/10 p-3 rounded-lg h-fit group-hover:scale-110 group-hover:bg-[var(--accent)]/20 transition-transform">{item.icon}</div>
                                    <div className="learning-item-content">
                                        <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--accent)] transition-colors">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="learning-visual lg:pl-10">
                        <motion.div 
                            className="learning-card p-8 rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-base)] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            whileHover={{ 
                                scale: 1.02, 
                                boxShadow: "0 20px 50px rgba(0,240,255,0.15)",
                                border: "1px solid rgba(0, 240, 255, 0.3)"
                            }}
                        >
                            {/* Decorative background gradients */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[var(--accent)]/20 transition-colors duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                            <p className="learning-quote text-xl lg:text-2xl font-light italic text-gray-200 leading-snug relative z-10 mb-8">
                                <span className="text-4xl text-[var(--accent)] opacity-50 absolute -top-4 -left-2 font-serif">"</span>
                                A solid foundation in Computer Science principles makes learning any new language 
                                or framework straightforward to grasp. <span className="text-[var(--accent)] font-medium not-italic">Always get the fundamentals right.</span>
                            </p>
                            
                            <div className="learning-author flex items-center gap-4 relative z-10 p-4 rounded-xl bg-black/40 border border-white/5">
                                <div className="learning-author-avatar w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center text-xl font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]">S</div>
                                <div className="learning-author-info">
                                    <h5 className="mono text-[var(--accent)] font-bold text-sm">Shruti's Philosophy</h5>
                                    <p className="text-xs text-gray-400 font-mono tracking-wider mt-1 block">FOUNDATIONS &gt; FRAMEWORKS</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Learning
