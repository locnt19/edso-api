import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar ObjectID

    scalar JSONObject

    scalar EmailAddress

    scalar DateTime

    scalar Date

    scalar URL

    type Query {
        someQuery: String
    }

    type Mutation {
        someMutation(text: String): String
    }
`;
