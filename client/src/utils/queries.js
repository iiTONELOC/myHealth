import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
query Users {
    users {
        _id
        username
        email
    }
}
`;

export const GET_ME = gql`
query Query {
    me {
        _id
        username
        email
        dailyReadings {
            _id
            pulse
            dateTime
            bloodPressure {
                _id
                systolic
                diastolic
            }
        }
    }
}
`;