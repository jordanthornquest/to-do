// Import SWR
import useSWR, { useSWRConfig } from 'swr'

// Import styles
import styles from './TaskItem.module.css'

// Handle task change
const handleTaskChange = async (event, mutate, task, tasks) => {
  // Get checked status
  const done = event.target.checked

  // Create new updated task
  const updatedTask = { ...task, done: done }

  // Update tasks list with new task
  try {
    // Create new tasks list with task update
    // This immediately updates the DOM
    const updatedTasks = updateTaskData(updatedTask, tasks)

    // Mutate remote dataset
    // This sends the task update to the API
    await mutate(
      `/api/list/tasks`, 
      updateTaskCall(updatedTask),
      {
        // First, optimisticData sets the data cache with the local task update
        optimisticData: updatedTasks,
        // Then, populateCache sets the data cache with the API response
        // populateCache expects an object to be returned with the new tasks list
        populateCache: (updatedTask, tasks) => {
          // Mutate data cache with API response
          const updatedTasks = updateTaskData(updatedTask, tasks)

          // Return updated tasks
          return updatedTasks
        },
        // If the API call fails, rollback the optimisticData
        rollbackOnError: true,
        // We avoid revalidation since we're fully handling the cache mutation
        // This reduces unnecessary API calls
        revalidate: false,
      }
    )
  } catch (error) {
    throw (error)
  }
}

// Mutate remote task data with API call
const updateTaskCall = async (updatedTask) => {

  // Get relevant data from updated task to send via API call
  const { _id: taskId, done } = updatedTask

  // Update the task via the API and return the response
  // Our GraphQL query should be set to return the updated task
  try {
    // Use fetch and send a PATCH HTTPS call
    const updatedTaskResponse = await fetch(`/api/update/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({done: done})
    })

    // Parse the response and destructure updatedTask data from response
    const { partialUpdateTask: updatedTask } = await updatedTaskResponse.json()

    // Return updated task
    return updatedTask

  // If anything breaks, throw error
  } catch (error) {
    throw error
  }
}

// Update a task's completion status
// This function accepts an updated task and the existing task data
// It updates the task within the task list, and returns a new task list
const updateTaskData = (updatedTask, tasks) => {
  // Create new array for immutability
  const updatedTasks = tasks.slice()

  // Get index of updatedTask in new array
  const updatedTaskIndex = updatedTasks.findIndex(task => task._id === updatedTask._id)

  // If the index exists, update the task
  if (~updatedTaskIndex) {
    // Update the task within the new array
    updatedTasks[updatedTaskIndex] = updatedTask

    // Return new array with updated task
    return updatedTasks
  }
}

// Export component
export function TaskItem({ task }) {
  // Get data from our API with SWR
  const { data: tasks } = useSWR('/api/list/tasks')

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Render component
  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input
          checked={task.done}
          className={styles.checkbox}
          onChange={e => handleTaskChange(e, mutate, task, tasks)}
          type="checkbox"
        />
        <label className={`${styles.label} ${task.done && styles.checked}`}>
          <span>
            {task.name}
          </span>
        </label>
      </div>
    </li>
  )
}

