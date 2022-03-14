// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import { TaskItem } from '../TaskItem/'

// Import styles
import styles from './TasksList.module.css'

// Create component
export function TasksList({ status, title }) {
  // Get data from our API with SWR
  const { data: tasks, error } = useSWR('/api/list/tasks')

  // Return list of todos
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>

      {error && <p className={styles.error}>{error}</p>}

      {!tasks
        ?
          <p className={styles.loading}>Loading</p>
        :
          <ul className={styles.list}>
            {tasks
              .filter(task => task.done === status)
              .map(task => (
              <TaskItem
                key={task._id} 
                task={task}
              />
            ))}
          </ul>
      }
    </section>
  )
}
