const { gql } = require('apollo-server-express');
const typeDefs = gql`
scalar Date
type User {
    _id: ID
    username: String
    email: String
    dailyReadings:[DailyReading]
}
type DailyReading{
    _id: ID
    systolic: Int
    diastolic: Int
    pulse: Int
    dateTime: Date 
}

type Query {
    me: User
    users: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, profilePicture: String): Auth
    addDailyReading(pulse: Int,  dateTime: ID, systolic: Int!, diastolic: Int! ) : User
}
type Auth {
    token: ID!
    user: User
}
`
module.exports = typeDefs