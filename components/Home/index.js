// Import SWR for client-side data loading
import useSWR from 'swr'

// Import Bootstrap
import Spinner from 'react-bootstrap/Spinner'

// Import components
import { TasksList } from '../TasksList/'

// Import styles
import styles from './Home.module.css'

// Check data before rendering
const checkData = (tasks, error) => {
  // Return error if there's any issues
  if (error) return <p className="lead">{error}</p>

  // Return spinner while loading data
  if (!tasks) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  if (tasks.length > 0) {
    return (
      <>
        <TasksList title="Active tasks" status={false} />
        <TasksList title="Completed tasks" status={true} />
      </>
    )
  } else {
    return <p className="lead">There are no tasks! You're all caught up. Great work!</p>
  }
}

// Render component
export function Home() {
  // Get data from our API with SWR
  const { data: tasks, error } = useSWR('/api/list/tasks')

  // Render component
  return (
    <main className="container">
      {checkData(tasks, error)}
    </main>
  )
}
