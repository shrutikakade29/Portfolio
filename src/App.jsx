import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Learning from './components/Learning'
import Contact from './components/Contact'
import SplashScreen from './components/SplashScreen'
import ParticleBackground from './components/ParticleBackground'
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Initialize Locomotive Scroll for premium smoothness
        const locomotiveScroll = new LocomotiveScroll({
            lenisOptions: {
                wrapper: window,
                content: document.documentElement,
                lerp: 0.1,
                duration: 1.2,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                smoothTouch: false,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                normalizeWheel: true,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            }
        });

        // The new version of Locomotive Scroll handles the RAF loop natively!
        return () => {
            if (locomotiveScroll) {
                locomotiveScroll.destroy();
            }
        }
    }, [])

    return (
        <div className="app">
            <ParticleBackground />

            {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
            ) : (
                <div className="animate-fade-in-up">
                    <Navigation />
                    <main>
                        {/* 
                          Components are loaded synchronously.
                          Framer Motion's whileInView already handles the lazy appearance
                          without changing the document's physical scroll height. 
                          This stops the Lenis scrollbar from glitching!
                        */}
                        <Hero />
                        <About />
                        <Projects />
                        <Skills />
                        <Learning />
                        <Contact />
                    </main>
                </div>
            )}
        </div>
    )
}

export default App
