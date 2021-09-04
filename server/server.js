const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const app = express()
const httpServer = http.createServer(app);
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');


async function startApolloServer() {
    const apolloServer = new ApolloServer({
        uri: "http://localhost:3000/graphql",
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context:
            authMiddleware,
    });
    await apolloServer.start();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    apolloServer.applyMiddleware({ app, });
    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
}

db.once('open', () => {
    startApolloServer()
});