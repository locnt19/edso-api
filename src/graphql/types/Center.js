import { gql } from 'apollo-server-express';

export const CenterDefs = gql`
    type TimeShift {
        from: String!
        to: String!
    }

    input TimeShiftInput {
        from: String!
        to: String!
    }

    type Center {
        _id: ObjectID!
        name: String!
        phone: String!
        email: String!
        address: String
        website: String
        logo: String!
        type: String!
        status: String!
        subscribeLetter: Boolean
        timeShift: [TimeShift]
    }

    input CenterInput {
        name: String!
        phone: String!
        email: String!
        address: String
        website: String
        logo: String!
        type: String!
        status: String!
        subscribeLetter: Boolean
        timeShift: [TimeShiftInput]
    }
`;
