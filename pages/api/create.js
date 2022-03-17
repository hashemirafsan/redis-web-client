import { createClient } from 'redis';

export default async function handler(req, res) {
  const client = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' });
  await client.connect();
  const { key, value } = req.body;
  await client.set(key, value, {
      EX: 300,
      NX: false
  });

  res.status(200).json({ create: true })
}
