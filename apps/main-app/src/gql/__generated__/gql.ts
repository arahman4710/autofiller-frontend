/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "mutation addBusinessName($name: String!) {\n  updateBusiness(name: $name) {\n    id\n    name\n  }\n}": types.AddBusinessNameDocument,
    "query Chat_getChat($chatId: [ID!]) {\n  chats(chatIds: $chatId) {\n    id\n    status\n    messages {\n      fromUser\n      message\n      chatMessageSources {\n        score\n        document {\n          name\n          url\n        }\n      }\n    }\n  }\n}\n\nsubscription ChatSubscription {\n  chat {\n    content\n    chatId\n    initial\n    requestId\n    i\n    final\n  }\n}\n\nmutation Chat_addMessage($chatId: String!, $message: String!) {\n  chatAddMessage(chatId: $chatId, message: $message) {\n    id\n    status\n    messages {\n      fromUser\n      message\n    }\n  }\n}": types.Chat_GetChatDocument,
    "mutation Chat_StartChat {\n  chatStart {\n    id\n  }\n}": types.Chat_StartChatDocument,
    "query ChatSidebar_chats {\n  chats {\n    id\n  }\n}": types.ChatSidebar_ChatsDocument,
    "query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}": types.DocumentsList_AllDocumentsDocument,
    "query PageCheck_getPageCheck($pageCheckIds: [ID!]) {\n  pageChecks(pageCheckIds: $pageCheckIds) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}\n\nmutation PageCheck_manuallyRunPageCheck($id: ID!) {\n  manuallyRunPageCheck(pageCheckId: $id) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}": types.PageCheck_GetPageCheckDocument,
    "query PageChecksList_allPageChecks {\n  pageChecks {\n    id\n    pageUrl\n    checkInterval\n    resultType\n  }\n}\n\nmutation PageChecksList_archivedPageCheck($id: ID!) {\n  archivePageCheck(pageCheckId: $id) {\n    id\n  }\n}": types.PageChecksList_AllPageChecksDocument,
    "mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}": types.ForgotPassword_AuthPasswordResetRequestDocument,
    "query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}": types.ResetPassword_ResetPasswordAllowedDocument,
    "query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}": types.EmailVerify_EmailVerifyAllowedDocument,
    "fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}": types.UsersUpdateFragmentDoc,
    "mutation NewPageCheckDialog_createPageCheck($url: String!, $checkInterval: PageCheckIntervalEnum!, $resultType: PageCheckResultTypeEnum!, $pageCheckType: PageCheckTypeEnum!, $prompt: String, $multiplePages: Boolean!, $priceDiscrepancyThresholdAmount: Float) {\n  createPageCheck(\n    url: $url\n    checkInterval: $checkInterval\n    resultType: $resultType\n    pageCheckType: $pageCheckType\n    prompt: $prompt\n    multiplePages: $multiplePages\n    priceDiscrepancyThresholdAmount: $priceDiscrepancyThresholdAmount\n  ) {\n    id\n  }\n}": types.NewPageCheckDialog_CreatePageCheckDocument,
    "mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}": types.UploadDocumentDocument,
    "fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}": types.AuthResponseFragmentDoc,
    "fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}": types.UsersFragmentDoc,
};

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
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation addBusinessName($name: String!) {\n  updateBusiness(name: $name) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addBusinessName($name: String!) {\n  updateBusiness(name: $name) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Chat_getChat($chatId: [ID!]) {\n  chats(chatIds: $chatId) {\n    id\n    status\n    messages {\n      fromUser\n      message\n      chatMessageSources {\n        score\n        document {\n          name\n          url\n        }\n      }\n    }\n  }\n}\n\nsubscription ChatSubscription {\n  chat {\n    content\n    chatId\n    initial\n    requestId\n    i\n    final\n  }\n}\n\nmutation Chat_addMessage($chatId: String!, $message: String!) {\n  chatAddMessage(chatId: $chatId, message: $message) {\n    id\n    status\n    messages {\n      fromUser\n      message\n    }\n  }\n}"): (typeof documents)["query Chat_getChat($chatId: [ID!]) {\n  chats(chatIds: $chatId) {\n    id\n    status\n    messages {\n      fromUser\n      message\n      chatMessageSources {\n        score\n        document {\n          name\n          url\n        }\n      }\n    }\n  }\n}\n\nsubscription ChatSubscription {\n  chat {\n    content\n    chatId\n    initial\n    requestId\n    i\n    final\n  }\n}\n\nmutation Chat_addMessage($chatId: String!, $message: String!) {\n  chatAddMessage(chatId: $chatId, message: $message) {\n    id\n    status\n    messages {\n      fromUser\n      message\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Chat_StartChat {\n  chatStart {\n    id\n  }\n}"): (typeof documents)["mutation Chat_StartChat {\n  chatStart {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ChatSidebar_chats {\n  chats {\n    id\n  }\n}"): (typeof documents)["query ChatSidebar_chats {\n  chats {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}"): (typeof documents)["query DocumentsList_allDocuments {\n  documents {\n    id\n    name\n    url\n  }\n}\n\nmutation DocumentsList_archivedDocument($id: ID!) {\n  archiveDocument(documentId: $id) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PageCheck_getPageCheck($pageCheckIds: [ID!]) {\n  pageChecks(pageCheckIds: $pageCheckIds) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}\n\nmutation PageCheck_manuallyRunPageCheck($id: ID!) {\n  manuallyRunPageCheck(pageCheckId: $id) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}"): (typeof documents)["query PageCheck_getPageCheck($pageCheckIds: [ID!]) {\n  pageChecks(pageCheckIds: $pageCheckIds) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}\n\nmutation PageCheck_manuallyRunPageCheck($id: ID!) {\n  manuallyRunPageCheck(pageCheckId: $id) {\n    id\n    pageUrl\n    checkInterval\n    resultType\n    prompt\n    pageCheckResults {\n      id\n      createdAt\n      result\n      sameResultAsLastRun\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PageChecksList_allPageChecks {\n  pageChecks {\n    id\n    pageUrl\n    checkInterval\n    resultType\n  }\n}\n\nmutation PageChecksList_archivedPageCheck($id: ID!) {\n  archivePageCheck(pageCheckId: $id) {\n    id\n  }\n}"): (typeof documents)["query PageChecksList_allPageChecks {\n  pageChecks {\n    id\n    pageUrl\n    checkInterval\n    resultType\n  }\n}\n\nmutation PageChecksList_archivedPageCheck($id: ID!) {\n  archivePageCheck(pageCheckId: $id) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}"): (typeof documents)["mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}"): (typeof documents)["query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}"): (typeof documents)["query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}"): (typeof documents)["fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation NewPageCheckDialog_createPageCheck($url: String!, $checkInterval: PageCheckIntervalEnum!, $resultType: PageCheckResultTypeEnum!, $pageCheckType: PageCheckTypeEnum!, $prompt: String, $multiplePages: Boolean!, $priceDiscrepancyThresholdAmount: Float) {\n  createPageCheck(\n    url: $url\n    checkInterval: $checkInterval\n    resultType: $resultType\n    pageCheckType: $pageCheckType\n    prompt: $prompt\n    multiplePages: $multiplePages\n    priceDiscrepancyThresholdAmount: $priceDiscrepancyThresholdAmount\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation NewPageCheckDialog_createPageCheck($url: String!, $checkInterval: PageCheckIntervalEnum!, $resultType: PageCheckResultTypeEnum!, $pageCheckType: PageCheckTypeEnum!, $prompt: String, $multiplePages: Boolean!, $priceDiscrepancyThresholdAmount: Float) {\n  createPageCheck(\n    url: $url\n    checkInterval: $checkInterval\n    resultType: $resultType\n    pageCheckType: $pageCheckType\n    prompt: $prompt\n    multiplePages: $multiplePages\n    priceDiscrepancyThresholdAmount: $priceDiscrepancyThresholdAmount\n  ) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation uploadDocument($uploadSignedId: ID!, $name: String!) {\n  uploadDocument(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}"): (typeof documents)["fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    business {\n      id\n      name\n    }\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}"): (typeof documents)["fragment Users on Users {\n  id\n  email\n  firstName\n  lastName\n  business {\n    id\n    name\n  }\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;