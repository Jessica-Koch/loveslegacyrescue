import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors, { origin: 'http://localhost:5173' });

// Get all adoptable dogs
fastify.get('/dogs', async () => {
  return prisma.dog.findMany({ orderBy: { name: 'asc' } });
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

    const data = await res.json();
    if (data.animals?.length) allAnimals = allAnimals.concat(data.animals);
    hasMore = data.has_more === true;
    offset += limit;
  }

  const dogs = allAnimals.filter(
    (a) => a.Type === 'Dog' || a.Species === 'Dog' || a.species === 'Dog'
  );

  let upserted = 0;
  for (const dog of dogs) {
    await prisma.dog.upsert({
      where: { shelterluvId: dog.ID },
      update: {
        name: dog.Name,
        breed: dog.Breed,
        age: dog.Age,
        sex: dog.Sex,
        color: dog.Color,
        description: dog.Description,
        photoUrl: dog.photos?.[0]?.large ?? null,
        status: dog.Status,
        inFoster: !!dog.InFoster,
      },
      create: {
        shelterluvId: dog.ID,
        name: dog.Name,
        breed: dog.Breed,
        age: dog.Age,
        sex: dog.Sex,
        color: dog.Color,
        description: dog.Description,
        photoUrl: dog.photos?.[0]?.large ?? null,
        status: dog.Status,
        inFoster: !!dog.InFoster,
      },
    });
    upserted++;
  }

  return { success: true, synced: upserted };
});

const start = async () => {
  await fastify.listen({ port: 3001, host: '0.0.0.0' });
};

start();
