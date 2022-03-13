// Import GraphQL Client
import { GraphQLClient, gql } from 'graphql-request'

// Create instance of GraphQL client
const graphQLClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_PUBLIC_KEY}`,
  },
})

// Create function for listing To Do's
export const listToDos = async () => {
  // Create query
  const query = gql`
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

  // Run query
  return graphQLClient
    .request(query, { size: 999 })
    .then(({ allTodos: { data } }) => data)
}
