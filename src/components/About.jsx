import './About.css'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 12 } },
}

function About() {
    return (
        <section className="about section overflow-hidden" id="about">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">01. About</h2>
                    <p className="section-subtitle">Mindset & Methodology</p>
                </motion.div>
                
                <div className="about-grid">
                    {/* Main Content */}
                    <motion.div 
                        className="about-content card"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <motion.div variants={itemVariants} className="about-intro">
                            <h2 className="mono text-2xl mb-4">SYSTEM_INITIALIZED: Thinking in Architecture</h2>
                            <p className="about-lead text-xl text-[var(--accent)] font-medium">
                                I don't just use tools — I dissect them to understand <em>why</em> they work.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="about-philosophy space-y-4 text-gray-300">
                            <p>
                                As a Computer Engineering student at VIT Pune, my first question when approaching
                                a project is never "what framework should I use?" — it's "how should data flow
                                through this network?"
                            </p>
                            <p>
                                I specialize in backend development because that's the core of any application — where 
                                decisions about API structures, relational data modeling, and thread concurrency
                                dictate performance. Building scalable infrastructure with Java, Node.js,
                                or FastAPI is where I thrive.
                            </p>
                            <p>
                                From migrating legacy systems like FoxPro HR data for the Pune Municipal Corporation
                                to architecting full-stack MERN platforms with RBAC and JWT auth, I've learned
                                that rock-solid fundamentals in Data Structures, OOP, and DBMS are what truly
                                differentiate engineers from coders.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="about-approach mt-12">
                            <h3 className="mono text-lg mb-6 text-[var(--accent)]">// Execution_Strategy</h3>
                            <div className="approach-cards grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div whileHover={{ scale: 1.02, y: -5 }} className="approach-card bg-black/40 p-5 rounded-lg border border-white/5 shadow-xl">
                                    <div className="approach-icon text-[var(--accent)] mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h4 className="mono text-white mb-2">BACKEND_FIRST</h4>
                                    <p className="text-sm text-gray-400">Before writing frontend, I design the data model and API contract. Architecture decisions compound.</p>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02, y: -5 }} className="approach-card bg-black/40 p-5 rounded-lg border border-white/5 shadow-xl">
                                    <div className="approach-icon text-[var(--accent-secondary)] mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </div>
                                    <h4 className="mono text-white mb-2">CORE_CS</h4>
                                    <p className="text-sm text-gray-400">DSA, OOP principles, multithreading, and DBMS are the tools I sharpen every day — not just for interviews.</p>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02, y: -5 }} className="approach-card bg-black/40 p-5 rounded-lg border border-white/5 shadow-xl">
                                    <div className="approach-icon text-[var(--accent-tertiary)] mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <path d="M14 2v6h6" />
                                            <path d="M16 13H8" />
                                            <path d="M16 17H8" />
                                            <path d="M10 9H8" />
                                        </svg>
                                    </div>
                                    <h4 className="mono text-white mb-2">FULL_STACK</h4>
                                    <p className="text-sm text-gray-400">I build end-to-end: from React frontends to Express/FastAPI backends to MySQL/MongoDB schemas.</p>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02, y: -5 }} className="approach-card bg-black/40 p-5 rounded-lg border border-white/5 shadow-xl">
                                    <div className="approach-icon text-[#0f0] mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="mono text-white mb-2">ANALYTICS</h4>
                                    <p className="text-sm text-gray-400">I analyze problems analytically before jumping to code — whether it's a DBMS schema or an ETL pipeline.</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.aside 
                        className="about-sidebar"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="about-snapshot card border-glow hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-shadow duration-500">
                            <h3 className="mono terminal-header text-[var(--accent)] mb-4">$ cat profile.json</h3>
                            <dl className="snapshot-list mono space-y-3">
                                <div className="snapshot-item flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-gray-400">Focus</dt>
                                    <dd className="text-white">"Backend & Full-Stack"</dd>
                                </div>
                                <div className="snapshot-item flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-gray-400">Location</dt>
                                    <dd className="text-white">"VIT Pune"</dd>
                                </div>
                                <div className="snapshot-item flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-gray-400">CGPA</dt>
                                    <dd className="text-[var(--accent)]">9.06</dd>
                                </div>
                                <div className="snapshot-item flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-gray-400">Deployments</dt>
                                    <dd className="text-white">3</dd>
                                </div>
                                <div className="snapshot-item flex justify-between pb-2">
                                    <dt className="text-gray-400">Status</dt>
                                    <dd className="status-online text-[#0f0] animate-pulse">"Online"</dd>
                                </div>
                            </dl>
                        </div>

                        <motion.div 
                            className="about-quote mt-8 p-6 bg-gradient-to-br from-[var(--bg-card)] to-transparent rounded-xl border border-white/5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <blockquote className="text-lg italic text-gray-300 leading-relaxed">
                                "Scalable systems are built by engineers who understand data flow first and syntax second."
                            </blockquote>
                            <cite className="mono text-sm text-[var(--accent)] mt-4 block">— Root_Philosophy</cite>
                        </motion.div>
                    </motion.aside>
                </div>
            </div>
        </section>
    )
}

export default About
