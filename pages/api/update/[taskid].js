// We use our own API to mask requests to Fauna
// This is for security, and to avoid exposing environment variables

// Import components from library
import { updateTodo, graphFetcher } from '../../../lib/fauna'

// Make the API call
export default async function handler(req, res) {
  // Parse body and request
  const parsedBody = JSON.parse(req.body)

  // Get task id from request
  const taskId = req.query.taskid

  // Get completed status
  const { completed: status=null } = parsedBody

  if (taskId && status != null) {
    // Get the task id from the API query
    const taskData = {
      taskId: taskId,
      completed: status
    }

    // Update task with GraphQL mutation
    const response = await graphFetcher(updateTodo, taskData)

    // Return response as API response
    // We'll use this to update the DOM with SWR
    return res.json(response)
  }
}

