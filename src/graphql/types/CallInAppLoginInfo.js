import { gql } from 'apollo-server-express';

export const CallInAppLoginInfoTypeDefs = gql`
  type CallOptions {
    callerIdName: String
    callerIdNumber: String
  }

  type CallInAppUserInfo {
    id: ObjectID
  }

  type CallInAppLoginInfo {
    id: ObjectID
    wssUrl: String
    extension: String
    password: String
    domain: String
    createdAt: DateTime
    callOptions: CallOptions
    userInfo: CallInAppUserInfo
  }

  type CallInAppUserExtension {
    id: ObjectID
    extension: String
    userId: ObjectID
  }

  type MutationOfCallInAppLoginInfo implements MutationOf {
    "Mutation result"
    success: Boolean
    "Mutation message"
    msg: String
    "CallInAppLoginInfo"
    payload: CallInAppLoginInfo
  }
`;

export const CallInAppLoginInfoResolver = {
  id: (instance) => instance.id || instance._id,
};
