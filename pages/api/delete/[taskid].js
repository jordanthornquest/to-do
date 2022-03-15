// We use our own API to mask requests to Fauna
// This is for security, and to avoid exposing environment variables

// Import components from library
import { deleteTask, graphFetcher } from '../../../lib/fauna'

// Make the API call
export default async function handler(req, res) {

  // Get task id from request
  const taskId = req.query.taskid

  if (taskId !== undefined) {
    try {
      // Get the task id from the API query
      const taskData = {
        taskId: taskId,
      }

      // Update task with GraphQL mutation
      const response = await graphFetcher(deleteTask, taskData)

      // Return response as API response
      // We'll use this to update the DOM with SWR
      return res.json(response)
    } catch (error) {
      throw error
    }
  }
}


