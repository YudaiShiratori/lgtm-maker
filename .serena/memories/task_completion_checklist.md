# Task Completion Checklist

## Before Committing Code
1. **Type Check**: Run `bun run typecheck` to ensure no TypeScript errors
2. **Code Quality**: Run `bun run check:write` to format and fix linting issues
3. **Testing**: 
   - Run `bun run test` for unit tests
   - Run `bun run test:e2e` for end-to-end tests if applicable
4. **Build Verification**: Run `bun run build` to ensure production build succeeds

## Git Workflow
- Pre-commit hooks automatically run:
  - Biome check and formatting on staged files
  - TypeScript checking on staged .ts/.tsx files
- Use conventional commit messages
- Reference GitHub issues in commits when applicable

## Development Best Practices
- Follow TDD (Red-Green-Refactor) methodology
- Write descriptive test names explaining behavior
- Update documentation if structure changes
- Ensure backward compatibility or update references
- Test both happy paths and error cases

## Quality Gates
- All TypeScript errors must be resolved
- All tests must pass
- Code must build successfully
- Pre-commit hooks must pass
- No console errors in development

## Final Verification
- Test the feature in browser
- Verify responsive design works
- Check accessibility basics
- Ensure error handling works properly
- Validate API endpoints if applicable