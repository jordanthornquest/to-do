// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import { TasksList } from '../TasksList/'

// Import styles
import styles from './Home.module.css'

// Render component
export function Home() {
  // Get data from our API with SWR
  const { data: tasks, error } = useSWR('/api/list/tasks')

  // Render component
  return (
    <main className={styles.wrapper}>
      {error && <p className={styles.message}>{error}</p>}

      {!tasks 
        ?
          <p className={styles.message}>Loading</p>
        :
          <>
            {tasks.length > 0
              ?
                <>
                  <TasksList title="Active tasks" status={false} />
                  <TasksList title="Completed tasks" status={true} />
                </>
              :
                <p className={styles.message}>There are no tasks! You're all caught up. Great work!</p>
            }
          </>
      }
    </main>
  )
}
