# DB Migration

Add a field or model to the Prisma schema and guide the migration workflow.

## Instructions

The user will describe the schema change they want. If no argument is given, ask what they want to add or change.

**Argument:** `$ARGUMENTS` (description of the change, e.g. `add an adoptionStatus enum to Dog` or `add a FosterFamily model`)

1. Read `server/prisma/schema.prisma` fully.
2. Read `server/src/index.ts` to understand how existing fields are used in routes.
3. Read `client/src/types.ts` to see the frontend Dog type.
4. Plan the schema change based on `$ARGUMENTS`:
   - For new fields: choose the right Prisma type (`String?`, `Boolean`, `DateTime?`, `Int`, etc.), set sensible defaults, and mark optional with `?` where appropriate.
   - For new models: define all fields, primary key, relations, and indexes.
   - For enums: define all values and apply to the relevant model field.
5. Make the change to `server/prisma/schema.prisma`.
6. Update `client/src/types.ts` to reflect any new or changed fields on the `Dog` type (or add new types if needed).
7. Identify which API routes in `server/src/index.ts` need updating to expose or accept the new field — list them but do NOT modify them unless asked.
8. Print the exact command the user should run to create and apply the migration:
   ```
   cd server && npx prisma migrate dev --name <descriptive-name>
   ```
9. Note any follow-up work: routes to update, UI fields to add, seed data considerations.
