import { gql } from 'apollo-server-express';

import { HashMustHave, PaginateTemplate } from './index';

export const BaseUserTemplate = `
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
    isBlock: Boolean
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

export const BaseUserUpdateInputTemplate = `
    fullName: String
    birthDate: Date
    gender: String
    email: String
    phone: String
    address: String
    avatar: URL
    isBlock: Boolean
`;
export const UserFilterInputTemplate = `
    schoolId: String
    role: Role
    isActive: Boolean
    isBlock: Boolean
`;

export const BaseUserDefs = gql`
    interface BaseUser {
        ${BaseUserTemplate}
        ${HashMustHave}
    }

    input UserUpdateInput {
        admin: AdminUpdateInput
        teacher: TeacherUpdateInput
        student: StudentUpdateInput
        manager: ManagerUpdateInput
        support: SupportUpdateInput
    }

    input UserFilterInput {
        ${UserFilterInputTemplate}
    }

    type UserPaginate {
        docs: [BaseUser]
        ${PaginateTemplate}
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
