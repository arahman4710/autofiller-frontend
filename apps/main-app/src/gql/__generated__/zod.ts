import { z } from 'zod'
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
  ISO8601DateTime: { input: any; output: any; }
};

export enum AuthProviderTypeEnum {
  Google = 'GOOGLE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<Users>;
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  jobTitle: Scalars['String']['output'];
  messages: Array<ChatsMessage>;
  score?: Maybe<Scalars['Int']['output']>;
  status: ChatsStatusEnum;
};

/** Autogenerated return type of Chat. */
export type ChatPayload = {
  __typename?: 'ChatPayload';
  chatId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  i?: Maybe<Scalars['Int']['output']>;
  initial: Scalars['Boolean']['output'];
  requestId: Scalars['String']['output'];
};

export type ChatsMessage = {
  __typename?: 'ChatsMessage';
  fromUser: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export enum ChatsStatusEnum {
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  Started = 'STARTED'
}

export type Document = {
  __typename?: 'Document';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authPasswordResetRequest: Scalars['String']['output'];
  authProviderAuthenticate: AuthResponse;
  authResetPassword: Scalars['String']['output'];
  authSignIn: AuthResponse;
  authSignUp: AuthResponse;
  chatAddMessage: Chat;
  chatStart: Chat;
  updateBusiness: Business;
  updateUser: Users;
  uploadDocument: Document;
  userEmailVerify: AuthResponse;
};


export type MutationAuthPasswordResetRequestArgs = {
  email: Scalars['String']['input'];
};


export type MutationAuthProviderAuthenticateArgs = {
  data: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  provider: AuthProviderTypeEnum;
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>;
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAuthResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  resetPasswordToken: Scalars['String']['input'];
};


export type MutationAuthSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAuthSignUpArgs = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  referredByUserUniqueId?: InputMaybe<Scalars['ID']['input']>;
  resumeUniqueId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationChatAddMessageArgs = {
  chatId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type MutationUpdateBusinessArgs = {
  name: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  attributes: UsersInputObject;
};


export type MutationUploadDocumentArgs = {
  name: Scalars['String']['input'];
  uploadSignedId: Scalars['ID']['input'];
};


export type MutationUserEmailVerifyArgs = {
  emailVerificationCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  documents: Array<Document>;
  emailVerifyAllowed?: Maybe<Users>;
  resetPasswordAllowed: Scalars['Boolean']['output'];
  user: Users;
};


export type QueryChatsArgs = {
  chatIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryDocumentsArgs = {
  documentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryEmailVerifyAllowedArgs = {
  emailVerificationCode: Scalars['String']['input'];
};


export type QueryResetPasswordAllowedArgs = {
  resetPasswordToken: Scalars['String']['input'];
};

/** The subscription root for the GraphQL schema */
export type Subscription = {
  __typename?: 'Subscription';
  chat: ChatPayload;
};

export enum SubscriptionPlanEnum {
  Free = 'FREE',
  Pro = 'PRO',
  ProQuarterly = 'PRO_QUARTERLY'
}

export type Users = {
  __typename?: 'Users';
  business: Business;
  completedAllChecklistItems: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  hasSubscription: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isAdvisoryClient: Scalars['Boolean']['output'];
  isAdvisoryOrgAccount: Scalars['Boolean']['output'];
  lastActiveAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  lastJobUpdatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  numClients: Scalars['Int']['output'];
  numJobs: Scalars['Int']['output'];
  numOwnClients: Scalars['Int']['output'];
  numStartedInterviews: Scalars['Int']['output'];
  numUploadedResumes: Scalars['Int']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  plan: SubscriptionPlanEnum;
  referralTokens: Scalars['Int']['output'];
  tokenAchievements: Scalars['Int']['output'];
  tokenCoverLetter: Scalars['Int']['output'];
  tokenInterview: Scalars['Int']['output'];
  tokenInterviewQuestions: Scalars['Int']['output'];
  tokenJobMatch: Scalars['Int']['output'];
  tokenLearnSkills: Scalars['Int']['output'];
  tokenProfessionalSummary: Scalars['Int']['output'];
  tokenSalaryInsights: Scalars['Int']['output'];
  uniqueId: Scalars['String']['output'];
  usedChromeExtension: Scalars['Boolean']['output'];
  usedJobAiFeature: Scalars['Boolean']['output'];
  usedResumeAiFeature: Scalars['Boolean']['output'];
  verified: Scalars['Boolean']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type UsersInputObject = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type AddBusinessNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddBusinessNameMutation = { __typename?: 'Mutation', updateBusiness: { __typename?: 'Business', id: string, name: string } };

export type Chat_GetChatQueryVariables = Exact<{
  chatId?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type Chat_GetChatQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, status: ChatsStatusEnum, messages: Array<{ __typename?: 'ChatsMessage', fromUser: boolean, message: string }> }> };

export type ChatSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatSubscriptionSubscription = { __typename?: 'Subscription', chat: { __typename?: 'ChatPayload', content: string, chatId: string, initial: boolean, requestId: string, i?: number | null } };

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

export type UsersUpdateFragment = { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, location?: string | null, website?: string | null, linkedinUrl?: string | null };

export type AccountSettingsDialog_UserQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountSettingsDialog_UserQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, location?: string | null, website?: string | null, linkedinUrl?: string | null } };

export type AccountSettingsDialog_UpdateUserMutationVariables = Exact<{
  attributes: UsersInputObject;
}>;


export type AccountSettingsDialog_UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Users', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, location?: string | null, website?: string | null, linkedinUrl?: string | null } };

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


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const AuthProviderTypeEnumSchema = z.nativeEnum(AuthProviderTypeEnum);

export const ChatsStatusEnumSchema = z.nativeEnum(ChatsStatusEnum);

export const SubscriptionPlanEnumSchema = z.nativeEnum(SubscriptionPlanEnum);

export function UsersInputObjectSchema(): z.ZodObject<Properties<UsersInputObject>> {
  return z.object({
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    linkedinUrl: z.string().nullish(),
    location: z.string().nullish(),
    phoneNumber: z.string().nullish(),
    website: z.string().nullish()
  })
}
