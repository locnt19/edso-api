import { gql } from 'apollo-server-express';

import {
    IdOptional,
    HashMustHave,
    HashOptional,
    PaginateTemplate,
    BaseUserTemplate,
    BaseUserRegisterInputTemplate,
    BaseUserUpdateInputTemplate
} from './index';

const StudentInfoTemplate = `
    schoolId: String
    classIDs: [ObjectID]
`;

const StudentInfoInputTemplate = `
    schoolId: String
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

    input StudentUpdateInput {
        ${BaseUserUpdateInputTemplate}
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
