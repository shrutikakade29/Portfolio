import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Skills.css'

import { 
    Coffee, FileJson, Hash, Braces, TerminalSquare, 
    Atom, Server, Workflow, FileCode, SquareDashedBottomCode, 
    Database, Table, HardDrive, Blocks, Lock, 
    GitBranch, Box, CheckCircle, MonitorDot, Wrench, 
    Layers, Cpu, LayoutTemplate, ShieldAlert, Network
} from 'lucide-react'

const skillCategories = [
    {
        id: 'languages',
        title: 'Languages',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        skills: [
            { name: 'Java (Core)', icon: <Coffee size={24} /> },
            { name: 'Python', icon: <TerminalSquare size={24} /> },
            { name: 'C++', icon: <Hash size={24} /> },
            { name: 'JavaScript (ES6+)', icon: <Braces size={24} /> },
            { name: 'C', icon: <FileJson size={24} /> }
        ]
    },
    {
        id: 'web',
        title: 'Web Dev',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        skills: [
            { name: 'React.js', icon: <Atom size={24} /> },
            { name: 'Next.js', icon: <LayoutTemplate size={24} /> },
            { name: 'Node.js', icon: <Server size={24} /> },
            { name: 'Express.js', icon: <Workflow size={24} /> },
            { name: 'FastAPI', icon: <SquareDashedBottomCode size={24} /> }
        ]
    },
    {
        id: 'databases',
        title: 'Databases',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
        skills: [
            { name: 'MySQL', icon: <Table size={24} /> },
            { name: 'MongoDB', icon: <Database size={24} /> },
            { name: 'Supabase', icon: <HardDrive size={24} /> },
            { name: 'Firebase', icon: <Blocks size={24} /> },
            { name: 'Data Modeling', icon: <Layers size={24} /> }
        ]
    },
    {
        id: 'core',
        title: 'Core CS',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        skills: [
            { name: 'DSA', icon: <Workflow size={24} /> },
            { name: 'OOP', icon: <Box size={24} /> },
            { name: 'DBMS', icon: <Database size={24} /> },
            { name: 'Multithreading', icon: <Cpu size={24} /> },
            { name: 'System Design', icon: <Network size={24} /> }
        ]
    },
    {
        id: 'tools',
        title: 'Tools & DevOps',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        skills: [
            { name: 'Git / GitHub', icon: <GitBranch size={24} /> },
            { name: 'Docker', icon: <Box size={24} /> },
            { name: 'Postman', icon: <CheckCircle size={24} /> },
            { name: 'VS Code', icon: <FileCode size={24} /> },
            { name: 'Linux/Bash', icon: <MonitorDot size={24} /> }
        ]
    }
]

// Variants
const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 15 }
    }
}

const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
}

function Skills() {
    const [activeCategoryId, setActiveCategoryId] = useState(skillCategories[0].id)
    const activeCategory = skillCategories.find(c => c.id === activeCategoryId)

    return (
        <section className="skills section overflow-hidden" id="skills">
            <motion.div 
                className="container skill-container-wrapper"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="section-header">
                    <h2 className="section-title">03. Core_Stack</h2>
                    <p className="section-subtitle">Technical Proficiencies</p>
                </div>

                <div className="skills-terminal card shadow-2xl shadow-[var(--accent-glow)]/10">
                    <div className="skills-sidebar">
                        {skillCategories.map((category) => (
                            <button 
                                key={category.id} 
                                className={`skill-tab relative ${activeCategoryId === category.id ? 'active text-[var(--accent)] font-bold' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveCategoryId(category.id)}
                            >
                                <span className="skill-tab-icon z-10">{category.icon}</span>
                                <span className="skill-tab-title flex-1 text-left z-10">{category.title}</span>
                                {activeCategoryId === category.id && (
                                    <motion.div 
                                        layoutId="active-tab-indicator"
                                        className="absolute inset-0 bg-[#00f0ff]/10 border-l-4 border-l-[#00f0ff] rounded-r-md"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    
                    <div className="skills-display relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategoryId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                <div className="skills-display-bg-icon opacity-5 absolute right-0 top-0 translate-x-[20%] translate-y-[-20%] pointer-events-none text-9xl">
                                    {activeCategory.icon}
                                </div>
                                
                                <div className="skills-display-header mb-8">
                                    <h3 className="mono text-2xl text-white">{activeCategory.title}</h3>
                                    <div className="header-line bg-gradient-to-r from-[var(--accent)] to-transparent h-[1px] w-full mt-2"></div>
                                </div>

                                <motion.div 
                                    className="skills-nodes-container grid grid-cols-2 md:grid-cols-3 gap-4"
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        show: { transition: { staggerChildren: 0.05 } }
                                    }}
                                >
                                    {activeCategory.skills.map((skill, index) => (
                                        <motion.div 
                                            variants={nodeVariants}
                                            className="skill-node bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-3 backdrop-blur-sm hover:bg-white/10 hover:border-[var(--accent)]/50 transition-colors" 
                                            key={index}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                        >
                                            <div className="skill-node-icon text-[var(--accent)]">{skill.icon}</div>
                                            <div className="skill-node-name mono text-sm font-medium text-center">{skill.name}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Skills
