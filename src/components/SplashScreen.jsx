import { useEffect, useState } from 'react'
import './SplashScreen.css'

function SplashScreen({ onComplete }) {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [loadingText, setLoadingText] = useState('BOOT_SEQUENCE_INIT');

    useEffect(() => {
        // Text changes
        const t1 = setTimeout(() => setLoadingText('ESTABLISHING_CONNECTION...'), 800);
        const t2 = setTimeout(() => setLoadingText('BYPASSING_MAINFRAME...'), 1600);
        const t3 = setTimeout(() => setLoadingText('ACCESS_GRANTED'), 2400);

        // Trigger fade out
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 3000);

        // Unmount
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`splash-container ${isFadingOut ? 'splash-fade-out' : ''}`}>
            <div className="splash-grid-bg"></div>
            
            <div className="splash-content">
                <div className="splash-logo-wrapper">
                    <svg className="splash-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g className="logo-group">
                            {/* The 'S' */}
                            <path 
                                className="logo-path s-path" 
                                d="M 65 30 C 65 15, 35 15, 35 30 C 35 45, 65 45, 65 60 C 65 75, 35 75, 35 60" 
                            />
                            {/* The 'K' */}
                            <path 
                                className="logo-path k-path" 
                                d="M 25 10 L 25 90 M 75 15 L 40 50 L 75 85" 
                            />
                        </g>
                    </svg>
                    <div className="splash-scanner"></div>
                </div>

                <div className="splash-terminal mono">
                    <div className="terminal-header">
                        <span className="dot hidden"></span>
                        <span className="dot hidden"></span>
                        <span className="dot hidden"></span>
                    </div>
                    <div className="terminal-body">
                        <span className="cursor">&gt;</span> {loadingText}
                        <span className="blinking-cursor">_</span>
                    </div>
                </div>

                <div className="splash-progress">
                    <div className="splash-progress-bar"></div>
                    <div className="splash-progress-glow"></div>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
