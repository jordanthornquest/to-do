// Import GraphQL Client
import { GraphQLClient, gql } from 'graphql-request'

// Create instance of GraphQL client
const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
  },
})

// Create function for listing To Do's
export const listToDos = async () => {
  // Create query
  const query = gql`
    query Entries($size: Int) {
      entries(_size: $size) {
        data {
          _id
          name
          createdAt
        }
      }
    }
  `

  // Run query
  return graphQLClient
    .request(query, { size: 999 })
    .then(({ entries: { data } }) => data)
}
