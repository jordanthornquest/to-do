// We use our own API to mask requests to Fauna
// This is for security, and to avoid exposing environment variables

// Import components from library
import { findAllTodos, graphFetcher } from '../../lib/fauna'

// Make the API call
export default async function handler(req, res) {
  // Get all data with GraphQL
  const response = await graphFetcher(findAllTodos)

  // Destructure all todos from data
  const { allTodos: { data } } = response

  // Return response as API response
  return res.json(data)
}
