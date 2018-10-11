const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const express = require('express');

const { recordFile } = require('./localImages');

const app = express();

/** PRISMA GRAPHQL SERVER */
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
  debug: false, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db }),
})

server.use('/static', express.static('images'));

server.get('/images/:file', (req, res) => {
  const file = 'images/' + req.params.file;
  console.log(file)

  res.download(file);

});

server.start(() => console.log('Server is running on http://localhost:4000'))
