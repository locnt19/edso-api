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

const SupportInfoTemplate = `
    schoolId: String
    info: String
`;

const SupportInfoInputTemplate = `
    schoolId: String!
    info: String
`;

export const SupportDefs = gql`
    type Support implements BaseUser {
        ${BaseUserTemplate}
        ${SupportInfoTemplate}
        ${HashMustHave}
    }

    input SupportRegisterInput {
        ${BaseUserRegisterInputTemplate}
        ${SupportInfoInputTemplate}
    }

    input SupportUpdateInput {
        ${BaseUserUpdateInputTemplate}
        ${SupportInfoInputTemplate}
    }

    type SupportPaginate {
        docs: [Support]
        ${PaginateTemplate}
    }

    type MutationOfSupport implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: Support
    }
`;
