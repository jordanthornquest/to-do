// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import { TaskItem } from '../TaskItem/'

// Import styles
import styles from './AllTodos.module.css'

// Create component
export function AllTodos() {
  // Get data from our API with SWR
  const { data, error } = useSWR('/api/list')

  // If there's an error, notify
  if (error) return (
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>Data error</h2>
      <p className={styles.error}>{error}</p>
    </main>
  )

  // Return list of todos
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>Active todos</h2>

      {data
        // Load todos if data is defined
        ?
          <ul className={styles.list}>
            {data.map(task => (
              <TaskItem
                completed={task.done}
                key={task._id} 
                name={task.name}
                taskId={task._id}
              />
            ))}
          </ul>
        // Else show loading indicator
        :
          <p className={styles.loading}>Loading</p>
      }
    </main>
  )
}
