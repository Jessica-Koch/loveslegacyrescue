# Love's Legacy Rescue

Website and admin tooling for Love's Legacy Rescue. Dogs are synced from [Shelterluv](https://www.shelterluv.com/) into a local PostgreSQL database and served via a Fastify API.

## Storybook

Component library: **https://jessica-koch.github.io/loveslegacyrescue/**

## Stack

- **Client** — Vite + React + TypeScript
- **Server** — Fastify + Prisma + PostgreSQL
- **Data source** — Shelterluv API

## Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL running locally

## Setup

1. Install dependencies from the root:
   ```bash
   pnpm install
   ```

2. Create `server/.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/loveslegacy_db"
   SHELTERLUV_API_KEY="your_key_here"
   ```

3. Run the database migration from the `server/` directory:
   ```bash
   cd server && npx prisma migrate deploy
   ```

## Running locally

From the root:
```bash
pnpm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/dogs` | All adoptable dogs, sorted by name |
| `GET` | `/dogs/featured` | The currently featured dog |
| `PATCH` | `/dogs/:id` | Update custom fields (`slackChannelId`, `internalNotes`) |
| `POST` | `/sync` | Sync dogs from Shelterluv (see below) |
| `POST` | `/feature/rotate` | Rotate to the next featured dog |
| `POST` | `/feature/set/:id` | Manually feature a specific dog by DB id |

## Syncing dogs from Shelterluv

Run this whenever you want to pull the latest dogs from Shelterluv:
```bash
curl -X POST http://localhost:3001/sync
```

The sync will:
- Fetch all publishable animals from Shelterluv and upsert them into the database
- **Delete any dogs that are no longer on Shelterluv** (e.g. adopted, transferred)
- If the featured dog was removed, automatically promote the next dog in rotation

Response: `{ "success": true, "synced": 42, "removed": 0 }`

## Setting Slack channel IDs

Each dog can have a Slack channel associated with it for foster communication.

1. Open `server/scripts/set-slack-channels.ts`
2. Fill in the `SLACK_CHANNELS` map with dog names and their Slack channel IDs:
   ```ts
   const SLACK_CHANNELS: Record<string, string> = {
     'Rosie': 'C12345678',
     'Abby':  'C87654321',
   };
   ```
   > To find a Slack channel ID: right-click the channel > **View channel details** > scroll to the bottom of the **About** tab.

3. Run from the `server/` directory:
   ```bash
   pnpm run set-slack
   ```

The script will print a confirmation for each dog updated, and warn if a name isn't found in the database.

## Featured dog rotation

One dog is featured at a time (e.g. highlighted on the website). The rotation cycles through all dogs, picking the one that was least recently featured.

**Rotate to the next dog** (skips if the current dog's week isn't up):
```bash
curl -X POST http://localhost:3001/feature/rotate
```

**Force-rotate immediately** (ignores duration):
```bash
curl -X POST http://localhost:3001/feature/rotate \
  -H 'Content-Type: application/json' \
  -d '{"featureDurationDays": 0}'
```

**Manually feature a specific dog** (get the `id` from `GET /dogs`):
```bash
curl -X POST http://localhost:3001/feature/set/YOUR_DOG_ID
```

To automate weekly rotation, set up a cron job or scheduled task that calls `POST /feature/rotate` once a week.

## Database schema changes

If you modify `server/prisma/schema.prisma`, create and apply a migration:
```bash
cd server && npx prisma migrate dev --name describe_your_change
```
