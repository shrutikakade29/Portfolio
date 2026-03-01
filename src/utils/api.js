const API_BASE_URL = import.meta.env.PROD 
    ? 'https://portfolio-backend-7n91.onrender.com'
    : (import.meta.env.VITE_API_URL || 'http://localhost:8000')

/**
 * Fetch system status from backend
 * Used by 3D visualization to show component health
 */
export async function fetchSystemStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/status`)
        if (!response.ok) {
            console.warn('API offline, using fallback data')
            return getFallbackStatus()
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.warn('API error:', error.message)
        return getFallbackStatus()
    }
}

/**
 * Fetch all projects
 */
export async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects`)
        if (!response.ok) {
            return getFallbackProjects()
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.warn('API error:', error.message)
        return getFallbackProjects()
    }
}

/**
 * Fetch current learning focus
 */
export async function fetchCurrentFocus() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/focus`)
        if (!response.ok) {
            return getFallbackFocus()
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.warn('API error:', error.message)
        return getFallbackFocus()
    }
}

/**
 * Check if API is available
 */
export async function checkAPIHealth() {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 2000)

        const response = await fetch(`${API_BASE_URL}/api/health`, {
            signal: controller.signal
        })

        clearTimeout(timeoutId)
        return response.ok
    } catch (error) {
        return false
    }
}

/**
 * Polling utility - calls a function at intervals
 */
export function startPolling(fetchFn, callback, intervalMs = 5000) {
    // Initial fetch
    fetchFn().then(callback)

    // Periodic polling
    const intervalId = setInterval(async () => {
        const data = await fetchFn()
        callback(data)
    }, intervalMs)

    // Return cleanup function
    return () => clearInterval(intervalId)
}

// Fallback data when API is offline
function getFallbackStatus() {
    return {
        status: 'offline',
        components: {
            frontend: { status: 'healthy', load: 0.3 },
            backend: { status: 'offline', load: 0 },
            database: { status: 'unknown', load: 0 },
            ai_services: { status: 'unknown', load: 0 }
        },
        uptime_hours: 0,
        requests_today: 0,
        avg_response_time_ms: 0,
        timestamp: new Date().toISOString()
    }
}

function getFallbackProjects() {
    return {
        projects: [],
        total_count: 0,
        active_count: 0,
        timestamp: new Date().toISOString()
    }
}

function getFallbackFocus() {
    return {
        focus: {
            primary: 'Daily DSA Practice',
            secondary: 'Building Backend Systems',
            learning: 'System Design',
            streak_days: 0,
            problems_solved_this_week: 0,
            current_topic: 'Unknown'
        },
        timestamp: new Date().toISOString()
    }
}
