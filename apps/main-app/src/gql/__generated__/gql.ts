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
 */
const documents = {
  'query AdvisorsList_advisors($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $role: UsersRoleEnum, $sortBy: AdvisorSortEnum, $sortByDirection: SortByDirectionEnum) {\n  advisors(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    role: $role\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      jobsShared {\n        id\n        ...UsersJobs\n      }\n      jobsAdded {\n        id\n        ...UsersJobs\n      }\n      user {\n        id\n        numOwnClients\n        ...Users\n      }\n    }\n  }\n}':
    types.AdvisorsList_AdvisorsDocument,
  'query ClientGroupClientContent_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}':
    types.ClientGroupClientContent_ClientGroupsDocument,
  'query ClientGroupClientList_clientGroups($clientGroupIds: [ID!]!) {\n  clientGroups(clientGroupIds: $clientGroupIds) {\n    id\n    name\n    clients {\n      id\n      numAllJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      numAppliedJobs\n      user {\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}':
    types.ClientGroupClientList_ClientGroupsDocument,
  'query ClientBoard_clientUsersJobs($archived: Boolean, $clientId: ID!) {\n  clientUsersJobs(archived: $archived, clientId: $clientId) {\n    id\n    ...UsersJobs\n  }\n}':
    types.ClientBoard_ClientUsersJobsDocument,
  'query ClientContent_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    email\n    firstName\n    lastName\n    lastActiveAt\n    usersJobs {\n      id\n      archived\n    }\n    activeResumes {\n      id\n    }\n  }\n}':
    types.ClientContent_ClientDocument,
  'query ClientResumes_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    activeResumes {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}':
    types.ClientResumes_ClientDocument,
  'query ClientsList_clients($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $advisorIds: [ID!]) {\n  clients(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    advisorIds: $advisorIds\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      numAllJobs\n      numAppliedJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      user {\n        id\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}':
    types.ClientsList_ClientsDocument,
  'query JobPostingsList_jobPostings($page: Int, $perPage: Int, $searchTerm: String, $archived: Boolean, $sortBy: JobPostingSortEnum, $sortByDirection: SortByDirectionEnum) {\n  paginatedUsersJobs(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    archived: $archived\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      archived\n      clientsShared {\n        id\n        firstName\n        lastName\n      }\n      companyName\n      createdAt\n      numClientsApplied\n      numClientsShared\n      position\n      location\n      isRemote\n      url\n      payPeriod\n      salaryMin\n      salaryMax\n    }\n  }\n}\n\nmutation JobPostingsList_updateUsersJobArchived($id: ID!, $archived: Boolean) {\n  updateUsersJob(id: $id, archived: $archived) {\n    id\n    archived\n  }\n}':
    types.JobPostingsList_JobPostingsDocument,
  'fragment UserJobsActivity on UsersJobs {\n  id\n  interviewStep\n  interviewedAt\n  createdAt\n  appliedAt\n  offerAt\n  rejectedAt\n  rejectedStage\n  offerAt\n}':
    types.UserJobsActivityFragmentDoc,
  'mutation LearnSkills_learnSkills($usersJobId: ID!) {\n  learnSkills(usersJobId: $usersJobId) {\n    result\n    isSync\n  }\n}\n\nsubscription LearnSkillsSubscription {\n  learnSkills {\n    content\n    usersJobId\n    initial\n    requestId\n    i\n  }\n}':
    types.LearnSkills_LearnSkillsDocument,
  'query MatchScore_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n    groupedSkills {\n      skills\n    }\n  }\n}\n\nmutation MatchScore_matchScore($usersJobId: ID!, $resumeId: ID!) {\n  matchScore(usersJobId: $usersJobId, resumeId: $resumeId) {\n    matchLevel\n    hardSkills\n    matches {\n      field\n      errorMessage\n    }\n  }\n}':
    types.MatchScore_ResumesDocument,
  'mutation SalaryInsights_salaryInsights($usersJobId: ID!) {\n  salaryInsights(usersJobId: $usersJobId)\n}':
    types.SalaryInsights_SalaryInsightsDocument,
  'query ApplicationContent_usersJobs($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n  user {\n    id\n    tokenSalaryInsights\n    tokenJobMatch\n    tokenLearnSkills\n    tokenAchievements\n    plan\n  }\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation ApplicationContent_updateUsersJob($applicationInstructions: String, $companyName: String, $id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $url: String, $resumeId: ID) {\n  updateUsersJob(\n    applicationInstructions: $applicationInstructions\n    companyName: $companyName\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    url: $url\n    resumeId: $resumeId\n  ) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n}':
    types.ApplicationContent_UsersJobsDocument,
  'query Applications_usersJobs($archived: Boolean!) {\n  usersJobs(archived: $archived) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJobStatus($id: ID!, $status: UsersJobsStatusEnum!) {\n  updateUsersJob(id: $id, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJob($id: ID!, $archived: Boolean, $status: UsersJobsStatusEnum) {\n  updateUsersJob(id: $id, archived: $archived, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}':
    types.Applications_UsersJobsDocument,
  'fragment CoverLetter on UsersJobsCoverLetterType {\n  id\n  firstName\n  lastName\n  email\n  candidateAddress\n  companyName\n  companyLocation\n  phoneNumber\n  body\n  footer\n  archived\n  mostRecentUsedResumeForGenerate {\n    id\n  }\n}\n\nquery CoverLetterContent_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    ...CoverLetter\n    usersJob {\n      id\n      ...UsersJobs\n    }\n  }\n}\n\nquery CoverLettercontent_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation CoverLetterContent_generateCoverLetter($coverLetterLength: CoverLetterLengthEnum, $coverLetterTone: CoverLetterToneEnum, $resumeId: ID!, $usersJobId: ID!) {\n  generateCoverLetter(\n    coverLetterLength: $coverLetterLength\n    coverLetterTone: $coverLetterTone\n    resumeId: $resumeId\n    usersJobId: $usersJobId\n  ) {\n    id\n    body\n  }\n}\n\nmutation CoverLetterContent_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}':
    types.CoverLetterFragmentDoc,
  'query CoverLettersList_coverLetters($archived: Boolean) {\n  coverLetters(archived: $archived) {\n    id\n    body\n    createdAt\n    usersJob {\n      id\n      companyName\n      position\n    }\n  }\n}':
    types.CoverLettersList_CoverLettersDocument,
  'query DashboardContent_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}':
    types.DashboardContent_ItemsDataDocument,
  'query Interview_getInterview($interviewId: [ID!]) {\n  interviews(interviewIds: $interviewId) {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n    messages {\n      fromUser\n      message\n    }\n  }\n}':
    types.Interview_GetInterviewDocument,
  'query InterviewsSidebar_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}':
    types.InterviewsSidebar_InterviewsDocument,
  'fragment Interviews_interview on Interview {\n  id\n  status\n  interviewType\n  score\n  jobTitle\n  messages {\n    fromUser\n    message\n  }\n}\n\nquery Interviews_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}\n\nmutation Interviews_interviewAddMessage($interviewId: String!, $message: String!) {\n  interviewAddMessage(interviewId: $interviewId, message: $message) {\n    ...Interviews_interview\n  }\n}':
    types.Interviews_InterviewFragmentDoc,
  'mutation ListEmpty_createResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}':
    types.ListEmpty_CreateResumeDocument,
  'fragment ResumesList_resumes on Resumes {\n  id\n  name\n  archived\n  createdAt\n  updatedAt\n  aiGenerated\n}\n\nquery ResumesList_allResumes {\n  resumes {\n    id\n    name\n  }\n}\n\nquery ResumesList_resumes($archived: Boolean, $aiGenerated: Boolean) {\n  resumes(archived: $archived, aiGenerated: $aiGenerated) {\n    id\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_updateArchivedResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(id: $id, archived: $archived) {\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_duplicateResume($id: ID!) {\n  duplicateResume(id: $id) {\n    ...ResumesList_resumes\n  }\n}':
    types.ResumesList_ResumesFragmentDoc,
  'mutation ForgotPassword_authPasswordResetRequest($email: String!) {\n  authPasswordResetRequest(email: $email)\n}':
    types.ForgotPassword_AuthPasswordResetRequestDocument,
  'query ResetPassword_resetPasswordAllowed($resetPasswordToken: String!) {\n  resetPasswordAllowed(resetPasswordToken: $resetPasswordToken)\n}\n\nmutation ResetPassword_resetPassword($resetPasswordToken: String!, $newPassword: String!) {\n  authResetPassword(\n    resetPasswordToken: $resetPasswordToken\n    newPassword: $newPassword\n  )\n}':
    types.ResetPassword_ResetPasswordAllowedDocument,
  'query EmailVerify_emailVerifyAllowed($emailVerificationCode: String!) {\n  emailVerifyAllowed(emailVerificationCode: $emailVerificationCode) {\n    firstName\n    lastName\n    email\n  }\n}':
    types.EmailVerify_EmailVerifyAllowedDocument,
  'fragment ApplicationSelect_usersJobs on UsersJobs {\n  id\n  companyName\n  position\n  jobDetails\n}\n\nquery ApplicationSelect_usersJobs($archived: Boolean) {\n  usersJobs(archived: $archived) {\n    id\n    ...ApplicationSelect_usersJobs\n  }\n}':
    types.ApplicationSelect_UsersJobsFragmentDoc,
  'mutation Feedback_feedbackCreate($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}':
    types.Feedback_FeedbackCreateDocument,
  'query Navigation_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}\n\nquery Navigation_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}':
    types.Navigation_ItemsDataDocument,
  'query ResumesSelect_resumes($archived: Boolean, $optimized: Boolean) {\n  resumes(archived: $archived, aiGenerated: $optimized) {\n    id\n    name\n  }\n}':
    types.ResumesSelect_ResumesDocument,
  'mutation UpdateLastPageLoaded_updateLastPageLoadedAt {\n  updateLastPageLoadedAt {\n    id\n  }\n}':
    types.UpdateLastPageLoaded_UpdateLastPageLoadedAtDocument,
  'fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n  phoneNumber\n  location\n  website\n  linkedinUrl\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}':
    types.UsersUpdateFragmentDoc,
  'fragment CreateClientGroupDialog_clientGroup on ClientGroup {\n  id\n  clients {\n    id\n  }\n}\n\nmutation CreateClientGroupDialog_createClientGroup($name: String!) {\n  createClientGroup(name: $name) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nmutation CreateClientGroupDialog_addUsersToClientGroup($clientGroupId: ID!, $userIds: [ID!]!) {\n  addUsersToClientGroup(clientGroupId: $clientGroupId, userIds: $userIds) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nquery CreateClientGroupDialog_clients {\n  clients {\n    data {\n      id\n      user {\n        firstName\n        lastName\n      }\n    }\n  }\n}':
    types.CreateClientGroupDialog_ClientGroupFragmentDoc,
  'query EditClientGroupDialog_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n    clients {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery EditClientGroupDialog_clients {\n  clients {\n    pagination {\n      page\n      pageSize\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation EditClientGroupDialog_editClientGroup($clientGroupId: ID!, $userIds: [ID!], $name: String) {\n  editClientGroup(clientGroupId: $clientGroupId, userIds: $userIds, name: $name) {\n    id\n  }\n}':
    types.EditClientGroupDialog_ClientGroupsDocument,
  'mutation EnhanceAchievementDialog_generateOneJobAchievement($workPositionId: ID!, $index: Int!, $keywords: [String!]) {\n  generateOneJobAchievement(\n    workPositionId: $workPositionId\n    index: $index\n    keywords: $keywords\n  )\n}':
    types.EnhanceAchievementDialog_GenerateOneJobAchievementDocument,
  'mutation EnhanceSummaryDialog_generateProfessionalSummary($resumeId: ID!, $useExisting: Boolean!, $keywords: [String!]) {\n  generateProfessionalSummary(\n    id: $resumeId\n    useExisting: $useExisting\n    keywords: $keywords\n  )\n}':
    types.EnhanceSummaryDialog_GenerateProfessionalSummaryDocument,
  'mutation FeedbackDialog_createFeedback($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}':
    types.FeedbackDialog_CreateFeedbackDocument,
  'query ImportResumeFromLinkedinDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}\n\nmutation ImportResumeFromLinkedinDialog_createResumeFromLinkedinUrl($linkedinProfileUrl: String!) {\n  createResumeFromLinkedinUrl(linkedinProfileUrl: $linkedinProfileUrl) {\n    id\n  }\n}':
    types.ImportResumeFromLinkedinDialog_ResumesDocument,
  'query NewApplicationDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewApplicationDialog_createUsersJob($applicationInstructions: String, $contact: ContactsInputObject, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID) {\n  createUsersJob(\n    applicationInstructions: $applicationInstructions\n    contact: $contact\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    companyName: $companyName\n    url: $url\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    resumeId: $resumeId\n  ) {\n    id\n    status\n  }\n}\n\nquery NewApplicationsDialog_usersJobs($id: ID!) {\n  usersJobs(usersJobIds: [$id]) {\n    id\n    status\n    isRemote\n    jobDetails\n    location\n    notes\n    position\n    salaryMax\n    salaryMin\n    companyName\n    url\n    rejectedStage\n    interviewStep\n    payPeriod\n    applicationInstructions\n  }\n}\n\nmutation NewApplicationsDialog_updateUsersJob($id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID, $payPeriod: UsersJobsPayPeriodEnum, $applicationInstructions: String) {\n  updateUsersJob(\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    companyName: $companyName\n    url: $url\n    resumeId: $resumeId\n    payPeriod: $payPeriod\n    applicationInstructions: $applicationInstructions\n  ) {\n    id\n    status\n  }\n}':
    types.NewApplicationDialog_ResumesDocument,
  'query NewCoverLetterDialog_usersJobs($usersJobIds: [ID!], $archived: Boolean!) {\n  usersJobs(usersJobIds: $usersJobIds, archived: $archived) {\n    id\n    position\n    companyName\n    coverLetter {\n      id\n    }\n  }\n}\n\nquery NewCoverLetterDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewCoverLetterDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation NewCoverLetterDialog_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}':
    types.NewCoverLetterDialog_UsersJobsDocument,
  'query NewInterviewDialog_resume($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}\n\nmutation NewInterviewDialog_interviewStartMock($jobTitle: String!, $jobDescription: String, $interviewType: InterviewsTypeEnum!, $resumeId: ID) {\n  interviewStartMock(\n    jobTitle: $jobTitle\n    jobDescription: $jobDescription\n    interviewType: $interviewType\n    resumeId: $resumeId\n  ) {\n    id\n  }\n}':
    types.NewInterviewDialog_ResumeDocument,
  'query NewResumeDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}':
    types.NewResumeDialog_ResumesDocument,
  'mutation RedeemCodeDialog_subscriptionsRedeemLtdPromoCode($promoCode: String!) {\n  subscriptionsRedeemLtdPromoCode(promoCode: $promoCode) {\n    id\n    plan\n  }\n}':
    types.RedeemCodeDialog_SubscriptionsRedeemLtdPromoCodeDocument,
  'query ShareJobPostingDialog_usersJobs($ids: [ID!]!) {\n  usersJobs(usersJobIds: $ids) {\n    id\n    position\n    companyName\n    clientsShared {\n      id\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clients($searchTerm: String) {\n  clients(page: 1, perPage: 50, searchTerm: $searchTerm) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}\n\nmutation ShareJobPostingDialog_shareJobWithClients($usersJobId: ID!, $userIds: [ID!]!, $clientGroupIds: [ID!]!) {\n  shareJobWithClients(\n    usersJobId: $usersJobId\n    userIds: $userIds\n    clientGroupIds: $clientGroupIds\n  ) {\n    id\n  }\n}':
    types.ShareJobPostingDialog_UsersJobsDocument,
  'mutation TailorResumeDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation TailorResumeDialog_optimizeResumeForJob($keywords: [String!], $resumeId: ID!, $skills: [String!], $usersJobId: ID!) {\n  optimizeResumeForJob(\n    keywords: $keywords\n    resumeId: $resumeId\n    skills: $skills\n    usersJobId: $usersJobId\n  ) {\n    id\n    ...Resumes\n  }\n}\n\nmutation TailorResumeDialog_fetchJobKeywords($usersJobId: ID!) {\n  fetchJobKeywords(usersJobId: $usersJobId)\n}\n\nmutation TailorResumeDialog_fetchMissingSkillsOfJobResume($usersJobId: ID!, $resumeId: ID!) {\n  fetchMissingSkillsOfJobResume(usersJobId: $usersJobId, resumeId: $resumeId)\n}':
    types.TailorResumeDialog_CreateUsersJobDocument,
  'mutation ResumeTemplateDrawer_updateTemplate($resumeId: ID!, $template: ResumesTemplateEnum!, $templateColorEnum: ResumesTemplateColorEnum) {\n  updateTemplateResume(\n    id: $resumeId\n    template: $template\n    templateColorEnum: $templateColorEnum\n  ) {\n    id\n    template\n    templateColorEnum\n  }\n}':
    types.ResumeTemplateDrawer_UpdateTemplateDocument,
  'query AdvisorSheet_clients($advisorIds: [ID!], $page: Int!, $perPage: Int!) {\n  clients(advisorIds: $advisorIds, page: $page, perPage: $perPage) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation AdvisorSheet_assignClientToAdvisor($advisorId: ID!, $clientIds: [ID!]!) {\n  assignClientToAdvisor(advisorId: $advisorId, clientIds: $clientIds)\n}':
    types.AdvisorSheet_ClientsDocument,
  'query ApplicationToolbar_usersJobsArchived($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    archived\n  }\n}\n\nmutation ApplicationToolbar_updateUsersJobArchive($id: ID!, $archive: Boolean) {\n  updateUsersJob(id: $id, archived: $archive) {\n    id\n    archived\n  }\n}':
    types.ApplicationToolbar_UsersJobsArchivedDocument,
  'query BoardToolbar_UsersJobs {\n  usersJobs {\n    id\n  }\n}':
    types.BoardToolbar_UsersJobsDocument,
  'query ClientBoardToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}':
    types.ClientBoardToolbar_ClientDocument,
  'query ClientGroupToolbar_ClientGroup($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}':
    types.ClientGroupToolbar_ClientGroupDocument,
  'query ClientResumeToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}':
    types.ClientResumeToolbar_ClientDocument,
  'query ClientToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}':
    types.ClientToolbar_ClientDocument,
  'query ClientsToolbar_advisors {\n  advisors(page: 1, perPage: 999999) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}':
    types.ClientsToolbar_AdvisorsDocument,
  'query CoverLetterToolbar_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    archived\n  }\n}\n\nmutation CoverLetterToolbar_updateArchivedCoverLetter($coverLetterId: ID!, $archived: Boolean!) {\n  updateArchivedCoverLetter(coverLetterId: $coverLetterId, archived: $archived) {\n    id\n    archived\n  }\n}':
    types.CoverLetterToolbar_CoverLettersDocument,
  'query CoverLettersToolbar_coverLetters {\n  coverLetters {\n    id\n  }\n}':
    types.CoverLettersToolbar_CoverLettersDocument,
  'query InterviewsToolbar_interviews {\n  interviews {\n    id\n  }\n}':
    types.InterviewsToolbar_InterviewsDocument,
  'mutation JobPostingsToolbar_exportCsv {\n  exportUsersJobToCsv\n}':
    types.JobPostingsToolbar_ExportCsvDocument,
  'mutation ResumeBuilderToolbar_archiveResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(archived: $archived, id: $id) {\n    id\n    archived\n  }\n}\n\nquery ResumeBuilderToolbar_getResume($id: ID!) {\n  resumes(resumeIds: [$id]) {\n    id\n    archived\n  }\n}':
    types.ResumeBuilderToolbar_ArchiveResumeDocument,
  'query ResumesToolbar_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}':
    types.ResumesToolbar_ResumesDocument,
  'mutation CreateResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}':
    types.CreateResumeDocument,
  'fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    role\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}':
    types.AuthResponseFragmentDoc,
  'query Resumes {\n  resumes {\n    id\n  }\n}': types.ResumesDocument,
  'query Root {\n  user {\n    id\n    completedAllChecklistItems\n    role\n  }\n  resumes {\n    id\n  }\n}':
    types.RootDocument,
  'mutation uploadResume($uploadSignedId: ID!, $name: String!) {\n  uploadResume(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}':
    types.UploadResumeDocument,
  'fragment UsersJobs on UsersJobs {\n  id\n  applicationInstructions\n  createdAt\n  companyName\n  isRemote\n  jobDetails\n  location\n  notes\n  payPeriod\n  position\n  salaryMax\n  salaryMin\n  status\n  updatedAt\n  url\n  archived\n  rejectedStage\n  interviewStep\n  numClientsApplied\n  numClientsShared\n  partnerArchived\n  partnerCreatedByUser {\n    id\n    firstName\n    lastName\n  }\n  contacts {\n    id\n    email\n    name\n  }\n  resume {\n    id\n    name\n  }\n}':
    types.UsersJobsFragmentDoc,
  'mutation useBillingPlan_subscriptionSessionCreate($plan: SubscriptionPlanEnum!) {\n  subscriptionsSessionCreate(plan: $plan)\n}\n\nmutation useBillingPlan_billingPortalUrl {\n  billingPortalUrl\n}':
    types.UseBillingPlan_SubscriptionSessionCreateDocument,
  'query useBrowserExtensionToast_user {\n  user {\n    id\n    usedChromeExtension\n  }\n}':
    types.UseBrowserExtensionToast_UserDocument,
  'query useCreateResume_resumes {\n  resumes {\n    id\n    name\n  }\n}':
    types.UseCreateResume_ResumesDocument,
  'fragment Users on Users {\n  id\n  uniqueId\n  role\n  email\n  firstName\n  lastName\n  plan\n  tokenCoverLetter\n  tokenInterviewQuestions\n  tokenJobMatch\n  tokenProfessionalSummary\n  tokenSalaryInsights\n  tokenLearnSkills\n  tokenAchievements\n  tokenInterview\n  usedChromeExtension\n  numUploadedResumes\n  numStartedInterviews\n  referralTokens\n  hasSubscription\n  isAdvisoryClient\n  isAdvisoryOrgAccount\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}':
    types.UsersFragmentDoc,
  'query useUploadResume_resumes {\n  resumes {\n    id\n    name\n  }\n}':
    types.UseUploadResume_ResumesDocument,
  'fragment Resumes on Resumes {\n  id\n  uniqueId\n  createdAt\n  updatedAt\n  name\n  archived\n  firstName\n  lastName\n  email\n  linkedinUrl\n  phoneNumber\n  professionalSummary\n  website\n  linkedinUrl\n  location\n  suggestedSkills\n  documentUrl\n  documentType\n  showOriginalDocument\n  hideEducations\n  hideProjects\n  hideSkills\n  hideSummary\n  hideCertifications\n  hideWorkExperiences\n  hideCourseworks\n  hideInvolvements\n  sectionsOrder\n  template\n  templateColorEnum\n  aiGenerated\n  courseworks {\n    id\n    name\n    institutionName\n    endDate\n    achievements\n    currentlyWorkingOnCourse\n  }\n  educations {\n    id\n    additionalInformation\n    degree\n    endDate\n    startDate\n    gpa\n    institutionName\n    location\n    currentlyInEducation\n  }\n  involvements {\n    id\n    name\n    organizationName\n    startDate\n    endDate\n    achievements\n    currentlyWorkingOnInvolvement\n  }\n  projects {\n    id\n    achievements\n    name\n    endDate\n    startDate\n    currentlyWorkingOnProject\n  }\n  workExperiences {\n    id\n    companyDescription\n    companyName\n    simpleAnalysis {\n      field\n      errorMessage\n    }\n    workPositions {\n      id\n      achievements\n      location\n      name\n      startDate\n      endDate\n      currentlyInPosition\n      simpleAnalysis {\n        field\n        errorMessage\n      }\n    }\n  }\n  groupedSkills {\n    id\n    category\n    skills\n  }\n  simpleAnalysis {\n    field\n    errorMessage\n  }\n  certifications {\n    id\n    name\n    completionDate\n    provider\n  }\n}\n\nquery ResumeBuilder_getResume($resumeId: [ID!]) {\n  resumes(resumeIds: $resumeId) {\n    id\n    documentUrl\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getResumeUnauthenticated($id: ID!) {\n  resumeUnauthenticated(id: $id) {\n    id\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getClientResume($clientId: ID!, $resumeId: [ID!]) {\n  clientResumes(clientId: $clientId, resumeIds: $resumeId) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_createResumeUnauthenticated($attributes: ResumesInputObject) {\n  createResumeUnauthenticated(attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResumeUnauthenticated($resumeUniqueId: ID!, $attributes: ResumesInputObject!) {\n  updateResumeUnauthenticated(id: $resumeUniqueId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResume($resumeId: ID!, $attributes: ResumesInputObject!) {\n  updateResume(id: $resumeId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_scoreResume($id: ID!) {\n  scoreResume(id: $id) {\n    failed\n    passed\n    score\n    scoreFields {\n      didPass\n      errorMessage\n      header\n      tags {\n        tagName\n      }\n    }\n    total\n  }\n}':
    types.ResumesFragmentDoc,
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
  source: 'query AdvisorsList_advisors($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $role: UsersRoleEnum, $sortBy: AdvisorSortEnum, $sortByDirection: SortByDirectionEnum) {\n  advisors(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    role: $role\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      jobsShared {\n        id\n        ...UsersJobs\n      }\n      jobsAdded {\n        id\n        ...UsersJobs\n      }\n      user {\n        id\n        numOwnClients\n        ...Users\n      }\n    }\n  }\n}'
): (typeof documents)['query AdvisorsList_advisors($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $role: UsersRoleEnum, $sortBy: AdvisorSortEnum, $sortByDirection: SortByDirectionEnum) {\n  advisors(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    role: $role\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      jobsShared {\n        id\n        ...UsersJobs\n      }\n      jobsAdded {\n        id\n        ...UsersJobs\n      }\n      user {\n        id\n        numOwnClients\n        ...Users\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientGroupClientContent_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}'
): (typeof documents)['query ClientGroupClientContent_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientGroupClientList_clientGroups($clientGroupIds: [ID!]!) {\n  clientGroups(clientGroupIds: $clientGroupIds) {\n    id\n    name\n    clients {\n      id\n      numAllJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      numAppliedJobs\n      user {\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query ClientGroupClientList_clientGroups($clientGroupIds: [ID!]!) {\n  clientGroups(clientGroupIds: $clientGroupIds) {\n    id\n    name\n    clients {\n      id\n      numAllJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      numAppliedJobs\n      user {\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientBoard_clientUsersJobs($archived: Boolean, $clientId: ID!) {\n  clientUsersJobs(archived: $archived, clientId: $clientId) {\n    id\n    ...UsersJobs\n  }\n}'
): (typeof documents)['query ClientBoard_clientUsersJobs($archived: Boolean, $clientId: ID!) {\n  clientUsersJobs(archived: $archived, clientId: $clientId) {\n    id\n    ...UsersJobs\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientContent_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    email\n    firstName\n    lastName\n    lastActiveAt\n    usersJobs {\n      id\n      archived\n    }\n    activeResumes {\n      id\n    }\n  }\n}'
): (typeof documents)['query ClientContent_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    email\n    firstName\n    lastName\n    lastActiveAt\n    usersJobs {\n      id\n      archived\n    }\n    activeResumes {\n      id\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientResumes_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    activeResumes {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}'
): (typeof documents)['query ClientResumes_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    activeResumes {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientsList_clients($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $advisorIds: [ID!]) {\n  clients(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    advisorIds: $advisorIds\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      numAllJobs\n      numAppliedJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      user {\n        id\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query ClientsList_clients($page: Int, $perPage: Int, $searchTerm: String, $fromDate: ISO8601DateTime, $toDate: ISO8601DateTime, $advisorIds: [ID!]) {\n  clients(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    fromDate: $fromDate\n    toDate: $toDate\n    advisorIds: $advisorIds\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      numAllJobs\n      numAppliedJobs\n      numInterviewedJobs\n      numOfferedJobs\n      numRejectedJobs\n      user {\n        id\n        firstName\n        lastName\n        lastActiveAt\n        advisor {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query JobPostingsList_jobPostings($page: Int, $perPage: Int, $searchTerm: String, $archived: Boolean, $sortBy: JobPostingSortEnum, $sortByDirection: SortByDirectionEnum) {\n  paginatedUsersJobs(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    archived: $archived\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      archived\n      clientsShared {\n        id\n        firstName\n        lastName\n      }\n      companyName\n      createdAt\n      numClientsApplied\n      numClientsShared\n      position\n      location\n      isRemote\n      url\n      payPeriod\n      salaryMin\n      salaryMax\n    }\n  }\n}\n\nmutation JobPostingsList_updateUsersJobArchived($id: ID!, $archived: Boolean) {\n  updateUsersJob(id: $id, archived: $archived) {\n    id\n    archived\n  }\n}'
): (typeof documents)['query JobPostingsList_jobPostings($page: Int, $perPage: Int, $searchTerm: String, $archived: Boolean, $sortBy: JobPostingSortEnum, $sortByDirection: SortByDirectionEnum) {\n  paginatedUsersJobs(\n    page: $page\n    perPage: $perPage\n    searchTerm: $searchTerm\n    archived: $archived\n    sortBy: $sortBy\n    sortByDirection: $sortByDirection\n  ) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      archived\n      clientsShared {\n        id\n        firstName\n        lastName\n      }\n      companyName\n      createdAt\n      numClientsApplied\n      numClientsShared\n      position\n      location\n      isRemote\n      url\n      payPeriod\n      salaryMin\n      salaryMax\n    }\n  }\n}\n\nmutation JobPostingsList_updateUsersJobArchived($id: ID!, $archived: Boolean) {\n  updateUsersJob(id: $id, archived: $archived) {\n    id\n    archived\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UserJobsActivity on UsersJobs {\n  id\n  interviewStep\n  interviewedAt\n  createdAt\n  appliedAt\n  offerAt\n  rejectedAt\n  rejectedStage\n  offerAt\n}'
): (typeof documents)['fragment UserJobsActivity on UsersJobs {\n  id\n  interviewStep\n  interviewedAt\n  createdAt\n  appliedAt\n  offerAt\n  rejectedAt\n  rejectedStage\n  offerAt\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation LearnSkills_learnSkills($usersJobId: ID!) {\n  learnSkills(usersJobId: $usersJobId) {\n    result\n    isSync\n  }\n}\n\nsubscription LearnSkillsSubscription {\n  learnSkills {\n    content\n    usersJobId\n    initial\n    requestId\n    i\n  }\n}'
): (typeof documents)['mutation LearnSkills_learnSkills($usersJobId: ID!) {\n  learnSkills(usersJobId: $usersJobId) {\n    result\n    isSync\n  }\n}\n\nsubscription LearnSkillsSubscription {\n  learnSkills {\n    content\n    usersJobId\n    initial\n    requestId\n    i\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query MatchScore_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n    groupedSkills {\n      skills\n    }\n  }\n}\n\nmutation MatchScore_matchScore($usersJobId: ID!, $resumeId: ID!) {\n  matchScore(usersJobId: $usersJobId, resumeId: $resumeId) {\n    matchLevel\n    hardSkills\n    matches {\n      field\n      errorMessage\n    }\n  }\n}'
): (typeof documents)['query MatchScore_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n    groupedSkills {\n      skills\n    }\n  }\n}\n\nmutation MatchScore_matchScore($usersJobId: ID!, $resumeId: ID!) {\n  matchScore(usersJobId: $usersJobId, resumeId: $resumeId) {\n    matchLevel\n    hardSkills\n    matches {\n      field\n      errorMessage\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation SalaryInsights_salaryInsights($usersJobId: ID!) {\n  salaryInsights(usersJobId: $usersJobId)\n}'
): (typeof documents)['mutation SalaryInsights_salaryInsights($usersJobId: ID!) {\n  salaryInsights(usersJobId: $usersJobId)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ApplicationContent_usersJobs($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n  user {\n    id\n    tokenSalaryInsights\n    tokenJobMatch\n    tokenLearnSkills\n    tokenAchievements\n    plan\n  }\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation ApplicationContent_updateUsersJob($applicationInstructions: String, $companyName: String, $id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $url: String, $resumeId: ID) {\n  updateUsersJob(\n    applicationInstructions: $applicationInstructions\n    companyName: $companyName\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    url: $url\n    resumeId: $resumeId\n  ) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n}'
): (typeof documents)['query ApplicationContent_usersJobs($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n  user {\n    id\n    tokenSalaryInsights\n    tokenJobMatch\n    tokenLearnSkills\n    tokenAchievements\n    plan\n  }\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation ApplicationContent_updateUsersJob($applicationInstructions: String, $companyName: String, $id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $url: String, $resumeId: ID) {\n  updateUsersJob(\n    applicationInstructions: $applicationInstructions\n    companyName: $companyName\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    url: $url\n    resumeId: $resumeId\n  ) {\n    id\n    ...UserJobsActivity\n    ...UsersJobs\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Applications_usersJobs($archived: Boolean!) {\n  usersJobs(archived: $archived) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJobStatus($id: ID!, $status: UsersJobsStatusEnum!) {\n  updateUsersJob(id: $id, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJob($id: ID!, $archived: Boolean, $status: UsersJobsStatusEnum) {\n  updateUsersJob(id: $id, archived: $archived, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}'
): (typeof documents)['query Applications_usersJobs($archived: Boolean!) {\n  usersJobs(archived: $archived) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJobStatus($id: ID!, $status: UsersJobsStatusEnum!) {\n  updateUsersJob(id: $id, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}\n\nmutation Applications_updateUsersJob($id: ID!, $archived: Boolean, $status: UsersJobsStatusEnum) {\n  updateUsersJob(id: $id, archived: $archived, status: $status) {\n    id\n    __typename\n    ...UsersJobs\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment CoverLetter on UsersJobsCoverLetterType {\n  id\n  firstName\n  lastName\n  email\n  candidateAddress\n  companyName\n  companyLocation\n  phoneNumber\n  body\n  footer\n  archived\n  mostRecentUsedResumeForGenerate {\n    id\n  }\n}\n\nquery CoverLetterContent_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    ...CoverLetter\n    usersJob {\n      id\n      ...UsersJobs\n    }\n  }\n}\n\nquery CoverLettercontent_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation CoverLetterContent_generateCoverLetter($coverLetterLength: CoverLetterLengthEnum, $coverLetterTone: CoverLetterToneEnum, $resumeId: ID!, $usersJobId: ID!) {\n  generateCoverLetter(\n    coverLetterLength: $coverLetterLength\n    coverLetterTone: $coverLetterTone\n    resumeId: $resumeId\n    usersJobId: $usersJobId\n  ) {\n    id\n    body\n  }\n}\n\nmutation CoverLetterContent_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}'
): (typeof documents)['fragment CoverLetter on UsersJobsCoverLetterType {\n  id\n  firstName\n  lastName\n  email\n  candidateAddress\n  companyName\n  companyLocation\n  phoneNumber\n  body\n  footer\n  archived\n  mostRecentUsedResumeForGenerate {\n    id\n  }\n}\n\nquery CoverLetterContent_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    ...CoverLetter\n    usersJob {\n      id\n      ...UsersJobs\n    }\n  }\n}\n\nquery CoverLettercontent_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation CoverLetterContent_generateCoverLetter($coverLetterLength: CoverLetterLengthEnum, $coverLetterTone: CoverLetterToneEnum, $resumeId: ID!, $usersJobId: ID!) {\n  generateCoverLetter(\n    coverLetterLength: $coverLetterLength\n    coverLetterTone: $coverLetterTone\n    resumeId: $resumeId\n    usersJobId: $usersJobId\n  ) {\n    id\n    body\n  }\n}\n\nmutation CoverLetterContent_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query CoverLettersList_coverLetters($archived: Boolean) {\n  coverLetters(archived: $archived) {\n    id\n    body\n    createdAt\n    usersJob {\n      id\n      companyName\n      position\n    }\n  }\n}'
): (typeof documents)['query CoverLettersList_coverLetters($archived: Boolean) {\n  coverLetters(archived: $archived) {\n    id\n    body\n    createdAt\n    usersJob {\n      id\n      companyName\n      position\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query DashboardContent_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query DashboardContent_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Interview_getInterview($interviewId: [ID!]) {\n  interviews(interviewIds: $interviewId) {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n    messages {\n      fromUser\n      message\n    }\n  }\n}'
): (typeof documents)['query Interview_getInterview($interviewId: [ID!]) {\n  interviews(interviewIds: $interviewId) {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n    messages {\n      fromUser\n      message\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query InterviewsSidebar_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}'
): (typeof documents)['query InterviewsSidebar_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment Interviews_interview on Interview {\n  id\n  status\n  interviewType\n  score\n  jobTitle\n  messages {\n    fromUser\n    message\n  }\n}\n\nquery Interviews_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}\n\nmutation Interviews_interviewAddMessage($interviewId: String!, $message: String!) {\n  interviewAddMessage(interviewId: $interviewId, message: $message) {\n    ...Interviews_interview\n  }\n}'
): (typeof documents)['fragment Interviews_interview on Interview {\n  id\n  status\n  interviewType\n  score\n  jobTitle\n  messages {\n    fromUser\n    message\n  }\n}\n\nquery Interviews_interviews {\n  interviews {\n    id\n    status\n    interviewType\n    score\n    jobTitle\n  }\n}\n\nmutation Interviews_interviewAddMessage($interviewId: String!, $message: String!) {\n  interviewAddMessage(interviewId: $interviewId, message: $message) {\n    ...Interviews_interview\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation ListEmpty_createResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}'
): (typeof documents)['mutation ListEmpty_createResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment ResumesList_resumes on Resumes {\n  id\n  name\n  archived\n  createdAt\n  updatedAt\n  aiGenerated\n}\n\nquery ResumesList_allResumes {\n  resumes {\n    id\n    name\n  }\n}\n\nquery ResumesList_resumes($archived: Boolean, $aiGenerated: Boolean) {\n  resumes(archived: $archived, aiGenerated: $aiGenerated) {\n    id\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_updateArchivedResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(id: $id, archived: $archived) {\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_duplicateResume($id: ID!) {\n  duplicateResume(id: $id) {\n    ...ResumesList_resumes\n  }\n}'
): (typeof documents)['fragment ResumesList_resumes on Resumes {\n  id\n  name\n  archived\n  createdAt\n  updatedAt\n  aiGenerated\n}\n\nquery ResumesList_allResumes {\n  resumes {\n    id\n    name\n  }\n}\n\nquery ResumesList_resumes($archived: Boolean, $aiGenerated: Boolean) {\n  resumes(archived: $archived, aiGenerated: $aiGenerated) {\n    id\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_updateArchivedResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(id: $id, archived: $archived) {\n    ...ResumesList_resumes\n  }\n}\n\nmutation ResumeList_duplicateResume($id: ID!) {\n  duplicateResume(id: $id) {\n    ...ResumesList_resumes\n  }\n}']
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
  source: 'fragment ApplicationSelect_usersJobs on UsersJobs {\n  id\n  companyName\n  position\n  jobDetails\n}\n\nquery ApplicationSelect_usersJobs($archived: Boolean) {\n  usersJobs(archived: $archived) {\n    id\n    ...ApplicationSelect_usersJobs\n  }\n}'
): (typeof documents)['fragment ApplicationSelect_usersJobs on UsersJobs {\n  id\n  companyName\n  position\n  jobDetails\n}\n\nquery ApplicationSelect_usersJobs($archived: Boolean) {\n  usersJobs(archived: $archived) {\n    id\n    ...ApplicationSelect_usersJobs\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation Feedback_feedbackCreate($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}'
): (typeof documents)['mutation Feedback_feedbackCreate($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Navigation_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}\n\nquery Navigation_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}'
): (typeof documents)['query Navigation_itemsData {\n  user {\n    id\n    numJobs\n    usedJobAiFeature\n    usedResumeAiFeature\n    usedChromeExtension\n  }\n  resumes {\n    id\n    simpleAnalysis {\n      errorMessage\n    }\n    workExperiences {\n      simpleAnalysis {\n        errorMessage\n      }\n      workPositions {\n        simpleAnalysis {\n          errorMessage\n        }\n      }\n    }\n  }\n}\n\nquery Navigation_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ResumesSelect_resumes($archived: Boolean, $optimized: Boolean) {\n  resumes(archived: $archived, aiGenerated: $optimized) {\n    id\n    name\n  }\n}'
): (typeof documents)['query ResumesSelect_resumes($archived: Boolean, $optimized: Boolean) {\n  resumes(archived: $archived, aiGenerated: $optimized) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation UpdateLastPageLoaded_updateLastPageLoadedAt {\n  updateLastPageLoadedAt {\n    id\n  }\n}'
): (typeof documents)['mutation UpdateLastPageLoaded_updateLastPageLoadedAt {\n  updateLastPageLoadedAt {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n  phoneNumber\n  location\n  website\n  linkedinUrl\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}'
): (typeof documents)['fragment UsersUpdate on Users {\n  id\n  firstName\n  lastName\n  phoneNumber\n  location\n  website\n  linkedinUrl\n}\n\nquery AccountSettingsDialog_user {\n  user {\n    ...UsersUpdate\n  }\n}\n\nmutation AccountSettingsDialog_updateUser($attributes: UsersInputObject!) {\n  updateUser(attributes: $attributes) {\n    ...UsersUpdate\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment CreateClientGroupDialog_clientGroup on ClientGroup {\n  id\n  clients {\n    id\n  }\n}\n\nmutation CreateClientGroupDialog_createClientGroup($name: String!) {\n  createClientGroup(name: $name) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nmutation CreateClientGroupDialog_addUsersToClientGroup($clientGroupId: ID!, $userIds: [ID!]!) {\n  addUsersToClientGroup(clientGroupId: $clientGroupId, userIds: $userIds) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nquery CreateClientGroupDialog_clients {\n  clients {\n    data {\n      id\n      user {\n        firstName\n        lastName\n      }\n    }\n  }\n}'
): (typeof documents)['fragment CreateClientGroupDialog_clientGroup on ClientGroup {\n  id\n  clients {\n    id\n  }\n}\n\nmutation CreateClientGroupDialog_createClientGroup($name: String!) {\n  createClientGroup(name: $name) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nmutation CreateClientGroupDialog_addUsersToClientGroup($clientGroupId: ID!, $userIds: [ID!]!) {\n  addUsersToClientGroup(clientGroupId: $clientGroupId, userIds: $userIds) {\n    id\n    ...CreateClientGroupDialog_clientGroup\n  }\n}\n\nquery CreateClientGroupDialog_clients {\n  clients {\n    data {\n      id\n      user {\n        firstName\n        lastName\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query EditClientGroupDialog_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n    clients {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery EditClientGroupDialog_clients {\n  clients {\n    pagination {\n      page\n      pageSize\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation EditClientGroupDialog_editClientGroup($clientGroupId: ID!, $userIds: [ID!], $name: String) {\n  editClientGroup(clientGroupId: $clientGroupId, userIds: $userIds, name: $name) {\n    id\n  }\n}'
): (typeof documents)['query EditClientGroupDialog_clientGroups($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n    clients {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery EditClientGroupDialog_clients {\n  clients {\n    pagination {\n      page\n      pageSize\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation EditClientGroupDialog_editClientGroup($clientGroupId: ID!, $userIds: [ID!], $name: String) {\n  editClientGroup(clientGroupId: $clientGroupId, userIds: $userIds, name: $name) {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation EnhanceAchievementDialog_generateOneJobAchievement($workPositionId: ID!, $index: Int!, $keywords: [String!]) {\n  generateOneJobAchievement(\n    workPositionId: $workPositionId\n    index: $index\n    keywords: $keywords\n  )\n}'
): (typeof documents)['mutation EnhanceAchievementDialog_generateOneJobAchievement($workPositionId: ID!, $index: Int!, $keywords: [String!]) {\n  generateOneJobAchievement(\n    workPositionId: $workPositionId\n    index: $index\n    keywords: $keywords\n  )\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation EnhanceSummaryDialog_generateProfessionalSummary($resumeId: ID!, $useExisting: Boolean!, $keywords: [String!]) {\n  generateProfessionalSummary(\n    id: $resumeId\n    useExisting: $useExisting\n    keywords: $keywords\n  )\n}'
): (typeof documents)['mutation EnhanceSummaryDialog_generateProfessionalSummary($resumeId: ID!, $useExisting: Boolean!, $keywords: [String!]) {\n  generateProfessionalSummary(\n    id: $resumeId\n    useExisting: $useExisting\n    keywords: $keywords\n  )\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation FeedbackDialog_createFeedback($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}'
): (typeof documents)['mutation FeedbackDialog_createFeedback($subject: String, $feedback: String!) {\n  createFeedback(subject: $subject, feedback: $feedback)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ImportResumeFromLinkedinDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}\n\nmutation ImportResumeFromLinkedinDialog_createResumeFromLinkedinUrl($linkedinProfileUrl: String!) {\n  createResumeFromLinkedinUrl(linkedinProfileUrl: $linkedinProfileUrl) {\n    id\n  }\n}'
): (typeof documents)['query ImportResumeFromLinkedinDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}\n\nmutation ImportResumeFromLinkedinDialog_createResumeFromLinkedinUrl($linkedinProfileUrl: String!) {\n  createResumeFromLinkedinUrl(linkedinProfileUrl: $linkedinProfileUrl) {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query NewApplicationDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewApplicationDialog_createUsersJob($applicationInstructions: String, $contact: ContactsInputObject, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID) {\n  createUsersJob(\n    applicationInstructions: $applicationInstructions\n    contact: $contact\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    companyName: $companyName\n    url: $url\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    resumeId: $resumeId\n  ) {\n    id\n    status\n  }\n}\n\nquery NewApplicationsDialog_usersJobs($id: ID!) {\n  usersJobs(usersJobIds: [$id]) {\n    id\n    status\n    isRemote\n    jobDetails\n    location\n    notes\n    position\n    salaryMax\n    salaryMin\n    companyName\n    url\n    rejectedStage\n    interviewStep\n    payPeriod\n    applicationInstructions\n  }\n}\n\nmutation NewApplicationsDialog_updateUsersJob($id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID, $payPeriod: UsersJobsPayPeriodEnum, $applicationInstructions: String) {\n  updateUsersJob(\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    companyName: $companyName\n    url: $url\n    resumeId: $resumeId\n    payPeriod: $payPeriod\n    applicationInstructions: $applicationInstructions\n  ) {\n    id\n    status\n  }\n}'
): (typeof documents)['query NewApplicationDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewApplicationDialog_createUsersJob($applicationInstructions: String, $contact: ContactsInputObject, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $payPeriod: UsersJobsPayPeriodEnum, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID) {\n  createUsersJob(\n    applicationInstructions: $applicationInstructions\n    contact: $contact\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    payPeriod: $payPeriod\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    companyName: $companyName\n    url: $url\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    resumeId: $resumeId\n  ) {\n    id\n    status\n  }\n}\n\nquery NewApplicationsDialog_usersJobs($id: ID!) {\n  usersJobs(usersJobIds: [$id]) {\n    id\n    status\n    isRemote\n    jobDetails\n    location\n    notes\n    position\n    salaryMax\n    salaryMin\n    companyName\n    url\n    rejectedStage\n    interviewStep\n    payPeriod\n    applicationInstructions\n  }\n}\n\nmutation NewApplicationsDialog_updateUsersJob($id: ID!, $isRemote: Boolean, $jobDetails: String, $location: String, $notes: String, $position: String!, $salaryMax: Int, $salaryMin: Int, $status: UsersJobsStatusEnum, $rejectedStage: UsersJobsRejectedStageEnum, $interviewStep: UsersJobsInterviewStepEnum, $companyName: String!, $url: String, $resumeId: ID, $payPeriod: UsersJobsPayPeriodEnum, $applicationInstructions: String) {\n  updateUsersJob(\n    id: $id\n    isRemote: $isRemote\n    jobDetails: $jobDetails\n    location: $location\n    notes: $notes\n    position: $position\n    salaryMax: $salaryMax\n    salaryMin: $salaryMin\n    status: $status\n    rejectedStage: $rejectedStage\n    interviewStep: $interviewStep\n    companyName: $companyName\n    url: $url\n    resumeId: $resumeId\n    payPeriod: $payPeriod\n    applicationInstructions: $applicationInstructions\n  ) {\n    id\n    status\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query NewCoverLetterDialog_usersJobs($usersJobIds: [ID!], $archived: Boolean!) {\n  usersJobs(usersJobIds: $usersJobIds, archived: $archived) {\n    id\n    position\n    companyName\n    coverLetter {\n      id\n    }\n  }\n}\n\nquery NewCoverLetterDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewCoverLetterDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation NewCoverLetterDialog_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}'
): (typeof documents)['query NewCoverLetterDialog_usersJobs($usersJobIds: [ID!], $archived: Boolean!) {\n  usersJobs(usersJobIds: $usersJobIds, archived: $archived) {\n    id\n    position\n    companyName\n    coverLetter {\n      id\n    }\n  }\n}\n\nquery NewCoverLetterDialog_resumes {\n  resumes(archived: false) {\n    id\n    name\n  }\n}\n\nmutation NewCoverLetterDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation NewCoverLetterDialog_coverLetterUpsert($usersJobId: ID!, $attributes: UsersJobsCoverLetterInputObject!) {\n  coverLetterUpsert(usersJobId: $usersJobId, attributes: $attributes) {\n    id\n    ...CoverLetter\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query NewInterviewDialog_resume($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}\n\nmutation NewInterviewDialog_interviewStartMock($jobTitle: String!, $jobDescription: String, $interviewType: InterviewsTypeEnum!, $resumeId: ID) {\n  interviewStartMock(\n    jobTitle: $jobTitle\n    jobDescription: $jobDescription\n    interviewType: $interviewType\n    resumeId: $resumeId\n  ) {\n    id\n  }\n}'
): (typeof documents)['query NewInterviewDialog_resume($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}\n\nmutation NewInterviewDialog_interviewStartMock($jobTitle: String!, $jobDescription: String, $interviewType: InterviewsTypeEnum!, $resumeId: ID) {\n  interviewStartMock(\n    jobTitle: $jobTitle\n    jobDescription: $jobDescription\n    interviewType: $interviewType\n    resumeId: $resumeId\n  ) {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query NewResumeDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}'
): (typeof documents)['query NewResumeDialog_resumes {\n  resumes {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation RedeemCodeDialog_subscriptionsRedeemLtdPromoCode($promoCode: String!) {\n  subscriptionsRedeemLtdPromoCode(promoCode: $promoCode) {\n    id\n    plan\n  }\n}'
): (typeof documents)['mutation RedeemCodeDialog_subscriptionsRedeemLtdPromoCode($promoCode: String!) {\n  subscriptionsRedeemLtdPromoCode(promoCode: $promoCode) {\n    id\n    plan\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ShareJobPostingDialog_usersJobs($ids: [ID!]!) {\n  usersJobs(usersJobIds: $ids) {\n    id\n    position\n    companyName\n    clientsShared {\n      id\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clients($searchTerm: String) {\n  clients(page: 1, perPage: 50, searchTerm: $searchTerm) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}\n\nmutation ShareJobPostingDialog_shareJobWithClients($usersJobId: ID!, $userIds: [ID!]!, $clientGroupIds: [ID!]!) {\n  shareJobWithClients(\n    usersJobId: $usersJobId\n    userIds: $userIds\n    clientGroupIds: $clientGroupIds\n  ) {\n    id\n  }\n}'
): (typeof documents)['query ShareJobPostingDialog_usersJobs($ids: [ID!]!) {\n  usersJobs(usersJobIds: $ids) {\n    id\n    position\n    companyName\n    clientsShared {\n      id\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clients($searchTerm: String) {\n  clients(page: 1, perPage: 50, searchTerm: $searchTerm) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nquery ShareJobPostingDialog_clientGroups {\n  clientGroups {\n    id\n    name\n  }\n}\n\nmutation ShareJobPostingDialog_shareJobWithClients($usersJobId: ID!, $userIds: [ID!]!, $clientGroupIds: [ID!]!) {\n  shareJobWithClients(\n    usersJobId: $usersJobId\n    userIds: $userIds\n    clientGroupIds: $clientGroupIds\n  ) {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation TailorResumeDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation TailorResumeDialog_optimizeResumeForJob($keywords: [String!], $resumeId: ID!, $skills: [String!], $usersJobId: ID!) {\n  optimizeResumeForJob(\n    keywords: $keywords\n    resumeId: $resumeId\n    skills: $skills\n    usersJobId: $usersJobId\n  ) {\n    id\n    ...Resumes\n  }\n}\n\nmutation TailorResumeDialog_fetchJobKeywords($usersJobId: ID!) {\n  fetchJobKeywords(usersJobId: $usersJobId)\n}\n\nmutation TailorResumeDialog_fetchMissingSkillsOfJobResume($usersJobId: ID!, $resumeId: ID!) {\n  fetchMissingSkillsOfJobResume(usersJobId: $usersJobId, resumeId: $resumeId)\n}'
): (typeof documents)['mutation TailorResumeDialog_createUsersJob($position: String!, $status: UsersJobsStatusEnum, $companyName: String!, $jobDetails: String) {\n  createUsersJob(\n    position: $position\n    status: $status\n    companyName: $companyName\n    jobDetails: $jobDetails\n  ) {\n    id\n    ...UsersJobs\n  }\n}\n\nmutation TailorResumeDialog_optimizeResumeForJob($keywords: [String!], $resumeId: ID!, $skills: [String!], $usersJobId: ID!) {\n  optimizeResumeForJob(\n    keywords: $keywords\n    resumeId: $resumeId\n    skills: $skills\n    usersJobId: $usersJobId\n  ) {\n    id\n    ...Resumes\n  }\n}\n\nmutation TailorResumeDialog_fetchJobKeywords($usersJobId: ID!) {\n  fetchJobKeywords(usersJobId: $usersJobId)\n}\n\nmutation TailorResumeDialog_fetchMissingSkillsOfJobResume($usersJobId: ID!, $resumeId: ID!) {\n  fetchMissingSkillsOfJobResume(usersJobId: $usersJobId, resumeId: $resumeId)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation ResumeTemplateDrawer_updateTemplate($resumeId: ID!, $template: ResumesTemplateEnum!, $templateColorEnum: ResumesTemplateColorEnum) {\n  updateTemplateResume(\n    id: $resumeId\n    template: $template\n    templateColorEnum: $templateColorEnum\n  ) {\n    id\n    template\n    templateColorEnum\n  }\n}'
): (typeof documents)['mutation ResumeTemplateDrawer_updateTemplate($resumeId: ID!, $template: ResumesTemplateEnum!, $templateColorEnum: ResumesTemplateColorEnum) {\n  updateTemplateResume(\n    id: $resumeId\n    template: $template\n    templateColorEnum: $templateColorEnum\n  ) {\n    id\n    template\n    templateColorEnum\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query AdvisorSheet_clients($advisorIds: [ID!], $page: Int!, $perPage: Int!) {\n  clients(advisorIds: $advisorIds, page: $page, perPage: $perPage) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation AdvisorSheet_assignClientToAdvisor($advisorId: ID!, $clientIds: [ID!]!) {\n  assignClientToAdvisor(advisorId: $advisorId, clientIds: $clientIds)\n}'
): (typeof documents)['query AdvisorSheet_clients($advisorIds: [ID!], $page: Int!, $perPage: Int!) {\n  clients(advisorIds: $advisorIds, page: $page, perPage: $perPage) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n\nmutation AdvisorSheet_assignClientToAdvisor($advisorId: ID!, $clientIds: [ID!]!) {\n  assignClientToAdvisor(advisorId: $advisorId, clientIds: $clientIds)\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ApplicationToolbar_usersJobsArchived($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    archived\n  }\n}\n\nmutation ApplicationToolbar_updateUsersJobArchive($id: ID!, $archive: Boolean) {\n  updateUsersJob(id: $id, archived: $archive) {\n    id\n    archived\n  }\n}'
): (typeof documents)['query ApplicationToolbar_usersJobsArchived($usersJobIds: [ID!]) {\n  usersJobs(usersJobIds: $usersJobIds) {\n    id\n    archived\n  }\n}\n\nmutation ApplicationToolbar_updateUsersJobArchive($id: ID!, $archive: Boolean) {\n  updateUsersJob(id: $id, archived: $archive) {\n    id\n    archived\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query BoardToolbar_UsersJobs {\n  usersJobs {\n    id\n  }\n}'
): (typeof documents)['query BoardToolbar_UsersJobs {\n  usersJobs {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientBoardToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}'
): (typeof documents)['query ClientBoardToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientGroupToolbar_ClientGroup($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}'
): (typeof documents)['query ClientGroupToolbar_ClientGroup($clientGroupId: ID!) {\n  clientGroups(clientGroupIds: [$clientGroupId]) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientResumeToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}'
): (typeof documents)['query ClientResumeToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}'
): (typeof documents)['query ClientToolbar_client($clientId: ID!) {\n  client(clientId: $clientId) {\n    id\n    firstName\n    lastName\n    email\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ClientsToolbar_advisors {\n  advisors(page: 1, perPage: 999999) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}'
): (typeof documents)['query ClientsToolbar_advisors {\n  advisors(page: 1, perPage: 999999) {\n    pagination {\n      page\n      totalPages\n    }\n    data {\n      id\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query CoverLetterToolbar_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    archived\n  }\n}\n\nmutation CoverLetterToolbar_updateArchivedCoverLetter($coverLetterId: ID!, $archived: Boolean!) {\n  updateArchivedCoverLetter(coverLetterId: $coverLetterId, archived: $archived) {\n    id\n    archived\n  }\n}'
): (typeof documents)['query CoverLetterToolbar_coverLetters($coverLetterId: ID!) {\n  coverLetters(coverLetterIds: [$coverLetterId]) {\n    id\n    archived\n  }\n}\n\nmutation CoverLetterToolbar_updateArchivedCoverLetter($coverLetterId: ID!, $archived: Boolean!) {\n  updateArchivedCoverLetter(coverLetterId: $coverLetterId, archived: $archived) {\n    id\n    archived\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query CoverLettersToolbar_coverLetters {\n  coverLetters {\n    id\n  }\n}'
): (typeof documents)['query CoverLettersToolbar_coverLetters {\n  coverLetters {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query InterviewsToolbar_interviews {\n  interviews {\n    id\n  }\n}'
): (typeof documents)['query InterviewsToolbar_interviews {\n  interviews {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation JobPostingsToolbar_exportCsv {\n  exportUsersJobToCsv\n}'
): (typeof documents)['mutation JobPostingsToolbar_exportCsv {\n  exportUsersJobToCsv\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation ResumeBuilderToolbar_archiveResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(archived: $archived, id: $id) {\n    id\n    archived\n  }\n}\n\nquery ResumeBuilderToolbar_getResume($id: ID!) {\n  resumes(resumeIds: [$id]) {\n    id\n    archived\n  }\n}'
): (typeof documents)['mutation ResumeBuilderToolbar_archiveResume($id: ID!, $archived: Boolean!) {\n  updateArchivedResume(archived: $archived, id: $id) {\n    id\n    archived\n  }\n}\n\nquery ResumeBuilderToolbar_getResume($id: ID!) {\n  resumes(resumeIds: [$id]) {\n    id\n    archived\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query ResumesToolbar_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}'
): (typeof documents)['query ResumesToolbar_resumes($archived: Boolean) {\n  resumes(archived: $archived) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation CreateResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}'
): (typeof documents)['mutation CreateResume($name: String!) {\n  createResume(name: $name) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    role\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}'
): (typeof documents)['fragment AuthResponse on AuthResponse {\n  token\n  user {\n    id\n    role\n  }\n}\n\nmutation ProviderAuthentication($data: String!, $firstName: String, $lastName: String, $provider: AuthProviderTypeEnum!, $resumeUniqueId: ID, $referredByUserUniqueId: ID) {\n  authProviderAuthenticate(\n    data: $data\n    firstName: $firstName\n    lastName: $lastName\n    provider: $provider\n    resumeUniqueId: $resumeUniqueId\n    referredByUserUniqueId: $referredByUserUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignIn($email: String!, $password: String!) {\n  authSignIn(email: $email, password: $password) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationSignUp($email: String!, $firstName: String, $lastName: String, $referredByUserUniqueId: ID, $resumeUniqueId: ID) {\n  authSignUp(\n    email: $email\n    firstName: $firstName\n    lastName: $lastName\n    referredByUserUniqueId: $referredByUserUniqueId\n    resumeUniqueId: $resumeUniqueId\n  ) {\n    ...AuthResponse\n  }\n}\n\nmutation CredentialsAuthenticationEmailVerify($emailVerificationCode: String!, $firstName: String!, $lastName: String!, $password: String!) {\n  userEmailVerify(\n    emailVerificationCode: $emailVerificationCode\n    firstName: $firstName\n    lastName: $lastName\n    password: $password\n  ) {\n    ...AuthResponse\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Resumes {\n  resumes {\n    id\n  }\n}'
): (typeof documents)['query Resumes {\n  resumes {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Root {\n  user {\n    id\n    completedAllChecklistItems\n    role\n  }\n  resumes {\n    id\n  }\n}'
): (typeof documents)['query Root {\n  user {\n    id\n    completedAllChecklistItems\n    role\n  }\n  resumes {\n    id\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation uploadResume($uploadSignedId: ID!, $name: String!) {\n  uploadResume(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}'
): (typeof documents)['mutation uploadResume($uploadSignedId: ID!, $name: String!) {\n  uploadResume(uploadSignedId: $uploadSignedId, name: $name) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UsersJobs on UsersJobs {\n  id\n  applicationInstructions\n  createdAt\n  companyName\n  isRemote\n  jobDetails\n  location\n  notes\n  payPeriod\n  position\n  salaryMax\n  salaryMin\n  status\n  updatedAt\n  url\n  archived\n  rejectedStage\n  interviewStep\n  numClientsApplied\n  numClientsShared\n  partnerArchived\n  partnerCreatedByUser {\n    id\n    firstName\n    lastName\n  }\n  contacts {\n    id\n    email\n    name\n  }\n  resume {\n    id\n    name\n  }\n}'
): (typeof documents)['fragment UsersJobs on UsersJobs {\n  id\n  applicationInstructions\n  createdAt\n  companyName\n  isRemote\n  jobDetails\n  location\n  notes\n  payPeriod\n  position\n  salaryMax\n  salaryMin\n  status\n  updatedAt\n  url\n  archived\n  rejectedStage\n  interviewStep\n  numClientsApplied\n  numClientsShared\n  partnerArchived\n  partnerCreatedByUser {\n    id\n    firstName\n    lastName\n  }\n  contacts {\n    id\n    email\n    name\n  }\n  resume {\n    id\n    name\n  }\n}']
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
  source: 'query useBrowserExtensionToast_user {\n  user {\n    id\n    usedChromeExtension\n  }\n}'
): (typeof documents)['query useBrowserExtensionToast_user {\n  user {\n    id\n    usedChromeExtension\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query useCreateResume_resumes {\n  resumes {\n    id\n    name\n  }\n}'
): (typeof documents)['query useCreateResume_resumes {\n  resumes {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment Users on Users {\n  id\n  uniqueId\n  role\n  email\n  firstName\n  lastName\n  plan\n  tokenCoverLetter\n  tokenInterviewQuestions\n  tokenJobMatch\n  tokenProfessionalSummary\n  tokenSalaryInsights\n  tokenLearnSkills\n  tokenAchievements\n  tokenInterview\n  usedChromeExtension\n  numUploadedResumes\n  numStartedInterviews\n  referralTokens\n  hasSubscription\n  isAdvisoryClient\n  isAdvisoryOrgAccount\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}'
): (typeof documents)['fragment Users on Users {\n  id\n  uniqueId\n  role\n  email\n  firstName\n  lastName\n  plan\n  tokenCoverLetter\n  tokenInterviewQuestions\n  tokenJobMatch\n  tokenProfessionalSummary\n  tokenSalaryInsights\n  tokenLearnSkills\n  tokenAchievements\n  tokenInterview\n  usedChromeExtension\n  numUploadedResumes\n  numStartedInterviews\n  referralTokens\n  hasSubscription\n  isAdvisoryClient\n  isAdvisoryOrgAccount\n}\n\nquery useCurrentUser_users {\n  user {\n    id\n    ...Users\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query useUploadResume_resumes {\n  resumes {\n    id\n    name\n  }\n}'
): (typeof documents)['query useUploadResume_resumes {\n  resumes {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment Resumes on Resumes {\n  id\n  uniqueId\n  createdAt\n  updatedAt\n  name\n  archived\n  firstName\n  lastName\n  email\n  linkedinUrl\n  phoneNumber\n  professionalSummary\n  website\n  linkedinUrl\n  location\n  suggestedSkills\n  documentUrl\n  documentType\n  showOriginalDocument\n  hideEducations\n  hideProjects\n  hideSkills\n  hideSummary\n  hideCertifications\n  hideWorkExperiences\n  hideCourseworks\n  hideInvolvements\n  sectionsOrder\n  template\n  templateColorEnum\n  aiGenerated\n  courseworks {\n    id\n    name\n    institutionName\n    endDate\n    achievements\n    currentlyWorkingOnCourse\n  }\n  educations {\n    id\n    additionalInformation\n    degree\n    endDate\n    startDate\n    gpa\n    institutionName\n    location\n    currentlyInEducation\n  }\n  involvements {\n    id\n    name\n    organizationName\n    startDate\n    endDate\n    achievements\n    currentlyWorkingOnInvolvement\n  }\n  projects {\n    id\n    achievements\n    name\n    endDate\n    startDate\n    currentlyWorkingOnProject\n  }\n  workExperiences {\n    id\n    companyDescription\n    companyName\n    simpleAnalysis {\n      field\n      errorMessage\n    }\n    workPositions {\n      id\n      achievements\n      location\n      name\n      startDate\n      endDate\n      currentlyInPosition\n      simpleAnalysis {\n        field\n        errorMessage\n      }\n    }\n  }\n  groupedSkills {\n    id\n    category\n    skills\n  }\n  simpleAnalysis {\n    field\n    errorMessage\n  }\n  certifications {\n    id\n    name\n    completionDate\n    provider\n  }\n}\n\nquery ResumeBuilder_getResume($resumeId: [ID!]) {\n  resumes(resumeIds: $resumeId) {\n    id\n    documentUrl\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getResumeUnauthenticated($id: ID!) {\n  resumeUnauthenticated(id: $id) {\n    id\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getClientResume($clientId: ID!, $resumeId: [ID!]) {\n  clientResumes(clientId: $clientId, resumeIds: $resumeId) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_createResumeUnauthenticated($attributes: ResumesInputObject) {\n  createResumeUnauthenticated(attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResumeUnauthenticated($resumeUniqueId: ID!, $attributes: ResumesInputObject!) {\n  updateResumeUnauthenticated(id: $resumeUniqueId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResume($resumeId: ID!, $attributes: ResumesInputObject!) {\n  updateResume(id: $resumeId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_scoreResume($id: ID!) {\n  scoreResume(id: $id) {\n    failed\n    passed\n    score\n    scoreFields {\n      didPass\n      errorMessage\n      header\n      tags {\n        tagName\n      }\n    }\n    total\n  }\n}'
): (typeof documents)['fragment Resumes on Resumes {\n  id\n  uniqueId\n  createdAt\n  updatedAt\n  name\n  archived\n  firstName\n  lastName\n  email\n  linkedinUrl\n  phoneNumber\n  professionalSummary\n  website\n  linkedinUrl\n  location\n  suggestedSkills\n  documentUrl\n  documentType\n  showOriginalDocument\n  hideEducations\n  hideProjects\n  hideSkills\n  hideSummary\n  hideCertifications\n  hideWorkExperiences\n  hideCourseworks\n  hideInvolvements\n  sectionsOrder\n  template\n  templateColorEnum\n  aiGenerated\n  courseworks {\n    id\n    name\n    institutionName\n    endDate\n    achievements\n    currentlyWorkingOnCourse\n  }\n  educations {\n    id\n    additionalInformation\n    degree\n    endDate\n    startDate\n    gpa\n    institutionName\n    location\n    currentlyInEducation\n  }\n  involvements {\n    id\n    name\n    organizationName\n    startDate\n    endDate\n    achievements\n    currentlyWorkingOnInvolvement\n  }\n  projects {\n    id\n    achievements\n    name\n    endDate\n    startDate\n    currentlyWorkingOnProject\n  }\n  workExperiences {\n    id\n    companyDescription\n    companyName\n    simpleAnalysis {\n      field\n      errorMessage\n    }\n    workPositions {\n      id\n      achievements\n      location\n      name\n      startDate\n      endDate\n      currentlyInPosition\n      simpleAnalysis {\n        field\n        errorMessage\n      }\n    }\n  }\n  groupedSkills {\n    id\n    category\n    skills\n  }\n  simpleAnalysis {\n    field\n    errorMessage\n  }\n  certifications {\n    id\n    name\n    completionDate\n    provider\n  }\n}\n\nquery ResumeBuilder_getResume($resumeId: [ID!]) {\n  resumes(resumeIds: $resumeId) {\n    id\n    documentUrl\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getResumeUnauthenticated($id: ID!) {\n  resumeUnauthenticated(id: $id) {\n    id\n    ...Resumes\n  }\n}\n\nquery ResumeBuilder_getClientResume($clientId: ID!, $resumeId: [ID!]) {\n  clientResumes(clientId: $clientId, resumeIds: $resumeId) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_createResumeUnauthenticated($attributes: ResumesInputObject) {\n  createResumeUnauthenticated(attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResumeUnauthenticated($resumeUniqueId: ID!, $attributes: ResumesInputObject!) {\n  updateResumeUnauthenticated(id: $resumeUniqueId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_updateResume($resumeId: ID!, $attributes: ResumesInputObject!) {\n  updateResume(id: $resumeId, attributes: $attributes) {\n    id\n    ...Resumes\n  }\n}\n\nmutation ResumeBuilder_scoreResume($id: ID!) {\n  scoreResume(id: $id) {\n    failed\n    passed\n    score\n    scoreFields {\n      didPass\n      errorMessage\n      header\n      tags {\n        tagName\n      }\n    }\n    total\n  }\n}']
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
