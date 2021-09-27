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

const AdminInfoTemplate = `
    info: String
`;

const AdminInfoInputTemplate = `
    info: String
`;

export const AdminDefs = gql`
    type Admin implements BaseUser {
        ${BaseUserTemplate}
        ${AdminInfoTemplate}
        ${HashMustHave}
    }

    input AdminRegisterInput {
        ${BaseUserRegisterInputTemplate}
        ${AdminInfoInputTemplate}
    }

    input AdminUpdateInput{
        ${BaseUserUpdateInputTemplate}
        ${AdminInfoInputTemplate}
    }

    type AdminPaginate {
        docs: [Admin]
        ${PaginateTemplate}
    }

    type MutationOfAdmin implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: Admin
    }
`;

