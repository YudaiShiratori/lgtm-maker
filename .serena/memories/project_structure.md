# Project Structure

## Root Directory
```
lgtm-maker/
├── src/                    # Main source code
├── public/                 # Static assets
├── __tests__/             # Unit tests
├── e2e/                   # End-to-end tests
├── docs/                  # Documentation
├── .github/               # GitHub workflows
├── package.json           # Dependencies and scripts
├── CLAUDE.md              # Project instructions
├── biome.jsonc           # Biome configuration (extends Ultracite)
├── lefthook.yml          # Git hooks configuration
├── components.json       # Shadcn/UI configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vitest.config.ts      # Vitest configuration
└── playwright.config.ts  # Playwright configuration
```

## Source Structure (`src/`)
```
src/
├── app/                   # Next.js App Router
│   ├── _components/       # App-specific components
│   ├── api/              # API routes
│   │   └── trpc/         # tRPC API endpoints
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Shared components
│   └── ui/              # Shadcn/UI components
├── server/              # Server-side code
│   └── api/             # tRPC routers and procedures
├── trpc/               # tRPC client configuration
├── lib/                # Utility functions
├── styles/             # Global styles
└── env.js              # Environment variables
```

## Key Configuration Files
- **biome.jsonc**: Code formatting/linting (extends Ultracite preset)
- **lefthook.yml**: Git hooks for pre-commit quality checks
- **components.json**: Shadcn/UI component configuration
- **CLAUDE.md**: Comprehensive development guidelines and instructions