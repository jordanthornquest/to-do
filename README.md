# KRS Global Domination Planner

A to-do application built with NextJS & Fauna. The UI is built with Bootstrap 5. GraphQL & SWR are used for data fetching, efficient caching, and streaming updates, meaning multiple users can collaborate on tasks. The application employs an optimistic user interface, meaning interactions occur instantly while API requests are handled in the background. If any API updates fail, the application will seamlessly rollback to correct data from the server.

## Getting started

### Fauna setup
Upload the included schema in `/schemas/` to Fauna. This will initialize the data structure and GraphQL schema for a new `Task` collection. Once a schema is uploaded, generate a security key to access the collection via GraphQL.

### Repository setup
After cloning this repository, install dependencies:

```bash
npm install
```

Once the dependencies have been installed, create a `.env.local` file, and add the security key.

```
FAUNA_ADMIN_KEY=<your-secret-token>
```

Run the dev server to start the application.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

[Live site on Netlify](https://krs-global-domination-planner.netlify.app/)

This application is deployed to Netlify. Deployment is handled automatically whenever code is pushed to `main`. The database secret key is configured with Netlify, to ensure data access.
