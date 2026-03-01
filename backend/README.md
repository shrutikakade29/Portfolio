# Portfolio Backend API

FastAPI backend providing live data for the portfolio website.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

Server will start at `http://localhost:8000`

## API Endpoints

- `GET /api/projects` - Get all projects with status
- `GET /api/projects/{id}` - Get specific project
- `GET /api/status` - Get system component status
- `GET /api/focus` - Get current learning focus
- `GET /api/health` - Health check

## Auto-docs

Visit `http://localhost:8000/docs` for interactive API documentation.
