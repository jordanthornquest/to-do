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
    // Mutate local data cache
    // This immediately updates the DOM
    const updatedTasks = await updateTaskData(updatedTask, tasks)

    // Mutate remote dataset
    await mutate(
      `/api/list/tasks`, 
      updateTaskCall(updatedTask, tasks),
      {
        // optimisticData sets the new data cache as UpdatedTasks
        // Once the api call completes, SWR compares the response to the local cache
        optimisticData: updatedTasks,
        populateCache: true,
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

// Update task completion
const updateTaskCall = async (updatedTask, tasks) => {

  // Get relevant API data from updated task
  const { _id: taskId, done } = updatedTask

  // Update the task via the API and return the response
  try {
    // Use fetch and send a PATCH HTTPS call
    const updatedTaskResponse = await fetch(`/api/update/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({done: done})
    })

    // Parse the response and destructure updatedTask data
    const { partialUpdateTask: updatedTask } = await updatedTaskResponse.json()

    // Mutate local data cache
    const updatedTasks = await updateTaskData(updatedTask, tasks)

    // Return updated data cache
    return updatedTasks
  } catch (error) {
    throw error
  }
}

// Update the task's completion status
const updateTaskData = async (updatedTask, tasks) => {
  // Create new array for immutability
  const updatedTasks = tasks.slice()

  // Get index of updatedTask in tasks
  const updatedTaskIndex = updatedTasks.findIndex(task => task._id === updatedTask._id)

  // Replace old task with updated version
  if (~updatedTaskIndex) {
    // Update task at it's index
    updatedTasks[updatedTaskIndex] = updatedTask

    // Return updated tasks
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

