// Import state from React
import { useState } from 'react';

// Import SWR
import useSWR, { useSWRConfig } from 'swr'

// Import Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// Import helpers
import { createNewTask, handleNewTask } from '../../helpers/addTaskHelpers'

// Export component
export function NewTask({ formId }) {
  // Get data from our API with SWR
  const { data: tasks } = useSWR('/api/list/tasks')

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig()

  // Handle new task name with state
  // Set initial state as empty
  const [newTaskName, setNewTaskName] = useState("")

  // handle new task validation with state
  // Set initial state as false
  const [isValid, setValid] = useState(true)

  // Handle submitting state
  // Avoid having inputs

  // Render component
  return (
    <Form
      className="align-items-start d-flex flex-row flex-wrap flex-md-nowrap gap-2 mt-3"
      id={formId}
      noValidate
      onBlur={() => setValid(true)}
      onSubmit={e => createNewTask(e, tasks, mutate, newTaskName, setNewTaskName, setValid)}
    >
      <Form.Group
        className="flex-grow-1"
        controlId={`${formId}Name`}
      >
        <Form.Label
          className="visually-hidden"
        >
          New task
        </Form.Label>
        <Form.Control
          isInvalid={!isValid}
          onChange={e => handleNewTask(e, setNewTaskName, setValid)}
          placeholder="New task"
          type="text"
          value={newTaskName}
        />
        <Form.Control.Feedback type="invalid">
          Enter a name for this task
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Add task &#43;
      </Button>
    </Form>
  )
}
