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

const TeacherInfoTemplate = `
    centerId: String
    level: Level
    workPlace: String
    subjects: [String]
    classIds: [ObjectID]
`;

const TeacherInfoInputTemplate = `
    level: Level!
    workPlace: String!
    subjects: [String!]
    classIds: [ObjectID]
`;

export const TeacherDefs = gql`
    type Teacher implements BaseUser {
        ${BaseUserTemplate}
        ${TeacherInfoTemplate}
        ${HashMustHave}
    }

    input TeacherRegisterInput {
        ${BaseUserRegisterInputTemplate}
        ${TeacherInfoInputTemplate}
    }

    input TeacherUpdateInput {
        ${BaseUserUpdateInputTemplate}
        ${TeacherInfoInputTemplate}
    }

    type TeacherPaginate {
        docs: [Teacher]
        ${PaginateTemplate}
    }

    type MutationOfTeacher implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: Teacher
    }
`;
