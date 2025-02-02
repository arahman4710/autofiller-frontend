/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  'query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}':
    types.DocumentsList_AllDocumentsDocument,
  'mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}':
    types.ForgotPassword_AuthPasswordResetRequestDocument,
  'query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}':
    types.ResetPassword_ResetPasswordAllowedDocument,
  'query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}':
    types.EmailVerify_EmailVerifyAllowedDocument,
  'fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}':
    types.UsersUpdateFragmentDoc,
  'mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}':
    types.UploadDocumentDocument,
  'fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}':
    types.AuthResponseFragmentDoc,
  'mutation useBillingPlan_subscriptionSessionCreate($plan: SubscriptionPlanEnum!) {\n  subscriptionsSessionCreate(plan: $plan)\n}\n\nmutation useBillingPlan_billingPortalUrl {\n  billingPortalUrl\n}':
    types.UseBillingPlan_SubscriptionSessionCreateDocument,
  'fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n    plan\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}':
    types.UsersFragmentDoc,
  'mutation Plan_subscriptionSessionFetch($sessionId: ID!) {\n  subscriptionsSessionFetch(sessionId: $sessionId)\n}':
    types.Plan_SubscriptionSessionFetchDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}'
): (typeof documents)['query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}'
): (typeof documents)['mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}'
): (typeof documents)['query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}'
): (typeof documents)['query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}'
): (typeof documents)['fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}'
): (typeof documents)['mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}'
): (typeof documents)['fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation useBillingPlan_subscriptionSessionCreate($plan: SubscriptionPlanEnum!) {\n  subscriptionsSessionCreate(plan: $plan)\n}\n\nmutation useBillingPlan_billingPortalUrl {\n  billingPortalUrl\n}'
): (typeof documents)['mutation useBillingPlan_subscriptionSessionCreate($plan: SubscriptionPlanEnum!) {\n  subscriptionsSessionCreate(plan: $plan)\n}\n\nmutation useBillingPlan_billingPortalUrl {\n  billingPortalUrl\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n    plan\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}'
): (typeof documents)['fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n    plan\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation Plan_subscriptionSessionFetch($sessionId: ID!) {\n  subscriptionsSessionFetch(sessionId: $sessionId)\n}'
): (typeof documents)['mutation Plan_subscriptionSessionFetch($sessionId: ID!) {\n  subscriptionsSessionFetch(sessionId: $sessionId)\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
