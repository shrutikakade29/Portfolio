import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    Icosahedron,
    Octahedron,
    Points,
    PointMaterial
} from '@react-three/drei'
import * as THREE from 'three'
import { fetchSystemStatus, startPolling } from '../utils/api'
import './SystemFlow.css'

function DataNexus({ isActive }) {
    const outerNodes = useRef()
    const innerCore = useRef()
    const shellRef = useRef()
    
    // Create random positions for nodes
    const nodeCount = 40 // Reduced from 80 for much better performance
    const nodePositions = useMemo(() => {
        const positions = []
        for (let i = 0; i < nodeCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / nodeCount)
            const theta = Math.sqrt(nodeCount * Math.PI) * phi
            positions.push([
                3.5 * Math.cos(theta) * Math.sin(phi),
                3.5 * Math.sin(theta) * Math.sin(phi),
                3.5 * Math.cos(phi)
            ])
        }
        return positions
    }, [nodeCount])

    useFrame((state) => {
        // Cache elapsed time to avoid object lookups
        const t = state.clock.elapsedTime
        
        // Direct mutations without conditional checks for slightly faster loop Execution
        if(outerNodes.current) {
            outerNodes.current.rotation.y = t * 0.15
            outerNodes.current.rotation.z = t * 0.08
        }
        
        if(innerCore.current) {
            innerCore.current.rotation.x = t * 0.8
            innerCore.current.rotation.y = t * 0.4
            
            // Only update scale every few frames or heavily math down
            // But for visual integrity we keep it simple
            const scale = 1 + Math.sin(t * 3) * 0.1
            innerCore.current.scale.set(scale, scale, scale)
        }
        
        if(shellRef.current) {
            shellRef.current.rotation.y = -t * 0.1
            shellRef.current.rotation.x = t * 0.05
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group scale={0.9} position={[0, -0.5, 0]}>
                {/* Outer Node Network */}
                <group ref={outerNodes}>
                    {nodePositions.map((pos, i) => (
                        <mesh key={i} position={pos}>
                            <boxGeometry args={[0.15, 0.15, 0.15]} />
                            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={isActive ? 1.5 : 0.5} />
                        </mesh>
                    ))}
                    <Icosahedron args={[3.4, 1]}>
                        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.08} />
                    </Icosahedron>
                </group>

                {/* Inner Protective Shell */}
                <Icosahedron ref={shellRef} args={[2.2, 1]}>
                    <meshStandardMaterial 
                        color="#050510" 
                        emissive="#2563eb"
                        emissiveIntensity={0.6}
                        wireframe={true}
                        transparent
                        opacity={0.4}
                    />
                </Icosahedron>

                {/* Pulsating Core */}
                <Octahedron ref={innerCore} args={[1.2, 0]}>
                    <meshStandardMaterial 
                        color="#ffffff" 
                        emissive="#38bdf8"
                        emissiveIntensity={isActive ? 2.5 : 1}
                        roughness={0}
                        metalness={1}
                        wireframe={true}
                    />
                </Octahedron>
            </group>
        </Float>
    )
}

function DetailedParticleField({ count = 80 }) { // Reduced count
    const points = useRef()
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 40
        }
        return positions
    }, [count])

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={true}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    )
}

function CyberScene({ scrollFactor, isActiveSection }) {
    const groupRef = useRef()

    useFrame((state, delta) => {
        // If not in view, drop out early to save intense computations
        if (!isActiveSection) return;

        if (groupRef.current) {
            groupRef.current.position.x = 3.8
            // Use lerp for smoother scroll transitions
            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                scrollFactor * 2.0,
                0.1
            )
            
            // Mouse tracking with lerp to prevent snappy jank
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.1, 0.1)
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.1, 0.1)
        }
    })

    return (
        <group ref={groupRef}>
            <DetailedParticleField />
            <DataNexus isActive={isActiveSection} />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 10, 5]} intensity={1.5} color="#00f0ff" />
            <pointLight position={[-5, -10, -5]} intensity={1} color="#2563eb" />
        </group>
    )
}

function SystemFlow() {
    const [systemData, setSystemData] = useState(null)
    const [apiStatus, setApiStatus] = useState('checking')
    const [statusMessage, setStatusMessage] = useState('SYS_INIT...')
    const [scrollFactor, setScrollFactor] = useState(0)
    const [isInView, setIsInView] = useState(true)
    const { supported, reducedMotion, isMobile } = useWebGLSupport()

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Update scroll factor safely
                    const factor = window.scrollY / (Math.max(document.documentElement.scrollHeight - window.innerHeight, 1))
                    setScrollFactor(Math.min(factor, 1))

                    // Efficient visibility check
                    const heroElement = document.getElementById('hero')
                    if (heroElement) {
                        const rect = heroElement.getBoundingClientRect()
                        setIsInView(rect.bottom > -100) // Keep running slightly offscreen
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        const cleanupPoll = startPolling(
            fetchSystemStatus,
            (data) => {
                setSystemData(data)
                const isOnline = data.status !== 'offline'
                setApiStatus(isOnline ? 'online' : 'offline')
                if (isOnline) {
                    setStatusMessage('SYSTEM_ACTIVE')
                    setTimeout(() => setStatusMessage('ALLOCATION_OPTIMAL'), 3000)
                } else {
                    setStatusMessage('OFFLINE')
                }
            },
            isMobile ? 15000 : 10000 // Slowed down polling intervals
        )

        return () => {
            window.removeEventListener('scroll', handleScroll)
            cleanupPoll()
        }
    }, [isMobile])

    if (!supported || reducedMotion) {
        return <FallbackSVG />
    }

    return (
        <div className="system-flow-container pointer-events-none">
            {/* The canvas itself can cause lag if dpr is too high. Bound it to max 1.5 */}
            <Canvas 
                dpr={[1, 1.5]} 
                performance={{ min: 0.5 }}
                frameloop={isInView ? 'always' : 'demand'}
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
            >
                <Suspense fallback={null}>
                    <CyberScene
                        scrollFactor={scrollFactor}
                        isActiveSection={isInView}
                    />
                </Suspense>
            </Canvas>

            <div className="system-flow-status">
                <div className={`status-dot status-${apiStatus}`}></div>
                <div className="status-info mono">
                    <span className="status-text">
                        {apiStatus === 'online' ? '[ONLINE]' : '[CONNECTING]'}
                    </span>
                    <span className="status-micro">{statusMessage}</span>
                </div>
            </div>

            <div className="engineering-overlay mono">
                <div className="spec-item">MODEL: DATA_NEXUS_V3</div>
                <div className="spec-item">TRACER: ACTIVE</div>
                <div className="spec-item">ENV: PRODUCTION</div>
            </div>
        </div>
    )
}

function FallbackSVG() {
    return (
        <div className="system-flow-fallback">
            <svg viewBox="0 0 100 100" width="100" height="100" opacity="0.4">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" fill="#a855f7" opacity="0.5" />
            </svg>
        </div>
    )
}

function useWebGLSupport() {
    const [supported, setSupported] = useState(true)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            setSupported(!!gl)
        } catch (e) {
            setSupported(false)
        }
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)
        const handler = (e) => setReducedMotion(e.matches)
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handler)
        }
        
        const mobileQuery = window.matchMedia('(max-width: 768px)')
        setIsMobile(mobileQuery.matches)
        const mobileHandler = (e) => setIsMobile(e.matches)
        if (mobileQuery.addEventListener) {
            mobileQuery.addEventListener('change', mobileHandler)
        }
        
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handler)
            }
            if (mobileQuery.removeEventListener) {
                mobileQuery.removeEventListener('change', mobileHandler)
            }
        }
    }, [])

    return { supported, reducedMotion, isMobile }
}

export default SystemFlow