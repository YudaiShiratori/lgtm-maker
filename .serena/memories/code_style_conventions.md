# Code Style and Conventions

## File Naming
- Use kebab-case for file names: `user-profile.tsx`
- Component files use `.tsx` extension
- Utility files use `.ts` extension
- Test files: `*.test.ts` or `*.test.tsx` in `__tests__/` directory

## Import/Export Style
- Use ES modules syntax (import/export), not CommonJS
- Prefer destructuring imports: `import { Button } from './button'`
- Use default exports for pages and main components
- Use named exports for utilities and shared functions
- Path aliases: `~/` maps to `src/`

## TypeScript Conventions
- Use TypeScript interfaces for props definition
- Leverage type safety throughout the stack
- Use Zod for runtime validation in API routes
- No explicit `any` types (Biome enforces this)

## React/Next.js Conventions
- Use App Router patterns for routing
- Components in `src/components/` for shared, `src/app/_components/` for app-specific
- Follow React hooks rules and best practices
- Use Shadcn/UI components as base for custom UI elements

## API Development (tRPC)
- Create routers in `src/server/api/routers/`
- Use `publicProcedure` for open endpoints, `protectedProcedure` for auth
- Define input validation with Zod schemas
- Register routers in `src/server/api/root.ts`

## Styling
- Tailwind CSS for utility-first styling
- Shadcn/UI for component library
- Use `cn()` utility for conditional classes (from `lib/utils.ts`)
- Responsive design with mobile-first approach

## Code Quality Rules (Biome/Ultracite)
- Auto-formatting on save and pre-commit
- No unused variables
- Exhaustive dependencies in useEffect
- Sorted CSS classes (useSortedClasses rule)
- No explicit any types