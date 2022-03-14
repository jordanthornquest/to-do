// Import GraphQL Client
import { GraphQLClient, gql } from 'graphql-request'

// Create instance of GraphQL client
const graphQLClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_PUBLIC_KEY}`,
  },
})

// Create query for listing all todos
export const findAllTodos = gql`
  query FindAllTodos {
    allTodos {
      data {
        _id
        name
        done
      }
    }
  }
`

// Create mutation for updating a todo's status
export const updateTodo = gql`
  mutation updateTodo ($completed: Boolean!, $taskId: ID!) {
    partialUpdateTodo(id: $taskId data:{
      done: $completed
    }) {
      done
    }
  }
`

// Create function for listing To Do's
export const graphFetcher = async (query, mutationVars=undefined) => {
  try {
    // Get query data via GraphQL
    const queryData = await graphQLClient.request(query, mutationVars)

    // Return todos data
    return queryData
  } catch (error) {
    // If there's an error, throw it
    throw JSON.stringify(error, undefined, 2)
  }
}
