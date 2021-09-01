import { gql } from 'apollo-server-express';

import {
    CenterDefs,
    ClassDefs,
    PaginateDefs,
    BaseUserDefs,
    AdminDefs,
    TeacherDefs,
    StudentDefs,
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
    }

    type Mutation {
        someMutation(text: String): String

        createCenter(input: CenterCreateInput!): MutationOfCenter
        updateCenter(input: CenterUpdateInput!): MutationOfCenter

        createClass(input: ClassCreateInput!): MutationOfClass
        updateClass(input: ClassUpdateInput!): MutationOfClass

        deactivateAccount(email: String!): MutationOfBaseUser

        registerAdmin(adminInfo: AdminRegisterInput!): MutationOfAdmin
        registerTeacher(teacherInfo: TeacherRegisterInput!): MutationOfTeacher
        registerStudent(studentInfo: StudentRegisterInput!): MutationOfStudent

        loginUser(email: String!, password: String!): MutationOfAccessToken
        logoutUser: MutationOfAccessToken
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
    ${AccessTokenDefs}
`;
