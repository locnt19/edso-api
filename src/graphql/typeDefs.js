import { gql } from 'apollo-server-express';

import {
    CenterDefs,
    ClassDefs,
    PaginateDefs
} from './types';

export const typeDefs = gql`
    scalar ObjectID

    scalar JSONObject

    scalar EmailAddress

    scalar DateTime

    scalar Date

    scalar URL

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
    }

    type Mutation {
        someMutation(text: String): String

        createCenter(input: CenterCreateInput!): Center
        updateCenter(input: CenterUpdateInput!): Center

        createClass(input: ClassCreateInput!): Class
        updateClass(input: ClassUpdateInput!): Class
    }

    ${CenterDefs}
    ${ClassDefs}
    ${PaginateDefs}
`;
