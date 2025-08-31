# Project Overview: LGTM Maker

## Purpose
This is an LGTM (Looks Good To Me) image generator web application. Users can upload images or provide image URLs to generate standardized LGTM images (1200x630 PNG) with a black border and white "LGTM" text overlay.

## Core Features
- Single-page application with file upload and URL input
- Automatic image processing: background resize (cover fit) + black border (24px) + white "LGTM" text
- Outputs: auto-download, markdown copy, preview display, and "open image" link
- No external AI dependencies - uses SVG overlay → Resvg → Sharp for composition

## Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **API**: tRPC 11 with Zod validation 
- **Image Processing**: @resvg/resvg-js (SVG→PNG), Sharp (resize/composition)
- **Font**: Inter (embedded in SVG as WOFF2 base64)
- **Quality Tools**: Biome (linting/formatting), Ultracite preset, Lefthook (git hooks)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Package Manager**: Bun

## Project Structure
Based on T3 Stack (tRPC + Next.js + TypeScript) with additional image processing capabilities.

## Development Environment
- Platform: Darwin (macOS)
- Node.js runtime required for server-side image processing
- All operations use bun as package manager