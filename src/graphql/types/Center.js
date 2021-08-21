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

const TimeShiftTemplate = `
    from: String
    to: String
    `;

const TimeShiftCreateTempolate = `
    from: String!
    to: String!
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
