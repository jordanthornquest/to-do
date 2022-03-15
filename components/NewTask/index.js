// Import state from React
import { useState } from "react";

// Import SWR
import useSWR, { useSWRConfig } from "swr";

// Import Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

// Import helpers
import { createNewTask, handleNewTask } from "../../helpers/addTaskHelpers";

// Export component
export function NewTask({ formId }) {
  // Get data from our API with SWR
  const { data: tasks } = useSWR("/api/list/tasks");

  // Use SWR to handle mutation
  const { mutate } = useSWRConfig();

  // Handle new task name with state
  // Set initial state as empty
  const [newTaskName, setNewTaskName] = useState("");

  // handle new task validation with state
  // Set initial state as false
  const [isValid, setValid] = useState(true);

  // Handle submitting state
  // Avoid having inputs

  // Render component
  return (
    <Form
      className="align-items-start d-flex flex-row flex-wrap flex-md-nowrap gap-2"
      id={formId}
      noValidate
      onBlur={() => setValid(true)}
      onSubmit={(e) =>
        createNewTask(e, tasks, mutate, newTaskName, setNewTaskName, setValid)
      }
    >
      <InputGroup
        className="flex-grow-1"
        hasValidation={true}
        id={`${formId}Name`}
      >
        <FormControl
          aria-label="New task"
          isInvalid={!isValid}
          onChange={(e) => handleNewTask(e, setNewTaskName, setValid)}
          placeholder="New task"
          type="text"
          value={newTaskName}
        />
        <Button variant="primary" type="submit">
          Add task &#43;
        </Button>
        <Form.Control.Feedback type="invalid">
          Enter a name for this task
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
}
