import { gql } from 'apollo-server-express';

import { CenterDefs } from './types/Center';

export const typeDefs = gql`
    scalar ObjectID

    scalar JSONObject

    scalar EmailAddress

    scalar DateTime

    scalar Date

    scalar URL

    type Query {
        someQuery: String
        allCenter: [Center]
    }

    type Mutation {
        someMutation(text: String): String
        createCenter(input: CenterInput!): Center
    }

    ${CenterDefs}
`;
