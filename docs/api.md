# API Documentation

## 🚀 Hacktoberfest 2025 API Reference

Base URL: `http://localhost:3001/api`

### Authentication

Currently, no authentication is required for API endpoints. In production, implement proper authentication mechanisms.

## Endpoints

### Health Check

Check if the API is running.

**GET** `/health`

```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Hacktoberfest 2025 API is running! 🎃",
  "timestamp": "2025-10-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

### Statistics

Get Hacktoberfest statistics.

**GET** `/api/stats`

```bash
curl http://localhost:3001/api/stats
```

**Response:**
```json
{
  "totalPRs": 87,
  "contributors": 23,
  "repositories": 3,
  "badges": 45
}
```

### Contributors

Get list of contributors.

**GET** `/api/contributors`

```bash
curl http://localhost:3001/api/contributors
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "prs": 5,
    "avatar": "👩‍💻",
    "joined": "2025-10-01"
  }
]
```

### Projects

Get list of projects available for contribution.

**GET** `/api/projects`

```bash
curl http://localhost:3001/api/projects
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Frontend Dashboard",
    "language": "TypeScript",
    "difficulty": "Beginner",
    "issues": 12,
    "description": "React-based dashboard for Hacktoberfest statistics"
  }
]
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `200` - Success
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```