import { listToDos } from '../../lib/fauna'

export default async function handler(req, res) {
  const entries = await listToDos()

  return res.json(entries)
}
