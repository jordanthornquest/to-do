// Import SWR for client-side data loading
import useSWR, { useSWRConfig } from 'swr'

// Import Bootstrap
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

// Import components
import { TaskItem } from '../TaskItem/'

// Import helpers
import { handleDeleteCompleted } from '../../helpers/deleteCompletedHelpers'

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
      <section className="mt-4">
        <header className="align-items-center d-flex flex-row flex-wrap justify-content-between gap-2">
          <h2
            className="fs-5 fw-bold m-0"
          >
            {title}
          </h2>
          {status &&
            <Button
              onClick={e => handleDeleteCompleted(mutate, tasks)}
              size="sm"
              variant="outline-danger"
            >
              Delete all <span className="d-none d-sm-inline">finished tasks</span>
            </Button>
          }
        </header>
        <ul
          className="d-flex flex-column gap-2 list-unstyled mt-3"
        >
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
