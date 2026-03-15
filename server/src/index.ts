import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const fastify = Fastify({ logger: true });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

fastify.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
});

// Get all adoptable dogs
fastify.get('/dogs', async () => {
  return prisma.dog.findMany({ orderBy: { name: 'asc' } });
});

// Get the currently featured dog
fastify.get('/dogs/featured', async () => {
  return prisma.dog.findFirst({ where: { featured: true } });
});

// Sync dogs from Shelterluv
fastify.post('/sync', async () => {
  const apiKey = process.env.SHELTERLUV_API_KEY;
  if (!apiKey) throw new Error('SHELTERLUV_API_KEY not set');

  let allAnimals: any[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const url = new URL('https://new.shelterluv.com/api/v1/animals');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('status_type', 'publishable');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) throw new Error(`Shelterluv error: ${res.status}`);

    const data = await res.json() as { animals?: any[]; has_more?: boolean };
    if (data.animals?.length) allAnimals = allAnimals.concat(data.animals);
    hasMore = data.has_more === true;
    offset += limit;
  }

  const dogs = allAnimals.filter(
    (a) => a.Type === 'Dog' || a.Species === 'Dog' || a.species === 'Dog'
  );

  const activeShelterIds = new Set(dogs.map((d: any) => d.ID));

  let upserted = 0;
  for (const dog of dogs) {
    const photoUrls: string[] = [];
    if (dog.CoverPhoto) photoUrls.push(dog.CoverPhoto);
    if (Array.isArray(dog.Photos)) {
      for (const p of dog.Photos) {
        if (p && !photoUrls.includes(p)) photoUrls.push(p);
      }
    }

    await prisma.dog.upsert({
      where: { shelterluvId: dog.ID },
      update: {
        name: dog.Name,
        breed: dog.Breed,
        age: dog.Age != null ? String(dog.Age) : null,
        sex: dog.Sex,
        color: dog.Color,
        description: dog.Description,
        photoUrls,
        status: dog.Status,
        inFoster: !!dog.InFoster,
      },
      create: {
        shelterluvId: dog.ID,
        name: dog.Name,
        breed: dog.Breed,
        age: dog.Age != null ? String(dog.Age) : null,
        sex: dog.Sex,
        color: dog.Color,
        description: dog.Description,
        photoUrls,
        status: dog.Status,
        inFoster: !!dog.InFoster,
      },
    });
    upserted++;
  }

  // Remove dogs no longer in Shelterluv's publishable list (e.g. adopted)
  // If the featured dog was removed, auto-rotate to the next one
  const removed = await prisma.dog.deleteMany({
    where: { shelterluvId: { notIn: [...activeShelterIds] } },
  });

  const featuredStillExists = await prisma.dog.findFirst({ where: { featured: true } });
  if (!featuredStillExists) {
    const next = await prisma.dog.findFirst({
      orderBy: [{ featuredAt: { sort: 'asc', nulls: 'first' } }, { name: 'asc' }],
    });
    if (next) {
      await prisma.dog.update({ where: { id: next.id }, data: { featured: true, featuredAt: new Date() } });
    }
  }

  return { success: true, synced: upserted, removed: removed.count };
});

// Update custom fields on a dog (slackChannelId, internalNotes, etc.)
fastify.patch('/dogs/:id', async (req) => {
  const { id } = req.params as { id: string };
  const { slackChannelId, internalNotes } = req.body as {
    slackChannelId?: string;
    internalNotes?: string;
  };

  const dog = await prisma.dog.update({
    where: { id },
    data: { slackChannelId, internalNotes },
  });

  return dog;
});

// Rotate featured dog — call this weekly via cron or manually
// Picks the dog that was least recently featured (or never featured)
fastify.post('/feature/rotate', async (req) => {
  const { featureDurationDays = 7 } = req.body as { featureDurationDays?: number };

  // Check if current featured dog's time is still active
  const current = await prisma.dog.findFirst({ where: { featured: true } });
  if (current?.featuredAt) {
    const elapsed = Date.now() - current.featuredAt.getTime();
    const durationMs = featureDurationDays * 24 * 60 * 60 * 1000;
    if (elapsed < durationMs) {
      const remainingMs = durationMs - elapsed;
      const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
      return { message: `Current featured dog (${current.name}) has ${remainingDays} day(s) remaining.` };
    }
  }

  // Find the next dog: pick the one with the oldest featuredAt (or never featured), excluding current
  const next = await prisma.dog.findFirst({
    where: { id: { not: current?.id ?? '' } },
    orderBy: [{ featuredAt: { sort: 'asc', nulls: 'first' } }, { name: 'asc' }],
  });

  if (!next) return { message: 'No dogs available to feature.' };

  // Unfeature current, feature next
  await prisma.$transaction([
    ...(current ? [prisma.dog.update({ where: { id: current.id }, data: { featured: false } })] : []),
    prisma.dog.update({ where: { id: next.id }, data: { featured: true, featuredAt: new Date() } }),
  ]);

  return { success: true, featured: next.name };
});

// Manually set a specific dog as featured
fastify.post('/feature/set/:id', async (req) => {
  const { id } = req.params as { id: string };

  await prisma.dog.updateMany({ where: { featured: true }, data: { featured: false } });
  const dog = await prisma.dog.update({
    where: { id },
    data: { featured: true, featuredAt: new Date() },
  });

  return { success: true, featured: dog.name };
});

const start = async () => {
  await fastify.listen({ port: 3001, host: '0.0.0.0' });
};

start();
