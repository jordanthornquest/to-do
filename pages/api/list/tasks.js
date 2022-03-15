// We use our own API to mask requests to Fauna
// This is for security, and to avoid exposing environment variables

// Import components from library
import { findAllTasks, graphFetcher } from "../../../lib/fauna.js";

// Make the API call
export default async function handler(req, res) {
  // Get all data with GraphQL
  const response = await graphFetcher(findAllTasks);

  // Destructure all todos from data
  const {
    allTasks: { data },
  } = response;

  // Return response as API response
  return res.json(data);
}
