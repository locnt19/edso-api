import { gql } from 'apollo-server-express';

export const CenterDefs = gql`
    type TimeShift {
        hash: String!
        from: String!
        to: String!
    }

    input TimeShiftInput {
        from: String!
        to: String!
    }

    type Center {
        hash: String!
        name: String
        phone: String
        email: String
        address: String
        website: String
        logo: String
        type: String
        status: String
        subscribeLetter: Boolean
        termsAndConditions: String
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
        termsAndConditions: String
        timeShift: [TimeShiftInput]
    }
`;
