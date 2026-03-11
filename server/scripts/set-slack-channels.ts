/**
 * set-slack-channels.ts
 *
 * Bulk-assigns Slack channel IDs to dogs in the database.
 *
 * Usage:
 *   1. Fill in the SLACK_CHANNELS map below with dog names and channel IDs.
 *   2. Run from the server/ directory:
 *        pnpm run set-slack
 *
 * How to find a Slack channel ID:
 *   Right-click the channel in Slack > View channel details > scroll to the
 *   bottom of the About tab. It looks like: C12345678
 *
 * Dog names must match exactly what's in the database (check GET /dogs).
 * Dogs not found will be skipped with a warning.
 *
 * Safe to re-run — it will overwrite any previously set channel IDs.
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Map dog names to their Slack channel IDs.
// Add or remove entries as needed.
const SLACK_CHANNELS: Record<string, string> = {
  // 'Rosie': 'C12345678',
  // 'Abby':  'C87654321',
};

async function main() {
  const dogs = await prisma.dog.findMany({ select: { id: true, name: true } });
  const byName = Object.fromEntries(dogs.map((d) => [d.name, d.id]));

  for (const [name, slackChannelId] of Object.entries(SLACK_CHANNELS)) {
    const id = byName[name];
    if (!id) {
      console.warn(`⚠️  Dog not found: "${name}" — skipping`);
      continue;
    }
    await prisma.dog.update({ where: { id }, data: { slackChannelId } });
    console.log(`✓ ${name} → ${slackChannelId}`);
  }

  console.log('\nDone.');
  await prisma.$disconnect();
}

main();
