import { gql } from 'apollo-server-express';

import { CenterDefs, PaginateDefs } from './types';

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
    }

    type Mutation {
        someMutation(text: String): String
        createCenter(input: CenterCreateInput!): Center
    }

    ${CenterDefs}
    ${PaginateDefs}
`;
