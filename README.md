# Shellhacks 2025 - Founder Connect

Collaborative hackathon project: a "Tinder-style" mobile app where founders swipe, match, and chat.

## Current Focus
- Hackathon MVP: onboarding, swipe deck, mutual matches, chat, push notifications
- Smooth demo flow: seed profiles + scripted walkthrough
- Shared repo for app code, landing page, and docs

## Tech Stack
- Mobile: Expo (React Native) + NativeWind + Lucide icons
- Backend: Supabase (Postgres, Auth, Storage, Realtime, PostGIS)
- Tooling: TypeScript, EAS builds, PostHog analytics, Sentry monitoring
- Landing Page: Next.js on Vercel

## Prerequisites
- Node.js 20 LTS + package manager (`npm` or `yarn`)
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- Supabase CLI (`npm install -g supabase` or Homebrew install)
- Git and optional GitHub CLI (`gh`)
- iOS Simulator (Xcode) and/or Android Studio with emulator
- VS Code (recommended) with React Native + TypeScript extensions

## Project Structure (planned)
- `apps/mobile` - Expo project
- `apps/landing` - Vercel landing/waitlist site
- `supabase` - migrations, seed scripts, SQL policies
- `docs` - design assets, demo script, planning notes

## Getting Started
1. Install prerequisites above.
2. Clone repo and install deps once structure lands.
3. Ask in `#dev-setup` (Slack) for shared Supabase credentials and `.env` files.
4. Run `yarn dev` (mobile) and `yarn web` (landing) once projects are scaffolded.

## Environment & Secrets
- `apps/mobile/.env`: Supabase URL/key, PostHog key, Sentry DSN, Expo push key
- `supabase/.env`: service role key (keep local only)
- Store secrets in 1Password vault (`Shellhacks 2025`) and update this table as we add more.

## Workflow
- Branches: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`
- Open PRs early, request review from at least one teammate
- Keep README and `/docs` updated with new setup steps or processes
- Track tasks on GitHub Projects board `Shellhacks2025`

## Demo Script (working draft)
1. Login (email magic link or Google)
2. Complete profile onboarding (photo, industry, stage, location)
3. Swipe through seed founders, match on mutual right swipe
4. Open match list, send first message
5. Show push notification on second device

## Resources
- Product brief: `/docs/product-brief.md` (placeholder)
- Design mockups: Figma link TBD
- Pitch deck (if needed): `/docs/pitch-deck.md` (export PDF here when ready)
- Running notes: `/docs/notes.md`

## How to Contribute
- Create an issue or claim an existing card before starting work
- Document breaking changes in PR description and `docs/changelog.md`
- Add tests/seeds where relevant; flag gaps in PR if time-constrained

_Last updated: 2025-09-26_
