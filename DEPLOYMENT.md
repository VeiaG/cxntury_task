# Deployment Guide

This project uses GitHub Actions for automated deployment with **atomic deployment** - either everything deploys successfully or nothing deploys.

## Architecture

- **API**: Built with `@vercel/ncc` (single bundle with all dependencies) then packaged as Docker image
- **Frontend**: Built as static files and deployed via FTP
- **Monorepo**: Uses Turborepo for efficient parallel builds
- **No double build**: Turbo builds everything, Docker just copies pre-built files

## Atomic Deployment Flow

1. **Build Stage**: Turbo builds both API and frontend
   - If either fails → **STOP** (nothing deploys)
   - If both succeed → Continue

2. **Docker Stage**: Build and push API Docker image
   - If fails → **STOP** (nothing deploys)
   - If succeeds → Continue

3. **Deploy Stage**: Deploy frontend via FTP
   - Only runs if all previous stages succeeded
   - If fails → API image is pushed but can be rolled back

## Required GitHub Secrets

Configure these secrets in: **Settings → Secrets and variables → Actions**

### Docker Hub Secrets

```
DOCKER_USERNAME          # Docker Hub username
DOCKER_PASSWORD          # Docker Hub password/token
```

### FTP Deployment Secrets

```
FTP_SERVER              # FTP server hostname
FTP_USERNAME            # FTP username
FTP_PASSWORD            # FTP password
```

### Environment Variables

```
VITE_API_BASE_URL       # Production API URL (e.g., https://api.example.com/api)
```

## Docker Image

The workflow builds and pushes to: **veiag/cxntury-api:latest**

## Local Development

### API

```bash
# Copy environment file
cp apps/api/.env.example apps/api/.env

# Edit apps/api/.env with your database credentials

# Start development server
pnpm dev
```

### Frontend

```bash
# Copy environment file
cp apps/web/.env.example apps/web/.env.local

# Edit apps/web/.env.local if needed (default: http://localhost:3001/api)

# Start development server
pnpm dev
```

## Building Locally

### Build everything with Turbo

```bash
pnpm build
```

### Build specific app

```bash
# Build API only
pnpm turbo build --filter=@repo/api

# Build frontend only
pnpm turbo build --filter=web
```

### Build Docker image locally

**Important**: Build API with Turbo first, then Docker:

```bash
# Step 1: Build API with ncc (creates bundled dist/index.js)
pnpm turbo build --filter=@repo/api

# Step 2: Build Docker image (just copies the bundle)
docker build -f apps/api/Dockerfile -t cxntury-api:local .
```

## Manual Deployment

### Deploy API Docker image

```bash
# Build
docker build -f apps/api/Dockerfile -t veiag/cxntury-api:latest .

# Push
docker push veiag/cxntury-api:latest

# Run on server
docker run -d \
  -p 3001:3001 \
  -e DB_HOST=your-db-host \
  -e DB_USER=your-db-user \
  -e DB_PASSWORD=your-db-password \
  -e DB_NAME=your-db-name \
  veiag/cxntury-api:latest
```

### Deploy Frontend via FTP

```bash
# Build
cd apps/web
pnpm build

# Upload dist/ folder to your FTP server
```

## Troubleshooting

### Build fails but unclear why

Check individual app builds:
```bash
cd apps/api && pnpm build
cd apps/web && pnpm build
```

### Docker build fails

Ensure you're building from **repository root** (not apps/api):
```bash
docker build -f apps/api/Dockerfile .
```

### Frontend shows connection errors

Check `VITE_API_BASE_URL` in build logs - it's baked into the build at build-time.

## Workflow Triggers

- **GitHub Release**: Automatically triggers when you publish a new release
  - Go to Releases → Draft a new release → Publish
- **Manual**: Go to Actions → Build and Deploy → Run workflow
