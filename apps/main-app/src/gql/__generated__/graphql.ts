/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any }
}

export enum AuthProviderTypeEnum {
  Google = 'GOOGLE',
}

export enum SubscriptionPlanEnum {
  Basic = 'BASIC',
  Free = 'FREE',
  Hobby = 'HOBBY',
  Pro = 'PRO',
}

export type UsersInputObject = {
  firstName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
}

export type DocumentsList_AllDocumentsQueryVariables = Exact<{ [key: string]: never }>

export type DocumentsList_AllDocumentsQuery = {
  __typename?: 'Query'
  documents: Array<{ __typename?: 'Document'; id: string; name: string; url?: string | null }>
}

export type DocumentsList_ArchivedDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DocumentsList_ArchivedDocumentMutation = {
  __typename?: 'Mutation'
  archiveDocument: { __typename?: 'Document'; id: string }
}

export type ForgotPassword_AuthPasswordResetRequestMutationVariables = Exact<{
  email: Scalars['String']['input']
}>

export type ForgotPassword_AuthPasswordResetRequestMutation = {
  __typename?: 'Mutation'
  authPasswordResetRequest: string
}

export type ResetPassword_ResetPasswordAllowedQueryVariables = Exact<{
  resetPasswordToken: Scalars['String']['input']
}>

export type ResetPassword_ResetPasswordAllowedQuery = {
  __typename?: 'Query'
  resetPasswordAllowed: boolean
}

export type ResetPassword_ResetPasswordMutationVariables = Exact<{
  resetPasswordToken: Scalars['String']['input']
  newPassword: Scalars['String']['input']
}>

export type ResetPassword_ResetPasswordMutation = {
  __typename?: 'Mutation'
  authResetPassword: string
}

export type EmailVerify_EmailVerifyAllowedQueryVariables = Exact<{
  emailVerificationCode: Scalars['String']['input']
}>

export type EmailVerify_EmailVerifyAllowedQuery = {
  __typename?: 'Query'
  emailVerifyAllowed?: {
    __typename?: 'Users'
    firstName?: string | null
    lastName?: string | null
    email: string
  } | null
}

export type UsersUpdateFragment = {
  __typename?: 'Users'
  id: string
  firstName?: string | null
  lastName?: string | null
}

export type AccountSettingsDialog_UserQueryVariables = Exact<{ [key: string]: never }>

export type AccountSettingsDialog_UserQuery = {
  __typename?: 'Query'
  user: { __typename?: 'Users'; id: string; firstName?: string | null; lastName?: string | null }
}

export type AccountSettingsDialog_UpdateUserMutationVariables = Exact<{
  attributes: UsersInputObject
}>

export type AccountSettingsDialog_UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'Users'
    id: string
    firstName?: string | null
    lastName?: string | null
  }
}

export type UploadDocumentMutationVariables = Exact<{
  uploadSignedId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type UploadDocumentMutation = {
  __typename?: 'Mutation'
  uploadDocument: { __typename?: 'Document'; id: string; name: string }
}

export type AuthResponseFragment = {
  __typename?: 'AuthResponse'
  token?: string | null
  user?: {
    __typename?: 'Users'
    id: string
    business: { __typename?: 'Business'; id: string; name: string }
  } | null
}

export type ProviderAuthenticationMutationVariables = Exact<{
  data: Scalars['String']['input']
  firstName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  provider: AuthProviderTypeEnum
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>
}>

export type ProviderAuthenticationMutation = {
  __typename?: 'Mutation'
  authProviderAuthenticate: {
    __typename?: 'AuthResponse'
    token?: string | null
    user?: {
      __typename?: 'Users'
      id: string
      business: { __typename?: 'Business'; id: string; name: string }
    } | null
  }
}

export type CredentialsAuthenticationSignInMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type CredentialsAuthenticationSignInMutation = {
  __typename?: 'Mutation'
  authSignIn: {
    __typename?: 'AuthResponse'
    token?: string | null
    user?: {
      __typename?: 'Users'
      id: string
      business: { __typename?: 'Business'; id: string; name: string }
    } | null
  }
}

export type CredentialsAuthenticationSignUpMutationVariables = Exact<{
  email: Scalars['String']['input']
  firstName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>
}>

export type CredentialsAuthenticationSignUpMutation = {
  __typename?: 'Mutation'
  authSignUp: {
    __typename?: 'AuthResponse'
    token?: string | null
    user?: {
      __typename?: 'Users'
      id: string
      business: { __typename?: 'Business'; id: string; name: string }
    } | null
  }
}

export type CredentialsAuthenticationEmailVerifyMutationVariables = Exact<{
  emailVerificationCode: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type CredentialsAuthenticationEmailVerifyMutation = {
  __typename?: 'Mutation'
  userEmailVerify: {
    __typename?: 'AuthResponse'
    token?: string | null
    user?: {
      __typename?: 'Users'
      id: string
      business: { __typename?: 'Business'; id: string; name: string }
    } | null
  }
}

export type UseBillingPlan_SubscriptionSessionCreateMutationVariables = Exact<{
  plan: SubscriptionPlanEnum
}>

export type UseBillingPlan_SubscriptionSessionCreateMutation = {
  __typename?: 'Mutation'
  subscriptionsSessionCreate: string
}

export type UseBillingPlan_BillingPortalUrlMutationVariables = Exact<{ [key: string]: never }>

export type UseBillingPlan_BillingPortalUrlMutation = {
  __typename?: 'Mutation'
  billingPortalUrl: string
}

export type UsersFragment = {
  __typename?: 'Users'
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  business: { __typename?: 'Business'; id: string; name: string; plan: SubscriptionPlanEnum }
}

export type UseCurrentUser_UsersQueryVariables = Exact<{ [key: string]: never }>

export type UseCurrentUser_UsersQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'Users'
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    business: { __typename?: 'Business'; id: string; name: string; plan: SubscriptionPlanEnum }
  }
}

export type Plan_SubscriptionSessionFetchMutationVariables = Exact<{
  sessionId: Scalars['ID']['input']
}>

export type Plan_SubscriptionSessionFetchMutation = {
  __typename?: 'Mutation'
  subscriptionsSessionFetch: string
}

export const UsersUpdateFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UsersUpdate' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Users' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersUpdateFragment, unknown>
export const AuthResponseFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'token' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthResponseFragment, unknown>
export const UsersFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Users' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Users' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'business' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'plan' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersFragment, unknown>
export const DocumentsList_AllDocumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DocumentsList_allDocuments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'documents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DocumentsList_AllDocumentsQuery,
  DocumentsList_AllDocumentsQueryVariables
>
export const DocumentsList_ArchivedDocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DocumentsList_archivedDocument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'archiveDocument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'documentId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DocumentsList_ArchivedDocumentMutation,
  DocumentsList_ArchivedDocumentMutationVariables
>
export const ForgotPassword_AuthPasswordResetRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ForgotPassword_authPasswordResetRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authPasswordResetRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPassword_AuthPasswordResetRequestMutation,
  ForgotPassword_AuthPasswordResetRequestMutationVariables
>
export const ResetPassword_ResetPasswordAllowedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ResetPassword_resetPasswordAllowed' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resetPasswordToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPasswordAllowed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resetPasswordToken' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resetPasswordToken' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPassword_ResetPasswordAllowedQuery,
  ResetPassword_ResetPasswordAllowedQueryVariables
>
export const ResetPassword_ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword_resetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resetPasswordToken' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authResetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resetPasswordToken' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resetPasswordToken' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPassword_ResetPasswordMutation,
  ResetPassword_ResetPasswordMutationVariables
>
export const EmailVerify_EmailVerifyAllowedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EmailVerify_emailVerifyAllowed' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'emailVerificationCode' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'emailVerifyAllowed' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'emailVerificationCode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'emailVerificationCode' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EmailVerify_EmailVerifyAllowedQuery,
  EmailVerify_EmailVerifyAllowedQueryVariables
>
export const AccountSettingsDialog_UserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountSettingsDialog_user' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UsersUpdate' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UsersUpdate' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Users' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountSettingsDialog_UserQuery,
  AccountSettingsDialog_UserQueryVariables
>
export const AccountSettingsDialog_UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AccountSettingsDialog_updateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'attributes' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UsersInputObject' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'attributes' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'attributes' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UsersUpdate' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UsersUpdate' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Users' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountSettingsDialog_UpdateUserMutation,
  AccountSettingsDialog_UpdateUserMutationVariables
>
export const UploadDocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'uploadDocument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'uploadSignedId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadDocument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'uploadSignedId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'uploadSignedId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadDocumentMutation, UploadDocumentMutationVariables>
export const ProviderAuthenticationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ProviderAuthentication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'provider' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthProviderTypeEnum' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resumeUniqueId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'referredByUserUniqueId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authProviderAuthenticate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'provider' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'provider' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resumeUniqueId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resumeUniqueId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'referredByUserUniqueId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'referredByUserUniqueId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthResponse' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'token' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProviderAuthenticationMutation,
  ProviderAuthenticationMutationVariables
>
export const CredentialsAuthenticationSignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CredentialsAuthenticationSignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authSignIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthResponse' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'token' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CredentialsAuthenticationSignInMutation,
  CredentialsAuthenticationSignInMutationVariables
>
export const CredentialsAuthenticationSignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CredentialsAuthenticationSignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'referredByUserUniqueId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resumeUniqueId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authSignUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'referredByUserUniqueId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'referredByUserUniqueId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resumeUniqueId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resumeUniqueId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthResponse' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'token' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CredentialsAuthenticationSignUpMutation,
  CredentialsAuthenticationSignUpMutationVariables
>
export const CredentialsAuthenticationEmailVerifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CredentialsAuthenticationEmailVerify' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'emailVerificationCode' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userEmailVerify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'emailVerificationCode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'emailVerificationCode' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'firstName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lastName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthResponse' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthResponse' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AuthResponse' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'token' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'business' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CredentialsAuthenticationEmailVerifyMutation,
  CredentialsAuthenticationEmailVerifyMutationVariables
>
export const UseBillingPlan_SubscriptionSessionCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'useBillingPlan_subscriptionSessionCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'plan' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SubscriptionPlanEnum' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subscriptionsSessionCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'plan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'plan' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UseBillingPlan_SubscriptionSessionCreateMutation,
  UseBillingPlan_SubscriptionSessionCreateMutationVariables
>
export const UseBillingPlan_BillingPortalUrlDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'useBillingPlan_billingPortalUrl' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'billingPortalUrl' } }],
      },
    },
  ],
} as unknown as DocumentNode<
  UseBillingPlan_BillingPortalUrlMutation,
  UseBillingPlan_BillingPortalUrlMutationVariables
>
export const UseCurrentUser_UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'useCurrentUser_users' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Users' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Users' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Users' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'business' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'plan' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UseCurrentUser_UsersQuery, UseCurrentUser_UsersQueryVariables>
export const Plan_SubscriptionSessionFetchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Plan_subscriptionSessionFetch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subscriptionsSessionFetch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sessionId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sessionId' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Plan_SubscriptionSessionFetchMutation,
  Plan_SubscriptionSessionFetchMutationVariables
>
