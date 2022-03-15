// Import SWR for client-side data loading
import useSWR, { useSWRConfig } from 'swr'

// Import components
import { TaskItem } from '../TaskItem/'

// Import helpers
import { handleDeleteCompleted } from '../../helpers/deleteCompletedHelpers'

// Import styles
import styles from './TasksList.module.css'

// Create component
export function TasksList({ status, title }) {
  // Get data from our API with SWR
  const { data: tasks } = useSWR('/api/list/tasks')

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Create new dataset based on status and starting from newest
  // Keep things immutable!
  const filteredTasks = tasks.filter(task => task.done === status).reverse()

  // Return list of tasks if there are any
  if (filteredTasks.length > 0) {
    return (
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{title}</h2>
          {status &&
            <button onClick={e => handleDeleteCompleted(mutate, tasks)}>
              Delete all finished tasks
            </button>
          }
        </header>
        <ul className={styles.list}>
          {filteredTasks.map(task => (
            <TaskItem
              key={task._id} 
              task={task}
            />
          ))}
        </ul>
      </section>
    )
  } else {
    return null
  }
}
