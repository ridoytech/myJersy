# Myjarsey Monorepo

Enterprise-grade full-stack platform built with Turborepo, pnpm workspaces, and strictly typed TypeScript.

## Tech Stack Overview

- **Language:** TypeScript 5.8+ (Strict Mode enabled across all workspaces)
- **Frontend (`apps/web`):** Next.js 16.3.8 (App Router), Tailwind CSS v4, shadcn/ui
- **Backend (`apps/api`):** NestJS 12.x ESM architecture
- **Runtime:** Node.js 24 LTS
- **Database (`packages/database`):** PostgreSQL 18 + Prisma ORM
- **Validation (`packages/shared`):** Zod schemas + Standard Schema integration
- **Queues & Caching:** Redis + BullMQ background processing
- **Secure File Storage:** Private server storage (`storage/uploads`), outside public web root, streamed via authenticated API endpoint
- **Tests:** Vitest + Supertest
- **Tooling & CI:** pnpm workspaces, Turborepo, Prettier, ESLint, GitHub Actions

---

## Repository Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI (lint, type-check, test)
├── apps/
│   ├── api/                     # NestJS 12.x ESM Backend
│   │   ├── src/
│   │   │   ├── common/pipes/    # Standard Schema Validation Pipe
│   │   │   ├── files/           # Private file storage & streaming controller
│   │   │   ├── queues/          # BullMQ & Redis queues
│   │   │   ├── app.controller.ts
│   │   │   └── main.ts
│   │   └── test/                # Supertest + Vitest E2E tests
│   └── web/                     # Next.js 16.3.8 App Router Frontend
│       ├── src/app/             # Pages, Layouts, Tailwind styling
│       ├── src/components/ui/   # shadcn/ui components (Button, Card, Badge)
│       └── components.json      # shadcn configuration
├── packages/
│   ├── database/                # Prisma client & PostgreSQL schema
│   │   └── prisma/schema.prisma
│   ├── shared/                  # Shared Zod schemas (Auth, File, etc.)
│   └── tsconfig/                # Strict base TypeScript configurations
├── storage/
│   └── uploads/                 # Private server file directory (outside web root)
├── .env.example                 # Environment variables specification
├── pnpm-workspace.yaml          # pnpm workspace definition
└── turbo.json                   # Turborepo task pipeline
```

---

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Generate Database Client
```bash
pnpm run db:generate
```

### 4. Run Development Servers
```bash
pnpm run dev
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api`

### 5. Run Tests & Validation
```bash
pnpm run test        # Runs Vitest + Supertest
pnpm run type-check  # Validates strict TypeScript types
pnpm run lint        # Code quality validation
```
