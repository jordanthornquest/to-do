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
    <section>
      <Form
        className="align-items-start d-flex flex-row flex-wrap flex-md-nowrap gap-2"
        id={formId}
        noValidate
        onBlur={() => setValid(true)}
        onSubmit={(e) =>
          createNewTask(e, tasks, mutate, newTaskName, setNewTaskName, setValid)
        }
      >
        <fieldset className="w-100">
          <legend className="visually-hidden">Create new task</legend>
          <Form.Label
            className="fs-5 fw-bold"
            htmlFor={`${formId}Name`}
            id={`${formId}NameLabel`}
          >
            New task
          </Form.Label>
          <InputGroup
            className="flex-grow-1"
            hasValidation={true}
            id={`${formId}Create`}
          >
            <FormControl
              aria-labelledby={`${formId}NameLabel`}
              enterKeyHint="enter"
              id={`${formId}Name`}
              isInvalid={!isValid}
              maxLength={100}
              onChange={(e) => handleNewTask(e, setNewTaskName, setValid)}
              placeholder="Enter a new task"
              type="text"
              value={newTaskName}
            />
            <Button type="submit" variant="primary">
              Add task &#43;
            </Button>
            <Form.Control.Feedback type="invalid">
              Enter a name for this task
            </Form.Control.Feedback>
          </InputGroup>
        </fieldset>
      </Form>
    </section>
  );
}
