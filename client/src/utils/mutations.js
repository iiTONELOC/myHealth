import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        username
        email
    }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user {
        _id
        username
        email
    }
    }
}
`;

export const ADD_BP = gql`
mutation addBloodPressure($systolic: Int!, $diastolic: Int!) {
    addBloodPressure(systolic: $systolic, diastolic: $diastolic) {
    _id
    systolic
    diastolic
    }
}
`;

export const ADD_DAILY_RD = gql`
mutation addDailyReading($pulse: Int!, $bloodPressure: ID!, $dateTime: ID) {
    addDailyReading(pulse: $pulse, bloodPressure: $bloodPressure, dateTime: $dateTime) {
    _id
    username
    dailyReadings {
        _id
        dateTime
        pulse
    bloodPressure {
        _id
        diastolic
        systolic
    }
    }
}
}
`;