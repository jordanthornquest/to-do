// Import UUID
// We'll use this to generate temporary id's for optimistic new tasks
import { v4 as uuidv4 } from 'uuid'

// Function to create new task
const createNewTask = async (e, tasks, mutate, newTaskName, setNewTaskName, setValid) => {
  // Don't submit the form element natively
  e.preventDefault()
  e.stopPropagation();

  // If the input is empty, return validation error
  if (!newTaskName) {
    // Trigger validation
    setValid(false)

  // Otherwise, create new task
  } else {
    // Clear validation
    setValid(true)

    // We will temporarily create an id with uuid
    // This will be overwritten once the todo's api response returns
    const tempId = uuidv4()

    // Create new task
    const newTask = {
      _id: tempId,
      done: false,
      name: newTaskName
    }

    // Reset the new task input
    // We wait until after assignment to new task
    setNewTaskName("")

    // Mutate the tasks data
    try {
      // Set new task object
      // Mutate tasks list
      await mutate(
        `/api/list/tasks`, 
        createNewTaskCall(newTask),
        {
        // First, optimisticData temporarily sets the data cache by appending the new task
        // This immediately updates the DOM
          optimisticData: [...tasks, newTask],
          // Then, populateCache sets the data cache with the API response
          // currentTasks is the dataset as it existed before being temporarily updated by optimisticData
          // We return a new tasks list which combines the current tasks and the updated task response from the API
          populateCache: (newTask, currentTasks) => {
            // Return updated tasks and the new task
            // SWR will append the new task into the current tasks
            return [...currentTasks, newTask]
          },
          // If the API call fails, rollback the optimisticData
          rollbackOnError: true,
          // We avoid revalidation since we're fully handling the cache mutation
          // This reduces unnecessary API calls
          revalidate: false,
        }
      )
    } catch (error) {
      throw error
    }
  }
}

// Function to create new task via the API
const createNewTaskCall = async (newTask) => {

  // Get relevant data from new task to send via API call
  const { name, done } = newTask

  // Create the task via the API and return the response
  // Our GraphQL query should be set to return the new task
  try {
    // Use fetch and send a PATCH HTTPS call
    const newTaskResponse = await fetch(`/api/create/task`, {
      method: 'POST',
      body: JSON.stringify({
        done: done,
        name: name
      })
    })

    // Parse the response and destructure updatedTask data from response
    const { createTask: newTask } = await newTaskResponse.json()

    // Return updated task
    return newTask

  // If anything breaks, throw error
  } catch (error) {
    throw error
  }
}

// Function to handle input for new tasks
const handleNewTask = (e, setNewTaskName, setValid) => {
  // Set new task name from value
  setNewTaskName(e.target.value)

  // Reset validation
  setValid(true)
}

// Export functions
export {
  createNewTask,
  handleNewTask
}
