# Essential Development Commands

## Package Management (Bun)
- `bun install` - Install dependencies
- `bun add {packages}` - Add new packages
- `bun remove {packages}` - Remove packages
- `bunx --bun shadcn@latest add {components}` - Add shadcn/ui components

## Development Server
- `bun run dev` - Start development server with Turbo (default port 3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run preview` - Build and start production server

## Code Quality & Formatting
- `bun run check` - Check code quality with Biome (extends Ultracite)
- `bun run check:write` - Auto-fix code issues with Biome
- `bun run check:unsafe` - Apply unsafe fixes with Biome
- `bun run typecheck` - Run TypeScript type checking (no emit)

## Testing
- `bun run test` - Run unit tests with Vitest
- `bun run test:watch` - Run Vitest in watch mode
- `bun run test:e2e` - Run E2E tests with Playwright
- `bun run test:e2e:ui` - Run Playwright tests with UI
- `bun run test:e2e:ci` - Run Playwright with trace for CI
- `bunx playwright install` - Install Playwright browsers

## Git Hooks
- `bunx lefthook install` - Install git hooks for automatic formatting
- Pre-commit hooks run Biome check/fix and TypeScript checking automatically

## GitHub Operations (if available)
- `gh issue list` - List GitHub issues
- `gh pr list` - List pull requests
- `gh pr create` - Create new pull request
- `gh issue create` - Create new issue

## System Commands (macOS/Darwin)
- Standard Unix commands: `ls`, `cd`, `grep`, `find`
- `which {command}` - Find command location
- `brew install {package}` - Install packages via Homebrew