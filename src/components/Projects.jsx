import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        id: 'mern-ecommerce',
        title: 'MERN E-Commerce',
        subtitle: 'Production-Style Shopping Platform',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        ),
        problem: 'Needed a scalable, secure, and fully functional e-commerce platform with varying access levels and secure data transactions.',
        architecture: {
            description: 'MERN stack architecture with JWT-based Auth',
            flow: 'React Frontend → Express/Node.js REST API → MongoDB',
            layers: [
                { name: 'Frontend', detail: 'React with optimized performance and user workflows' },
                { name: 'API Services', detail: 'Express backend managing 15+ secure REST endpoints' },
                { name: 'Database', detail: 'MongoDB structured for products, orders, and users' }
            ]
        },
        decisions: [
            'Implemented custom RBAC (Role-Based Access Control) for users, admins, and super-admins',
            'Added Super-Admin approval workflows for enhanced security',
            'Designed a modular backend architecture to ensure maintainable codebase'
        ],
        tradeoffs: 'Building custom JWT auth and RBAC from scratch took longer than using a managed service, but provided better understanding of security flows.',
        features: [
            'Role-Based Access Control (RBAC)',
            'Super-Admin approval workflow',
            'JWT-based secure authentication',
            '15+ optimized REST API endpoints'
        ],
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
        learnings: 'Gained deep understanding of scalable backend architecture, managing complex state in React, and building secure REST APIs from scratch.',
        futureScope: 'Implement robust payment gateway integration and advanced product recommendation system.'
    },
    {
        id: 'ai-interviewer',
        title: 'AI Interviewer',
        subtitle: 'GenAI Powered Recruitment System',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        ),
        problem: 'The recruitment process is manual, time-consuming, and lacks structured workflows connecting students, Training & Placement Officers (TPOs), and companies.',
        architecture: {
            description: 'Centralized recruitment ecosystem with integrated AI',
            flow: 'Next.js Frontend → FastAPI Backend ↔ GenAI APIs',
            layers: [
                { name: 'Application', detail: 'Next.js application with real-time media capture' },
                { name: 'Engineers Layer', detail: 'FastAPI for fast async processing and GenAI coordination' },
                { name: 'Security', detail: 'Integrated proctoring tools and secure interview workflows' }
            ]
        },
        decisions: [
            'Utilized Next.js for a robust, SEO-friendly frontend ecosystem',
            'Chose FastAPI for high-performance python processing to interface closely with GenAI',
            'Integrated real-time audio/video capture directly in the browser environment'
        ],
        tradeoffs: 'Combining video streaming, AI evaluation, and real-time proctoring creates heavy client load; optimized through chunking media buffers.',
        features: [
            'Centralized platform for TPOs, students, and companies',
            'AI-driven interview system with automated evaluation',
            'Real-time audio/video capture',
            'Proctoring and structured online assessments'
        ],
        tech: ['Next.js', 'FastAPI', 'Generative AI', 'WebRTC', 'Python'],
        learnings: 'Mastered working with Generative AI APIs, handling real-time media streams, and defining complex multi-tenant application architectures.',
        futureScope: 'Enhance the AI models to do deeper emotional/confidence analysis on candidates based on video.'
    },
    {
        id: 'multithreaded-bank',
        title: 'Concurrent Banking',
        subtitle: 'Core Java Concurrent System',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
        ),
        problem: 'Most basic banking CLI systems fail when multiple transactions (deposits/withdrawals) attempt to manipulate the same account simultaneously.',
        architecture: {
            description: 'Console-based concurrent Java system',
            flow: 'Client Threads → synchronized Methods → Shared Account Objects',
            layers: [
                { name: 'Design Pattern', detail: 'MVC-like pure Java structure leveraging OOP principles' },
                { name: 'Concurrency', detail: 'Java Threads executing simultaneous deposits/withdrawals' },
                { name: 'State', detail: 'In-memory data structures simulating persistent store' }
            ]
        },
        decisions: [
            'Used native Java multithreading to simulate real simultaneous transactions',
            'Implemented meticulous thread-safe operations to prevent race conditions',
            'Applied strict abstraction, encapsulation, and modular class design'
        ],
        tradeoffs: 'Keeping data in-memory without a real database isolates the scope to concurrency issues, which is perfect for demonstrating Core Java but not for production persistence.',
        features: [
            'Robust account management',
            'Simultaneous transaction execution',
            'Thread-safe account mutations',
            'Modular class design with OOP'
        ],
        tech: ['Core Java', 'Multithreading', 'OOP', 'Console API'],
        learnings: 'Gained profound appreciation and practical skill in managing race conditions, concurrency locking mechanisms, and robust Object-Oriented structure.',
        futureScope: 'Expand to use a SQL database and a connection pool instead of purely in-memory structures.'
    }
]

// Grid variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 50, damping: 10 } 
    },
}

function Projects() {
    return (
        <section className="projects section overflow-hidden" id="projects">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">02. Architecture</h2>
                    <p className="section-subtitle">
                        Deployments & Implementations
                    </p>
                </motion.div>

                <motion.div 
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((project, index) => (
                        <motion.article 
                            className={`project-bento-card card box-${index + 1}`} 
                            key={project.id} 
                            data-project={project.id}
                            variants={cardVariants}
                            whileHover={{ 
                                y: -10, 
                                scale: 1.02,
                                boxShadow: "0 20px 40px -10px rgba(0,240,255,0.15)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="project-card-header">
                                <motion.div 
                                    className="project-icon-large text-[var(--accent)]"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                >
                                    {project.icon}
                                </motion.div>
                                <div className="project-title-block">
                                    <div className="project-number mono text-[var(--accent-secondary)]">v1.0.{index+1}</div>
                                    <h3 className="project-title text-2xl font-bold">{project.title}</h3>
                                    <p className="project-subtitle text-gray-400">{project.subtitle}</p>
                                </div>
                            </div>

                            <div className="project-card-content mt-6">
                                <div className="project-section tech-stack">
                                    <div className="project-tech flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span className="tag bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-2 py-1 rounded text-xs" key={i}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-section flow-section mono mt-6">
                                    <h4 className="project-section-title text-sm text-[var(--accent)] mb-2">DATA_FLOW</h4>
                                    <div className="architecture-flow bg-black/50 p-3 rounded border border-white/5">
                                        <code className="text-sm text-green-400">{project.architecture.flow}</code>
                                    </div>
                                </div>

                                <div className="project-section mechanics mt-6">
                                    <h4 className="project-section-title text-sm text-[var(--accent)] mb-2">SYSTEM_MECHANICS</h4>
                                    <ul className="decisions-list list-disc list-inside text-gray-300 text-sm space-y-1">
                                        {project.decisions.slice(0, 2).map((decision, i) => (
                                            <li key={i}>{decision}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
