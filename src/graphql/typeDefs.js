import { gql } from 'apollo-server-express';

import {
    CenterDefs,
    ClassDefs,
    PaginateDefs,
    BaseUserDefs,
    AdminDefs,
    TeacherDefs,
    StudentDefs,
    ManagerDefs,
    SupportDefs,
    AccessTokenDefs
} from './types';

export const typeDefs = gql`
    scalar ObjectID

    scalar JSONObject

    scalar EmailAddress

    scalar DateTime

    scalar Date

    scalar URL

    enum Role {
        Admin
        Manager
        Support
        Teacher
        Student
    }

    enum Level {
        Bachelor
        Master
        PhD
    }

    type Query {
        someQuery: String

        getCenter(
            paginate: PaginateInput
            filter: CenterFilterInput
        ): CenterPaginate

        getClass(
            paginate: PaginateInput
            filter: ClassFilterInput
        ): ClassPaginate
        getMe: BaseUser
        getUserById(userHash: String!): BaseUser
        getListUser(paginate: PaginateInput, filter: UserFilterInput): UserPaginate
    }

    type Mutation {
        someMutation(text: String): String

        createCenter(input: CenterCreateInput!): MutationOfCenter
        updateCenter(input: CenterUpdateInput!): MutationOfCenter

        createClass(input: ClassCreateInput!): MutationOfClass
        updateClass(input: ClassUpdateInput!): MutationOfClass

        registerAdmin(input: AdminRegisterInput!): MutationOfAdmin
        deactivateAccount(email: String!): MutationOfBaseUser
        registerTeacher(input: TeacherRegisterInput!): MutationOfTeacher
        registerStudent(input: StudentRegisterInput!): MutationOfStudent
        registerManager(input: ManagerRegisterInput!): MutationOfManager
        registerSupport(input: SupportRegisterInput!): MutationOfSupport
        loginUser(email: String!, password: String!): MutationOfAccessToken
        logoutUser: MutationOfAccessToken
        updateUser(input: UserUpdateInput!): MutationOfBaseUser
    }

    interface MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
    }
    ${CenterDefs}
    ${ClassDefs}
    ${PaginateDefs}
    ${BaseUserDefs}
    ${AdminDefs}
    ${TeacherDefs}
    ${StudentDefs}
    ${ManagerDefs}
    ${SupportDefs}
    ${AccessTokenDefs}
`;
