import { gql } from 'apollo-server-express';

import {
    IdOptional,
    HashMustHave,
    HashOptional,
    PaginateTemplate,
    BaseUserTemplate,
    BaseUserRegisterInputTemplate
} from './index';

const StudentInfoTemplate = `
    schoolID: String
    classIDs: [ObjectID]
`;

const StudentInfoInputTemplate = `
    schoolID: String!
    classIDs: [ObjectID]
`;

export const StudentDefs = gql`
    type Student implements BaseUser {
        ${BaseUserTemplate}
        ${StudentInfoTemplate}
        ${HashMustHave}
    }

    input StudentRegisterInput {
        ${BaseUserRegisterInputTemplate}
        ${StudentInfoInputTemplate}
    }

    type StudentPaginate {
        docs: [Student]
        ${PaginateTemplate}
    }

    type MutationOfStudent implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: Student
    }
`;
