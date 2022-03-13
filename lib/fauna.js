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

// Create function for listing To Do's
export const graphFetcher = async (query) => {
  try {
    // Get data from query
    const queryData = await graphQLClient.request(query)

    // Return todos data
    return queryData
  } catch (error) {
    // If there's an error, throw it
    throw JSON.stringify(error, undefined, 2)
  }
}
