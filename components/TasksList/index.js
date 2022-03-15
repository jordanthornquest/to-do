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
  const { data: tasks, error } = useSWR('/api/list/tasks')

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Return list of todos
  return (
    <section className={styles.section}>
      <header>
        <h2 className={styles.heading}>{title}</h2>
        {status &&
          <button onClick={e => handleDeleteCompleted(mutate, tasks)}>
            Delete all finished tasks
          </button>
        }
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {!tasks
        ?
          <p className={styles.loading}>Loading</p>
        :
          <ul className={styles.list}>
            {tasks
              .filter(task => task.done === status)
              .reverse()
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
