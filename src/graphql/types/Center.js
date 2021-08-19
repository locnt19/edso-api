import { gql } from 'apollo-server-express';

import { HashMustHave, HashOptional, PaginateTemplate } from './index';

const CenterTemplate = `
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
`;

const CenterCreateTemplate = `
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
`;

export const CenterDefs = gql`
    type TimeShift {
        ${HashOptional}
        from: String
        to: String
    }

    input TimeShiftInput {
        from: String!
        to: String!
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

    input CenterInput {
        ${CenterCreateTemplate}
        timeShift: [TimeShiftInput]
    }

    input CenterUpdateInput {
        ${HashMustHave}
        ${CenterTemplate}
        timeShift: [TimeShiftInput]
    }

    input CenterFilter {
        ${HashOptional}
        ${CenterTemplate}
        timeShift: [TimeShiftInput]
    }
`;
