import { gql } from 'apollo-server-express';

export const AccessTokenDefs = gql`
    type AccessToken {
        accessToken: String
    }

    type MutationOfAccessToken implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
        "CallInAppLoginInfo"
        payload: AccessToken
    }
`;

