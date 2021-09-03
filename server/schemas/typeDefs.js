const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Date
type User {
    _id: ID
    username: String
    email: String
    dailyReadings:[DailyReading]
}
type BloodPressure{
    _id: ID
    systolic: Int
    diastolic: Int
}
type DailyReading{
    _id: ID
    bloodPressure: BloodPressure
    pulse: Int
    dateTime: Date 
}

type Query {
    me: User
    users: [User]
    bloodPressure:[BloodPressure]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, profilePicture: String): Auth
    addBloodPressure(systolic: Int!, diastolic: Int!): BloodPressure
    addDailyReading(pulse: Int, bloodPressure: ID!, dateTime: ID ) : User
}
type Auth {
    token: ID!
    user: User
}
`

// export the typeDefs
module.exports = typeDefs