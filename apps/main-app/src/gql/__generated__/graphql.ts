/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export enum AuthProviderTypeEnum {
  Google = 'GOOGLE'
}

export enum ChatsStatusEnum {
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  Started = 'STARTED'
}

export enum PageCheckIntervalEnum {
  Daily = 'DAILY',
  Weekly = 'WEEKLY'
}

export enum PageCheckResultTypeEnum {
  Multiple = 'MULTIPLE',
  Single = 'SINGLE'
}

export enum PageCheckTypeEnum {
  Generic = 'GENERIC',
  JobTitles = 'JOB_TITLES',
  Price = 'PRICE'
}

export enum SubscriptionPlanEnum {
  Free = 'FREE',
  Pro = 'PRO',
  ProQuarterly = 'PRO_QUARTERLY'
}

export type UsersInputObject = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type AddBusinessNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddBusinessNameMutation = { __typename?: 'Mutation', updateBusiness: { __typename?: 'Business', id: string, name: string } };

export type Chat_GetChatQueryVariables = Exact<{
  chatId?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type Chat_GetChatQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, status: ChatsStatusEnum, messages: Array<{ __typename?: 'ChatsMessage', fromUser: boolean, message: string, chatMessageSources: Array<{ __typename?: 'ChatsMessageSource', score: number, document: { __typename?: 'Document', name: string, url?: string | null } }> }> }> };

export type ChatSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatSubscriptionSubscription = { __typename?: 'Subscription', chat: { __typename?: 'ChatPayload', content: string, chatId: string, initial: boolean, requestId: string, i?: number | null, final: boolean } };

export type Chat_AddMessageMutationVariables = Exact<{
  chatId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type Chat_AddMessageMutation = { __typename?: 'Mutation', chatAddMessage: { __typename?: 'Chat', id: string, status: ChatsStatusEnum, messages: Array<{ __typename?: 'ChatsMessage', fromUser: boolean, message: string }> } };

export type Chat_StartChatMutationVariables = Exact<{ [key: string]: never; }>;


export type Chat_StartChatMutation = { __typename?: 'Mutation', chatStart: { __typename?: 'Chat', id: string } };

export type ChatSidebar_ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatSidebar_ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string }> };

export type DocumentsList_AllDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsList_AllDocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', id: string, name: string, url?: string | null }> };

export type DocumentsList_ArchivedDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DocumentsList_ArchivedDocumentMutation = { __typename?: 'Mutation', archiveDocument: { __typename?: 'Document', id: string } };

export type PageCheck_GetPageCheckQueryVariables = Exact<{
  pageCheckIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type PageCheck_GetPageCheckQuery = { __typename?: 'Query', pageChecks: Array<{ __typename?: 'PageCheck', id: string, pageUrl: string, checkInterval: PageCheckIntervalEnum, resultType: PageCheckResultTypeEnum, prompt?: string | null, pageCheckResults: Array<{ __typename?: 'PageCheckResultType', id: string, createdAt: any, result: string, sameResultAsLastRun: boolean }> }> };

export type PageCheck_ManuallyRunPageCheckMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PageCheck_ManuallyRunPageCheckMutation = { __typename?: 'Mutation', manuallyRunPageCheck: { __typename?: 'PageCheck', id: string, pageUrl: string, checkInterval: PageCheckIntervalEnum, resultType: PageCheckResultTypeEnum, prompt?: string | null, pageCheckResults: Array<{ __typename?: 'PageCheckResultType', id: string, createdAt: any, result: string, sameResultAsLastRun: boolean }> } };

export type PageChecksList_AllPageChecksQueryVariables = Exact<{ [key: string]: never; }>;


export type PageChecksList_AllPageChecksQuery = { __typename?: 'Query', pageChecks: Array<{ __typename?: 'PageCheck', id: string, pageUrl: string, checkInterval: PageCheckIntervalEnum, resultType: PageCheckResultTypeEnum }> };

export type PageChecksList_ArchivedPageCheckMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PageChecksList_ArchivedPageCheckMutation = { __typename?: 'Mutation', archivePageCheck: { __typename?: 'PageCheck', id: string } };

export type ForgotPassword_AuthPasswordResetRequestMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPassword_AuthPasswordResetRequestMutation = { __typename?: 'Mutation', authPasswordResetRequest: string };

export type ResetPassword_ResetPasswordAllowedQueryVariables = Exact<{
  resetPasswordToken: Scalars['String']['input'];
}>;


export type ResetPassword_ResetPasswordAllowedQuery = { __typename?: 'Query', resetPasswordAllowed: boolean };

export type ResetPassword_ResetPasswordMutationVariables = Exact<{
  resetPasswordToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPassword_ResetPasswordMutation = { __typename?: 'Mutation', authResetPassword: string };

export type EmailVerify_EmailVerifyAllowedQueryVariables = Exact<{
  emailVerificationCode: Scalars['String']['input'];
}>;


export type EmailVerify_EmailVerifyAllowedQuery = { __typename?: 'Query', emailVerifyAllowed?: { __typename?: 'Users', firstName?: string | null, lastName?: string | null, email: string } | null };

export type UsersUpdateFragment = { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null };

export type AccountSettingsDialog_UserQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountSettingsDialog_UserQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null } };

export type AccountSettingsDialog_UpdateUserMutationVariables = Exact<{
  attributes: UsersInputObject;
}>;


export type AccountSettingsDialog_UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null } };

export type NewPageCheckDialog_CreatePageCheckMutationVariables = Exact<{
  url: Scalars['String']['input'];
  checkInterval: PageCheckIntervalEnum;
  resultType: PageCheckResultTypeEnum;
  pageCheckType: PageCheckTypeEnum;
  prompt?: InputMaybe<Scalars['String']['input']>;
  multiplePages: Scalars['Boolean']['input'];
  priceDiscrepancyThresholdAmount?: InputMaybe<Scalars['Float']['input']>;
}>;


export type NewPageCheckDialog_CreatePageCheckMutation = { __typename?: 'Mutation', createPageCheck: { __typename?: 'PageCheck', id: string } };

export type UploadDocumentMutationVariables = Exact<{
  uploadSignedId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UploadDocumentMutation = { __typename?: 'Mutation', uploadDocument: { __typename?: 'Document', id: string, name: string } };

export type AuthResponseFragment = { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'Users', id: string, business: { __typename?: 'Business', id: string, name: string } } | null };

export type ProviderAuthenticationMutationVariables = Exact<{
  data: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  provider: AuthProviderTypeEnum;
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>;
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ProviderAuthenticationMutation = { __typename?: 'Mutation', authProviderAuthenticate: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'Users', id: string, business: { __typename?: 'Business', id: string, name: string } } | null } };

export type CredentialsAuthenticationSignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CredentialsAuthenticationSignInMutation = { __typename?: 'Mutation', authSignIn: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'Users', id: string, business: { __typename?: 'Business', id: string, name: string } } | null } };

export type CredentialsAuthenticationSignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>;
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CredentialsAuthenticationSignUpMutation = { __typename?: 'Mutation', authSignUp: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'Users', id: string, business: { __typename?: 'Business', id: string, name: string } } | null } };

export type CredentialsAuthenticationEmailVerifyMutationVariables = Exact<{
  emailVerificationCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CredentialsAuthenticationEmailVerifyMutation = { __typename?: 'Mutation', userEmailVerify: { __typename?: 'AuthResponse', token?: string | null, user?: { __typename?: 'Users', id: string, business: { __typename?: 'Business', id: string, name: string } } | null } };

export type UsersFragment = { __typename?: 'Users', id: string, email: string, firstName?: string | null, lastName?: string | null, business: { __typename?: 'Business', id: string, name: string } };

export type UseCurrentUser_UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UseCurrentUser_UsersQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, email: string, firstName?: string | null, lastName?: string | null, business: { __typename?: 'Business', id: string, name: string } } };

export const UsersUpdateFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UsersUpdate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<UsersUpdateFragment, unknown>;
export const AuthResponseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AuthResponseFragment, unknown>;
export const UsersFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Users"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersFragment, unknown>;
export const AddBusinessNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBusinessName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddBusinessNameMutation, AddBusinessNameMutationVariables>;
export const Chat_GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Chat_getChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromUser"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"chatMessageSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Chat_GetChatQuery, Chat_GetChatQueryVariables>;
export const ChatSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChatSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"i"}},{"kind":"Field","name":{"kind":"Name","value":"final"}}]}}]}}]} as unknown as DocumentNode<ChatSubscriptionSubscription, ChatSubscriptionSubscriptionVariables>;
export const Chat_AddMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Chat_addMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatAddMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromUser"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<Chat_AddMessageMutation, Chat_AddMessageMutationVariables>;
export const Chat_StartChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Chat_StartChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatStart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Chat_StartChatMutation, Chat_StartChatMutationVariables>;
export const ChatSidebar_ChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatSidebar_chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChatSidebar_ChatsQuery, ChatSidebar_ChatsQueryVariables>;
export const DocumentsList_AllDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DocumentsList_allDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<DocumentsList_AllDocumentsQuery, DocumentsList_AllDocumentsQueryVariables>;
export const DocumentsList_ArchivedDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DocumentsList_archivedDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DocumentsList_ArchivedDocumentMutation, DocumentsList_ArchivedDocumentMutationVariables>;
export const PageCheck_GetPageCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageCheck_getPageCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageCheckIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageChecks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageCheckIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageCheckIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"checkInterval"}},{"kind":"Field","name":{"kind":"Name","value":"resultType"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"pageCheckResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"sameResultAsLastRun"}}]}}]}}]}}]} as unknown as DocumentNode<PageCheck_GetPageCheckQuery, PageCheck_GetPageCheckQueryVariables>;
export const PageCheck_ManuallyRunPageCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PageCheck_manuallyRunPageCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manuallyRunPageCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageCheckId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"checkInterval"}},{"kind":"Field","name":{"kind":"Name","value":"resultType"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"pageCheckResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"sameResultAsLastRun"}}]}}]}}]}}]} as unknown as DocumentNode<PageCheck_ManuallyRunPageCheckMutation, PageCheck_ManuallyRunPageCheckMutationVariables>;
export const PageChecksList_AllPageChecksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageChecksList_allPageChecks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageChecks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"checkInterval"}},{"kind":"Field","name":{"kind":"Name","value":"resultType"}}]}}]}}]} as unknown as DocumentNode<PageChecksList_AllPageChecksQuery, PageChecksList_AllPageChecksQueryVariables>;
export const PageChecksList_ArchivedPageCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PageChecksList_archivedPageCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archivePageCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageCheckId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PageChecksList_ArchivedPageCheckMutation, PageChecksList_ArchivedPageCheckMutationVariables>;
export const ForgotPassword_AuthPasswordResetRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword_authPasswordResetRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authPasswordResetRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPassword_AuthPasswordResetRequestMutation, ForgotPassword_AuthPasswordResetRequestMutationVariables>;
export const ResetPassword_ResetPasswordAllowedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResetPassword_resetPasswordAllowed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPasswordAllowed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordToken"}}}]}]}}]} as unknown as DocumentNode<ResetPassword_ResetPasswordAllowedQuery, ResetPassword_ResetPasswordAllowedQueryVariables>;
export const ResetPassword_ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword_resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authResetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ResetPassword_ResetPasswordMutation, ResetPassword_ResetPasswordMutationVariables>;
export const EmailVerify_EmailVerifyAllowedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailVerify_emailVerifyAllowed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailVerificationCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailVerifyAllowed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailVerificationCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailVerificationCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<EmailVerify_EmailVerifyAllowedQuery, EmailVerify_EmailVerifyAllowedQueryVariables>;
export const AccountSettingsDialog_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSettingsDialog_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UsersUpdate"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UsersUpdate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<AccountSettingsDialog_UserQuery, AccountSettingsDialog_UserQueryVariables>;
export const AccountSettingsDialog_UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountSettingsDialog_updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attributes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersInputObject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attributes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attributes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UsersUpdate"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UsersUpdate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<AccountSettingsDialog_UpdateUserMutation, AccountSettingsDialog_UpdateUserMutationVariables>;
export const NewPageCheckDialog_CreatePageCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewPageCheckDialog_createPageCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkInterval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageCheckIntervalEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageCheckResultTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageCheckType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageCheckTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"multiplePages"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"priceDiscrepancyThresholdAmount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPageCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"Argument","name":{"kind":"Name","value":"checkInterval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkInterval"}}},{"kind":"Argument","name":{"kind":"Name","value":"resultType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultType"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageCheckType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageCheckType"}}},{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}},{"kind":"Argument","name":{"kind":"Name","value":"multiplePages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"multiplePages"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceDiscrepancyThresholdAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"priceDiscrepancyThresholdAmount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<NewPageCheckDialog_CreatePageCheckMutation, NewPageCheckDialog_CreatePageCheckMutationVariables>;
export const UploadDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadSignedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadSignedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadSignedId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UploadDocumentMutation, UploadDocumentMutationVariables>;
export const ProviderAuthenticationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProviderAuthentication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthProviderTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resumeUniqueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referredByUserUniqueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authProviderAuthenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider"}}},{"kind":"Argument","name":{"kind":"Name","value":"resumeUniqueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resumeUniqueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"referredByUserUniqueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referredByUserUniqueId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ProviderAuthenticationMutation, ProviderAuthenticationMutationVariables>;
export const CredentialsAuthenticationSignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsAuthenticationSignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authSignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsAuthenticationSignInMutation, CredentialsAuthenticationSignInMutationVariables>;
export const CredentialsAuthenticationSignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsAuthenticationSignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referredByUserUniqueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resumeUniqueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authSignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"referredByUserUniqueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referredByUserUniqueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resumeUniqueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resumeUniqueId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsAuthenticationSignUpMutation, CredentialsAuthenticationSignUpMutationVariables>;
export const CredentialsAuthenticationEmailVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsAuthenticationEmailVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailVerificationCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userEmailVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailVerificationCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailVerificationCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsAuthenticationEmailVerifyMutation, CredentialsAuthenticationEmailVerifyMutationVariables>;
export const UseCurrentUser_UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"useCurrentUser_users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Users"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Users"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UseCurrentUser_UsersQuery, UseCurrentUser_UsersQueryVariables>;