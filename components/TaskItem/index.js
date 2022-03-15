// Import SWR
import useSWR, { useSWRConfig } from 'swr'

// Import helpers
import { handleTaskUpdate } from '../../helpers/updateTaskHelpers'
import { handleTaskDelete } from '../../helpers/deleteTaskHelpers'

// Import styles
import styles from './TaskItem.module.css'

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
          id={`task${task._id}`}
          name={`task${task._id}`}
          onChange={e => handleTaskUpdate(e, mutate, task, tasks)}
          type="checkbox"
        />
        <label
          className={`${task.done && styles.checked}`}
          htmlFor={`task${task._id}`}
        >
          <span className={`${styles.name}`}>
            {task.name}
          </span>
        </label>
        <button
          className={styles.delete}
          onClick={e => handleTaskDelete(mutate, task, tasks)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

