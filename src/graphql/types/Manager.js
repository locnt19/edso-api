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

const ManagerInfoTemplate = `
    info: String
`;

const ManagerInfoInputTemplate = `
    info: String
`;

export const ManagerDefs = gql`
    type Manager implements BaseUser {
        ${BaseUserTemplate}
        ${ManagerInfoTemplate}
        ${HashMustHave}
    }

    input ManagerRegisterInput {
        ${BaseUserRegisterInputTemplate}
        ${ManagerInfoInputTemplate}
    }

    input ManagerUpdateInput {
        ${BaseUserUpdateInputTemplate}
        ${ManagerInfoInputTemplate}
    }

    type ManagerPaginate {
        docs: [Manager]
        ${PaginateTemplate}
    }

    type MutationOfManager implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: Manager
    }
`;
