import { gql } from 'apollo-server-express';

import { HashMustHave, HashOptional, PaginateTemplate } from './index';

const CenterTemplate = `
    name: String
    phone: String
    email: String
    address: String
    website: String
    logo: String
    "center | primary_school | secondary_school | high_school"
    level: String
    "active | deactive"
    status: String
    subscribeLetter: Boolean
    termsAndConditions: String
    createdAt: String
    updatedAt: String
`;

const CenterCreateTemplate = `
    name: String!
    phone: String!
    email: String!
    address: String
    website: String
    logo: String
    "center | primary_school | secondary_school | high_school"
    level: String!
    "active | deactive"
    status: String!
    subscribeLetter: Boolean
    termsAndConditions: String
`;

const TimeShiftTemplate = `
    from: Int
    to: Int
    `;

const TimeShiftCreateTempolate = `
    from: Int!
    to: Int!
`;

export const CenterDefs = gql`
    type TimeShift {
        ${HashOptional}
        ${TimeShiftTemplate}
    }

    input TimeShiftCreateInput {
        ${TimeShiftCreateTempolate}
    }

    input TimeShiftUpdateInput {
        ${HashOptional}
        ${TimeShiftTemplate}
    }

    input TimeShiftFilterInput {
        ${HashOptional}
        ${TimeShiftTemplate}
    }

    type Center {
        ${HashOptional}
        ${CenterTemplate}
        timeShift: [TimeShift]
    }

    type CenterPaginate {
        docs: [Center]
        ${PaginateTemplate}
    }

    type MutationOfCenter implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "Center info"
        payload: Center
    }


    input CenterCreateInput {
        ${CenterCreateTemplate}
        timeShift: [TimeShiftCreateInput]
    }

    input CenterUpdateInput {
        ${HashMustHave}
        ${CenterTemplate}
        timeShift: [TimeShiftUpdateInput]
    }

    input CenterFilterInput {
        ${HashOptional}
        ${CenterTemplate}
        timeShift: TimeShiftFilterInput
    }
`;
