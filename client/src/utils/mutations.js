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


export const ADD_DAILY_RD = gql`
mutation addDailyReading($pulse: Int!,  $dateTime: ID,$systolic: Int!, $diastolic: Int!) {
    addDailyReading(pulse: $pulse,  dateTime: $dateTime,systolic: $systolic, diastolic: $diastolic) {
    _id
    username
    dailyReadings {
        _id
        dateTime
        pulse
        diastolic
        systolic
    }
}
}
`;