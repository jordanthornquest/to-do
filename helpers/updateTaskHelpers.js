// Mutate remote task data with API call
const updateTaskCall = async (updatedTask) => {
  // Get relevant data from updated task to send via API call
  const { _id: taskId, done } = updatedTask;

  // Update the task via the API and return the response
  // Our GraphQL query should be set to return the updated task
  try {
    // Use fetch and send a PATCH HTTPS call
    const updatedTaskResponse = await fetch(`/api/update/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ done: done }),
    });

    // Parse the response and destructure updatedTask data from response
    const { partialUpdateTask: updatedTask } = await updatedTaskResponse.json();

    // Return updated task
    return updatedTask;

    // If anything breaks, throw error
  } catch (error) {
    throw error;
  }
};

// Update a task's completion status
// This function accepts an updated task and the existing task data
// It updates the task within the task list, and returns a new task list
const updateTaskData = (updatedTask, tasks) => {
  // Create new array for immutability
  const updatedTasks = tasks.slice();

  // Get index of updatedTask in new array
  const updatedTaskIndex = updatedTasks.findIndex(
    (task) => task._id === updatedTask._id
  );

  // If the index exists, update the task
  if (~updatedTaskIndex) {
    // Update the task within the new array
    updatedTasks[updatedTaskIndex] = updatedTask;

    // Return new array with updated task
    return updatedTasks;
  }
};

// Handle task change
export async function handleTaskUpdate(event, mutate, task, tasks) {
  // Get checked status
  const done = event.target.checked;

  // Create new updated task
  const updatedTask = { ...task, done: done };

  // Update tasks list with new task
  try {
    // Create new tasks list with task update
    const updatedTasks = updateTaskData(updatedTask, tasks);

    // Mutate tasks list
    await mutate(`/api/list/tasks`, updateTaskCall(updatedTask), {
      // First, optimisticData temporarily sets the data cache using updatedTasks
      // This immediately updates the DOM
      optimisticData: updatedTasks,
      // Then, populateCache sets the data cache with the API response
      // currentTasks is the dataset as it existed before being temporarily updated by optimisticData
      // We return a new tasks list which combines the current tasks and the updated task response from the API
      populateCache: (updatedTaskResponse, currentTasks) => {
        // Mutate data cache with API response
        const updatedTasks = updateTaskData(updatedTaskResponse, currentTasks);

        // Return updated tasks
        return updatedTasks;
      },
      // If the API call fails, rollback the optimisticData
      rollbackOnError: true,
      // We avoid revalidation since we're fully handling the cache mutation
      // This reduces unnecessary API calls
      revalidate: false,
    });
  } catch (error) {
    throw error;
  }
}
