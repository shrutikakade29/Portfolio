import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const contactLinks = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        title: 'Email',
        value: 'kakadeshruti29@gmail.com',
        href: 'mailto:kakadeshruti29@gmail.com'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
        title: 'GitHub',
        value: 'github.com/shrutikakade29',
        href: 'https://github.com/shrutikakade29'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
        title: 'LinkedIn',
        value: 'linkedin.com/in/shruti-kakade-a6b3032b7',
        href: 'https://www.linkedin.com/in/shruti-kakade-a6b3032b7/'
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
}

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = `Portfolio Contact from ${formData.name}`
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
        window.location.href = `mailto:kakadeshruti29@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <>
            <section className="contact section overflow-hidden" id="contact">
                <div className="container">
                    <motion.div 
                        className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <motion.div className="contact-info" variants={itemVariants}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Let's <span className="text-[var(--accent)] font-mono font-light">Connect</span></h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                                I'm currently expanding my network and open to discussing full-stack and backend opportunities.
                                Feel free to reach out if you'd like to collaborate or just chat!
                            </p>

                            <div className="contact-links space-y-4">
                                {contactLinks.map((link, index) => (
                                    <motion.a
                                        variants={itemVariants}
                                        whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(0, 240, 255, 0.3)" }}
                                        href={link.href}
                                        className="contact-link flex items-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all relative overflow-hidden group"
                                        key={index}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/0 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="contact-link-icon text-[var(--accent)] mr-4 relative z-10">{link.icon}</div>
                                        <div className="contact-link-content relative z-10">
                                            <h4 className="text-white font-medium">{link.title}</h4>
                                            <p className="text-gray-400 text-sm mono">{link.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            className="contact-form-wrapper p-8 rounded-2xl bg-black/40 border border-white/10 shadow-2xl relative"
                            variants={itemVariants}
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl"></div>
                            
                            <h3 className="contact-form-title text-2xl font-bold mb-6 text-white mono mb-8">Send a Message</h3>
                            <form className="contact-form space-y-6" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label block text-sm font-medium text-gray-400 mb-2 mono" htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label block text-sm font-medium text-gray-400 mb-2 mono" htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label block text-sm font-medium text-gray-400 mb-2 mono" htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-32 resize-none focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        placeholder="Let's build something..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className="btn btn-primary w-full flex justify-center items-center gap-2 py-4 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <footer className="footer py-8 border-t border-white/5 mt-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent"></div>
                <div className="container">
                    <div className="footer-content flex flex-col md:flex-row justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                        <p className="footer-text text-sm mono mb-4 md:mb-0">
                            © 2024 Shruti Kakade. Built with <span className="text-[var(--accent)]">care</span>.
                        </p>
                        <div className="footer-links">
                            <a href="#hero" className="footer-link text-sm mono hover:text-[var(--accent)] transition-colors">Back to Top ↑</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Contact
