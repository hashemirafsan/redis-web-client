import { createClient } from 'redis';

export default async function handler(req, res) {
  const client = createClient({ url: 'redis://redis-view-store:6379' });
  await client.connect();

  const { key } = req.query;

  if (req.method === 'GET') {
    const value = await client.get(key);

    res.status(200).json({ value: value })
  }
  
  if (req.method === 'DELETE') {
    const del = await client.del(key);
    res.status(200).json({ value: del })
  }
}
