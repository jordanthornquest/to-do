// We use our own API to mask requests to Fauna
// This is for security, and to avoid exposing environment variables

// Import components from library
import { createTask, graphFetcher } from '../../../lib/fauna'


// Make the API call
export default async function handler(req, res) {
  // Parse API request body
  const parsedBody = JSON.parse(req.body)

  // Get new task data from parsed body
  const { done=undefined, name=undefined } = parsedBody

  if (done !== undefined && name !== undefined) {
    try {
      // Get the task id from the API query
      const taskData = {
        done: done,
        name: name
      }

      // Update task with GraphQL mutation
      const response = await graphFetcher(createTask, taskData)

      // Return response as API response
      // We'll use this to update the DOM with SWR
      return res.json(response)
    } catch (error) {
      throw error
    }
  }
}
