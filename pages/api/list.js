// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from 'redis';

export default async function handler(req, res) {
  const client = createClient({ url: 'redis://redis-view-store:6379' });
  await client.connect();
  await client.set('')
  const keys = await client.keys('*');

  res.status(200).json({ keys: keys.filter(item => item.length) })
}
