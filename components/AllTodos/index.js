// Import SWR for client-side data loading
import useSWR from 'swr'

// Import components
import { TaskItem } from '../TaskItem/'

// Create component
export function AllTodos() {
  // Get data from our API with SWR
  const { data, error } = useSWR('/api/list')

  // If there's an error, notify
  if (error) return <p>{error}</p>

  // Show loading while getting data
  if (!data) return <p>Loading...</p>

  // Destructure all todos from data
  const { allTodos: { data: todos=undefined } } = data

  // Return list of todos
  return (
    <main>
      {todos
        ?
          <ul>
            {todos.map(task => <TaskItem completed={task.completed} key={task._id} name={task.name} />)}
          </ul>
        :
          <p>No todos!</p>
      }
    </main>
  )
}
