# Deploy

Build and deploy the app — client to a static host, server to a Node.js host.

## Instructions

The user may specify a target platform or ask for guidance. If no argument is given, check for existing deployment config and ask where they want to deploy.

**Argument:** `$ARGUMENTS` (optional platform, e.g. `vercel`, `fly`, `railway`, or `check` to audit current setup)

### Step 1 — Audit current deployment state

1. Check for existing deployment config files:
   - `vercel.json`, `netlify.toml` (static/serverless hosts)
   - `fly.toml`, `railway.json`, `.railway/` (PaaS hosts)
   - `Dockerfile`, `docker-compose.yml` (container-based)
   - `.github/workflows/` (CI/CD pipelines)
2. Read `package.json` (root), `client/package.json`, and `server/package.json` to confirm build commands.
3. Read `server/prisma/schema.prisma` to understand what database is needed.
4. Report what config exists and what gaps remain.

### Step 2 — Determine deployment target

If `$ARGUMENTS` specifies a platform, use it. Otherwise, recommend based on the project:
- **Client** (static React/Vite build): Vercel or Netlify — both support `pnpm build` and serve `client/dist/`
- **Server** (Fastify + Prisma + PostgreSQL): Railway (easiest — provisions Postgres automatically) or Fly.io (more control)

Always deploy client and server as separate services. The server is not a serverless function — it is a long-running Fastify process.

### Step 3 — Implement deployment config

Based on the chosen platform, create the necessary config files:

**If Vercel (client only):**
- Create `vercel.json` at `client/` with build output dir `dist` and framework `vite`
- Note: Vercel can host the client; use Railway or Fly for the server

**If Netlify (client only):**
- Create `netlify.toml` at root:
  ```toml
  [build]
    base    = "client"
    command = "pnpm build"
    publish = "dist"
  ```

**If Railway (server + Postgres):**
- Create `railway.json` at `server/`:
  ```json
  { "build": { "builder": "NIXPACKS" }, "deploy": { "startCommand": "node dist/index.js" } }
  ```
- Note the env vars they must set in Railway dashboard: `DATABASE_URL` (Railway provisions this automatically for Postgres), `SHELTERLUV_API_KEY`
- Add a `pnpm build` script check — Railway runs it automatically via Nixpacks

**If Fly.io (server):**
- Create a `fly.toml` at `server/` with app name, Node.js build, `PORT` env, and health check on `/`
- Note they need `flyctl` installed and must run `fly launch` from `server/`

**If Docker:**
- Create a `Dockerfile` at `server/` using `node:18-alpine`, copying `dist/` and `node_modules/`, running `node dist/index.js`
- Note: requires `prisma generate` to run during build

### Step 4 — Environment variables checklist

Print a checklist of env vars to configure on the hosting platform:

**Server (required):**
- [ ] `DATABASE_URL` — PostgreSQL connection string
- [ ] `SHELTERLUV_API_KEY` — Shelterluv API credentials
- [ ] `PORT` — server port (most platforms set this automatically)

**Client (if API URL is configurable):**
- [ ] `VITE_API_URL` — base URL of the deployed server (only if client uses an env var for the API base — check `client/src/` for hardcoded `localhost:3001` references and flag them)

### Step 5 — Pre-deploy checklist

Before deploying, verify:
1. Check `client/src/` for hardcoded `localhost:3001` — these must be replaced with the production API URL (via env var or config).
2. Confirm `server/prisma/schema.prisma` migrations are committed.
3. Confirm `pnpm build` succeeds locally in both `client/` and `server/`.

Report the full checklist with which items are done and which need action.
