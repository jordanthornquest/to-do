// Import SWR
import useSWR, { useSWRConfig } from 'swr'

// Import Bootstrap
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'

// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

// Import helpers
import { handleTaskUpdate } from '../../helpers/updateTaskHelpers'
import { handleTaskDelete } from '../../helpers/deleteTaskHelpers'

// Import styles
import styles from './TaskItem.module.css'

// Export component
export function TaskItem({ task }) {
  // Get data from our API with SWR
  const { data: tasks } = useSWR('/api/list/tasks')

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Render component
  return (
    <li
      className={styles.item}
    >
      <FormCheck>
        <FormCheck.Input
          checked={task.done}
          id={`task${task._id}`}
          name={`task${task._id}`}
          onChange={e => handleTaskUpdate(e, mutate, task, tasks)}
          type="checkbox"
        />
        <FormCheck.Label
          htmlFor={`task${task._id}`}
        >
          <span className={task.done && 'fst-italic text-decoration-line-through'}>
            {task.name}
          </span>
        </FormCheck.Label>
      </FormCheck>
      <Button
        className={styles.close}
        onClick={e => handleTaskDelete(mutate, task, tasks)}
        variant="link"
      >
        <FontAwesomeIcon icon={faClose} />
      </Button>
    </li>
  )
}

