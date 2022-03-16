// Import GraphQL Client
import { GraphQLClient, gql } from "graphql-request";

// Create instance of GraphQL client
// Use Fauna key to access data
const graphQLClient = new GraphQLClient(
  "https://graphql.us.fauna.com/graphql",
  {
    headers: {
      authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
    },
  }
);

// Create new task
export const createTask = gql`
  mutation createTask($name: String!) {
    createTask(data: { name: $name, done: false }) {
      _id
      name
      done
    }
  }
`;

// Delete task
export const deleteTask = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(id: $taskId) {
      _id
    }
  }
`;

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
`;

// Update a task's completion status
export const updateTask = gql`
  mutation updateTask($done: Boolean!, $taskId: ID!) {
    partialUpdateTask(id: $taskId, data: { done: $done }) {
      _id
      done
      name
    }
  }
`;

// Create function for fetching data
export const fetcher = async (...args) => {
  try {
    // Get response from fetch
    const response = await fetch(...args);

    // Check if the response includes JSON data
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    // If data is JSON, save it to variable
    // Otherwise set variable to null
    const data = isJson ? await response.json() : null;

    // check for error response
    // We do this because errors in the response aren't return as JavaScript errors
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }

    // Return the data
    return data;
  } catch (error) {
    throw `Error fetching data: ${error}`;
  }
};

// Create function for listing tasks
export const graphFetcher = async (query, mutationVars = undefined) => {
  try {
    // Get query data via GraphQL
    const queryData = await graphQLClient.request(query, mutationVars);

    // Return tasks data
    return queryData;
  } catch (error) {
    // If there's an error, throw it
    throw JSON.stringify(error, undefined, 2);
  }
};
