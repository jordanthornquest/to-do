// Import SWR for client-side data loading
import useSWR from "swr";

// Import Bootstrap
import Spinner from "react-bootstrap/Spinner";

// Import components
import { NewTask } from "../NewTask";
import { TasksList } from "../TasksList/";

// Check data before rendering
const checkData = (tasks, error) => {
  // Return error if there's any issues
  if (error) {
    // If the error's an object, parse it to a string
    const checkErrorType = (error) => {
      if (typeof error === 'object' && error !== null) {
        const errorString = JSON.stringify(error);
        return errorString;
        // Return error string
      } else {
        return error;
      }
    }

    // Parse error message
    const errorMessage = checkErrorType(error)

    // Return parsed message
    return <p className="lead">{errorMessage}</p>;
  }
  // Return spinner while loading data
  if (!tasks) {
    return (
      <Spinner animation="border" className="d-flex mx-auto mt-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // If there are tasks to show, render lists
  if (tasks.length > 0) {
    return (
      <>
        <TasksList title="Active tasks" status={false} />
        <TasksList title="Completed tasks" status={true} />
      </>
    );
  } else {
    return (
      <p className="text-muted text-center mt-4 mb-2">
        You&apos;re all caught up. Great work!
      </p>
    );
  }
};

// Render component
export function Home() {
  // Get data from our API with SWR
  const { data: tasks, error } = useSWR("/api/list/tasks");

  // Render component
  return (
    <>
      <h2 className="visually-hidden">New task</h2>
      <NewTask formId="newTask" />
      {checkData(tasks, error)}
    </>
  );
}
