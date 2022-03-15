// Import GraphQL Client
import { GraphQLClient, gql } from 'graphql-request'

// Create instance of GraphQL client
// Use Fauna key to access data
const graphQLClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
  },
})

// Create new task
export const createTask = gql`
  mutation createTask ($name: String!) {
    createTask(data: {
      name: $name
      done: false
    }) {
      _id
      name
      done
    }
  }
`

// Find all tasks
export const findAllTasks = gql`
  query findAllTasks {
    allTasks {
      data {
        _id
        name
        done
      }
    }
  }
`

// Update a task's completion status
export const updateTask = gql`
  mutation updateTask ($done: Boolean!, $taskId: ID!) {
    partialUpdateTask(id: $taskId data:{
      done: $done
    }) {
      _id
      done
      name
    }
  }
`

// Create function for listing tasks
export const graphFetcher = async (query, mutationVars=undefined) => {
  try {
    // Get query data via GraphQL
    const queryData = await graphQLClient.request(query, mutationVars)

    // Return tasks data
    return queryData
  } catch (error) {
    // If there's an error, throw it
    throw JSON.stringify(error, undefined, 2)
  }
}
