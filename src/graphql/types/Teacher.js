import { gql } from 'apollo-server-express';

import {
    IdOptional,
    HashMustHave,
    HashOptional,
    PaginateTemplate,
    BaseUserTemplate,
    BaseUserRegisterInputTemplate
} from './index';

const TeacherInfoTemplate = `
    schoolId: String
    level: Level
    workPlace: String
    subject: String
`;

const TeacherInfoInputTemplate = `
    schoolId: String!
    level: Level!
    workPlace: String!
    subject: String!
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
