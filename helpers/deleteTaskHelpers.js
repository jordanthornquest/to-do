// Delete a task
// This function accepts an deleted task and the existing task data
// It deletes the task within the task list, and returns a new task list
const deleteTask = (deletedTask, tasks) => {
  // Create new array excluding deleted task for immutability
  const updatedTasks = tasks.filter(task => task._id !== deletedTask._id)

  // Return updated tasks list
  return updatedTasks
}

// Mutate remote task data with API call
const deleteTaskCall = async (deletedTask) => {

  // Get id from deleted task to send to API
  const { _id: taskId } = deletedTask

  // Delete the task via the API and return the response
  // Our GraphQL query should be set to return the updated task
  try {
    // Use fetch and send a PATCH HTTPS call
    const deletedTaskResponse = await fetch(`/api/delete/${taskId}`, {
      method: 'DELETE'
    })

    // Parse the response and destructure updatedTask data from response
    const { deleteTask: deletedTask } = await deletedTaskResponse.json()

    // Return updated task
    return deletedTask

  // If anything breaks, throw error
  } catch (error) {
    throw error
  }
}

// Handle task change
const handleTaskDelete = async (mutate, task, tasks) => {
  // Update tasks list with deleted task
  try {
    // Create new tasks list with task update
    const updatedTasks = deleteTask(task, tasks)

    // Mutate tasks list
    await mutate(
      `/api/list/tasks`, 
      deleteTaskCall(task),
      {
        // First, optimisticData temporarily sets the data cache using updatedTasks
        // This immediately updates the DOM
        optimisticData: updatedTasks,
        // Then, populateCache sets the data cache with the API response
        // currentTasks is the dataset as it existed before being temporarily updated by optimisticData
        // We return a new tasks list which excludes the deleted task
        populateCache: (deletedTaskResponse, currentTasks) => {
          // Mutate data cache with API response
          const updatedTasks = deleteTask(deletedTaskResponse, currentTasks)

          // Return updated tasks
          return updatedTasks
        },
        // If the API call fails, rollback the optimisticData
        rollbackOnError: true,
        // We avoid revalidation since we're fully handling the cache mutation
        // This reduces unnecessary API calls
        revalidate: false,
      }
    )
  } catch (error) {
    throw (error)
  }
}

// Export functions
export {
  deleteTaskCall,
  handleTaskDelete
}
