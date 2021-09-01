import { gql } from 'apollo-server-express';

import {
    IdOptional,
    HashMustHave,
    HashOptional,
    PaginateTemplate
} from './index';

export const BaseUserTemplate = `
    password: String
    fullName: String
    birthDate: Date
    gender: String
    email: String
    phone: String
    address: String
    role: Role
    avatar: URL
    createdAt: Date
    isActive: Boolean
`;

export const BaseUserRegisterInputTemplate = `
    password: String!
    fullName: String!
    birthDate: Date!
    gender: String!
    email: String!
    phone: String!
    address: String
    avatar: URL
`;

export const BaseUserDefs = gql`
    interface BaseUser {
        ${BaseUserTemplate}
        ${HashMustHave}
    }

    type MutationOfBaseUser implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: BaseUser
    }

`;

export const BaseUserResolver = {
    __resolveType: obj => {
        if (obj.role) {
            return obj.role;
        }
        return null;
    }
};
