import { createClient } from 'redis';

export default async function handler(req, res) {
  const client = createClient({ url: 'redis://redis-view-store:6379' });
  await client.connect();
  await client.set('green_tea', '111', {
      EX: 300,
      NX: false
  });

  res.status(200).json({ create: true })
}
