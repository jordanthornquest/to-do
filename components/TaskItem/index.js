// Import SWR
import { useSWRConfig } from 'swr'

// Import styles
import styles from './TaskItem.module.css'

// Handle task completion
const handleTaskCompletion = async (checked, taskId) => {
  // Set the task's completed state based on checkbox value
  // This is a boolean value
  const status = checked

  // Send the update to the database via the API
  // Save the response, which should be the outputted data
  const updatedTask = await fetch(`/api/update/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({completed: status})
  })
}

// Export component
export function TaskItem({ completed, taskId, name }) {
  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Render component
  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input
          checked={completed}
          className={styles.checkbox}
          onChange={e => mutate('/api/list', handleTaskCompletion(e.target.checked, taskId))}
          type="checkbox"
        />
        <label className={styles.label}>{name}</label>
      </div>
    </li>
  )
}

