// Import deleteTaskCall helper
import { deleteTaskCall } from "./deleteTaskHelpers.js";

// Mutate multiple tasks data with API call
const deleteCompletedCall = async (completedTasks) => {
  // Run delete task call on each completed task
  try {
    const deletedTasks = await Promise.all(
      completedTasks.map(async (task) => deleteTaskCall(task))
    );

    return deletedTasks;
  } catch (error) {
    throw error;
  }
};

// Handle delete completed
export async function handleDeleteCompleted(mutate, tasks) {
  try {
    // Create new array with all remaining tasks
    const remainingTasks = tasks.filter((task) => task.done === false);

    // Create new array with completed tasks
    const completedTasks = tasks.filter((task) => task.done === true);

    // Mutate tasks list
    await mutate(`/api/list/tasks`, deleteCompletedCall(completedTasks), {
      // First, optimisticData temporarily sets the data cache using remainingTasks
      // This immediately updates the DOM
      optimisticData: remainingTasks,
      // Then, populateCache sets the data cache with the API response
      // currentTasks is the dataset as it existed before being temporarily updated by optimisticData
      // We return a new tasks list which excludes the deleted task
      populateCache: (deletedTasksResponse, currentTasks) => {
        // Create new array with all remaining tasks
        const remainingTasks = tasks.filter((task) => task.done === false);

        // Return updated tasks
        return remainingTasks;
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
