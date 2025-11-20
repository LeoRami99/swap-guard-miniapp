# Swap Guard

Swap Guard is a proof-of-concept Lemon Cash integration that keeps crypto subscriptions funded. Users decide what portion of their ETH balance is exchanged to USDC ahead of every billing cycle, receive notifications over Telegram, and can preview the full swap flow through interactive mock modals.

## Features

- Wallet detection through the Lemon Cash SDK hook (`useLemon`).
- Real-time ETH price lookup via `useGetPriceETH`.
- Subscription form that captures swap percentage, notification lead time, and amount to protect.
- Modal-based mock flow that previews the swap subscription and simulates a confirmation sale from ETH → USDC.
- Fully responsive UI built with Next.js App Router, Tailwind, and DaisyUI components.

## Tech Stack

- Next.js 14 (App Router + Server Components)
- TypeScript
- TailwindCSS + DaisyUI
- React Hook Form
- Bun (default package manager/runtime)

## Getting Started

Install dependencies with your preferred package manager (Bun recommended):

```bash
bun install
# npm install / pnpm install / yarn install also work
```

Create a `.env.local` with any tokens or Lemon Cash credentials the hooks require (see `app/hooks` for reference). Then run the dev server:

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to interact with the swap card. Clicking **Preview mock swap** will open the mock subscription modal, and the **Simulate confirmation** button automatically transitions to the confirmation modal that displays the ETH sale → USDC conversion.

## Scripts

- `bun dev` – start the dev server
- `bun run lint` – lint the project
- `bun run build` – create a production build
- `bun start` – run the production server

## Deployment

Swap Guard is a standard Next.js application, so it can be deployed to Vercel or any platform that supports Node/Bun runtimes. Ensure environment variables are set and that your Lemon Cash integration is enabled in the target environment.
