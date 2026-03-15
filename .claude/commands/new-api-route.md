# New API Route

Add a new Fastify route to the server with proper TypeScript types and Prisma integration.

## Instructions

The user will describe the route they want to add. If no argument is given, ask for:
- HTTP method (GET, POST, PATCH, DELETE)
- Path (e.g. `/dogs/:id/notes`)
- What it should do

**Argument:** `$ARGUMENTS` (description of the route, e.g. `POST /dogs/:id/archive — mark a dog as archived`)

1. Read `server/src/index.ts` fully to understand existing route patterns, Prisma usage, and error handling conventions.
2. Read `server/prisma/schema.prisma` to understand the current data model.
3. Determine from `$ARGUMENTS`:
   - HTTP method and path
   - Request body shape (if POST/PATCH) — define a TypeScript interface
   - Response shape — define a TypeScript interface
   - Which Prisma model and operation to use
4. Add the route to `server/src/index.ts` following these conventions:
   - Use `fastify.method<{ Params?: ...; Body?: ...; Reply?: ... }>('/path', async (request, reply) => { ... })`
   - Validate required fields and return `reply.status(400).send({ error: '...' })` for bad input
   - Use `try/catch` and return `reply.status(500).send({ error: '...' })` for unexpected errors
   - Return `reply.status(404).send({ error: 'Not found' })` when a record is missing
   - Log meaningful messages with `fastify.log.info(...)` for key operations
5. If the route requires a schema change (new field or model), note what Prisma migration command to run but do NOT modify `schema.prisma` — ask the user first.
6. Report the new route (method + path), its expected request/response shapes, and any follow-up steps (migration, client wiring).
