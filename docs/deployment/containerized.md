# Containerized Deployment (Docker)

This guide explains how to run parts of this mono-repo using Docker and docker-compose. It focuses on the `backend/` and `frontend/` common layout but can be adapted for other subprojects.

## Prerequisites
- Docker Desktop (Windows)
- docker-compose (bundled with Docker Desktop)

## 1) Build Docker images (example for backend)

Create a `backend/Dockerfile` if not present. Example:

```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

From repo root:

```powershell
docker build -f backend/Dockerfile -t hacktober-backend:latest ./backend
```

## 2) docker-compose example

Create a `docker-compose.yml` in repo root (or use existing). Example minimal compose that runs a backend and Postgres:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: pgpass
      POSTGRES_DB: hacktober
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - '5432:5432'

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - PORT=3000
      - DATABASE_URL=postgres://pguser:pgpass@postgres:5432/hacktober
    depends_on:
      - postgres
    ports:
      - '3000:3000'

volumes:
  pgdata:
```

Start services:

```powershell
docker-compose up --build
```

Stop services:

```powershell
docker-compose down -v
```

## 3) Health checks & logs

- View logs: `docker-compose logs -f backend`
- See running containers: `docker ps`
- Inspect container: `docker exec -it <container> sh`

## Troubleshooting
- Image build failures: check `docker build` output, missing files, or mismatched working dir. Use `--no-cache` to force fresh layers.
- Database connection refused: ensure service name in `DATABASE_URL` matches compose service (`postgres`). Use `depends_on` and/or healthchecks to wait for DB readiness.
- Permission issues on Windows file sharing: enable file sharing for drive in Docker Desktop settings.

## Tips
- Keep development and production Dockerfiles separate (use multi-stage builds and avoid dev dependencies in production).
- Use Docker secrets or environment variable management (e.g., `.env` with docker-compose) for sensitive values.
- If your repo has many small projects, consider per-subproject compose files and an umbrella compose file to run multiple services together.