// Import components
import { TasksList } from '../TasksList/'

// Import styles
import styles from './Home.module.css'

// Render page
export function Home() {
  return (
    <main className={styles.wrapper}>
      <TasksList title="Active tasks" status={false} />
      <TasksList title="Completed tasks" status={true} />
    </main>
  )
}
