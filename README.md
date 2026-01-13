# CXentury Test Task

Simple worksheet application with multiple-choice tasks built as a monorepo project.

## Links

- Web app: https://cxntury.veiag.me/
- API: https://cxntury.veiag.me/api/
- PHPMyAdmin: https://pma-cxntury.veiag.me/ (w/o authentication for demo purposes)

## Project Structure

This is a monorepo managed with **Turborepo** and **pnpm**.

### Apps

- **`apps/web`** - Frontend application
  - React 18 + TypeScript + Vite
  - Tailwind CSS 4 + Radix UI components (Shadcn UI)
  - Session management and task workflow

- **`apps/api`** - Backend API
  - Express.js + TypeScript
  - Sequelize ORM + MySQL
  - RESTful API with session tokens and task management

### Packages

- **`packages/shared-types`** - Shared TypeScript types between frontend and backend
- **`packages/eslint-config`** - Shared ESLint configuration
- **`packages/typescript-config`** - Shared TypeScript configuration

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
**Backend:** Express.js, Sequelize, MySQL, TypeScript
**Tools:** Turborepo, pnpm, Docker

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev

# Build all apps
pnpm build
```

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
