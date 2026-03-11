import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Map dog names to their Slack channel IDs
// Find channel IDs in Slack: right-click a channel > View channel details > bottom of About tab
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
      console.warn(`⚠️  Dog not found: ${name}`);
      continue;
    }
    await prisma.dog.update({ where: { id }, data: { slackChannelId } });
    console.log(`✓ ${name} → ${slackChannelId}`);
  }

  await prisma.$disconnect();
}

main();
