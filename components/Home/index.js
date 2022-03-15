// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import { TasksList } from '../TasksList/'

// Import styles
import styles from './Home.module.css'

// Check data before rendering
const checkData = (tasks, error) => {
  if (error) return <p className={styles.message}>{error}</p>
  if (!tasks) return <p className={styles.message}>Loading</p>
  if (tasks.length > 0) {
    return (
      <>
        <TasksList title="Active tasks" status={false} />
        <TasksList title="Completed tasks" status={true} />
      </>
    )
  } else {
    return <p className={styles.message}>There are no tasks! You're all caught up. Great work!</p>
  }
}

// Render component
export function Home() {
  // Get data from our API with SWR
  const { data: tasks, error } = useSWR('/api/list/tasks')

  // Render component
  return (
    <main className={styles.wrapper}>
      {checkData(tasks, error)}
    </main>
  )
}
