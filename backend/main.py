from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List, Dict
import random

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS configuration for production and development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # Allow all origins for now - can be restricted later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
PROJECTS_DATA = [
    {
        "id": "aura",
        "name": "Aura",
        "status": "active",
        "type": "ai_platform",
        "activity_level": 0.85,
        "last_commit": "2024-12-28T10:30:00Z",
        "tech_stack": ["Supabase", "Generative AI", "React"],
        "backend_focus": True
    },
    {
        "id": "petguard",
        "name": "PetGuard",
        "status": "maintenance",
        "type": "iot_app",
        "activity_level": 0.45,
        "last_commit": "2024-12-15T14:20:00Z",
        "tech_stack": ["Supabase", "React", "REST APIs"],
        "backend_focus": True
    },
    {
        "id": "gyansetu",
        "name": "GyanSetu",
        "status": "completed",
        "type": "content_platform",
        "activity_level": 0.2,
        "last_commit": "2024-11-30T09:15:00Z",
        "tech_stack": ["MongoDB", "Express", "React", "Node.js"],
        "backend_focus": True
    }
]

CURRENT_FOCUS = {
    "primary": "Daily DSA Practice",
    "secondary": "Building FastAPI Backend Systems",
    "learning": "System Design Fundamentals",
    "streak_days": 45,
    "problems_solved_this_week": 12,
    "current_topic": "Dynamic Programming"
}

@app.get("/")
async def root():
    """Root endpoint - API info"""
    return {
        "name": "Portfolio Backend API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": [
            "/api/projects",
            "/api/status",
            "/api/focus"
        ]
    }

@app.get("/api/projects")
async def get_projects() -> List[Dict]:
    """
    Get all projects with their current status and metadata.
    Used by 3D visualization to show active/idle states.
    """
    return {
        "projects": PROJECTS_DATA,
        "total_count": len(PROJECTS_DATA),
        "active_count": len([p for p in PROJECTS_DATA if p["status"] == "active"]),
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str) -> Dict:
    """Get specific project details"""
    project = next((p for p in PROJECTS_DATA if p["id"] == project_id), None)
    if project:
        return {
            "project": project,
            "timestamp": datetime.utcnow().isoformat()
        }
    return {"error": "Project not found"}

@app.get("/api/status")
async def get_system_status() -> Dict:
    """
    Get overall system status.
    The 3D model uses this to show system health via pulsing/colors.
    """
    # Simulate some realistic metrics
    return {
        "status": "operational",
        "components": {
            "frontend": {"status": "healthy", "load": random.uniform(0.2, 0.4)},
            "backend": {"status": "healthy", "load": random.uniform(0.3, 0.5)},
            "database": {"status": "healthy", "load": random.uniform(0.1, 0.3)},
            "ai_services": {"status": "healthy", "load": random.uniform(0.4, 0.7)}
        },
        "uptime_hours": 720,
        "requests_today": random.randint(100, 500),
        "avg_response_time_ms": random.uniform(80, 150),
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/focus")
async def get_current_focus() -> Dict:
    """
    Get current learning focus and activity.
    Shows what the developer is actively working on.
    """
    return {
        "focus": CURRENT_FOCUS,
        "active_since": "2024-11-15T00:00:00Z",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/health")
async def health_check():
    """Simple health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Use PORT environment variable for production (Render provides this)
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
