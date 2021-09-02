const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');


const server = new ApolloServer({
    uri: "http://localhost:3000/graphql",
    typeDefs,
    resolvers,
    context:
        authMiddleware,
});

server.applyMiddleware({ app });
app.use(express.urlencoded());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

db.once('open', () => {
    server.listen(PORT, () => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`API server running on port ${PORT}!`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        }
    });
});