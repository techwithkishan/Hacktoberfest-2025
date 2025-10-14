# Deployment Guides

This folder contains deployment guides for different environments:

- `local.md` — Run and develop the project locally (Windows PowerShell examples).
- `containerized.md` — Docker and docker-compose instructions for containerized deployment.
- `cloud.md` — Guidance for deploying to cloud platforms (container-based recommendations and examples).

Pick the guide that matches your target environment and follow the steps. If you have a multi-service setup in this repository (for example `backend/`, `frontend/`, or Python scripts), repeat the appropriate steps per service and use the containerized guide to run them together with `docker-compose`.

If you need a provider-specific cookbook (AWS/GCP/Azure) or Kubernetes manifests, open an issue or request an extension and I can add tailored examples.