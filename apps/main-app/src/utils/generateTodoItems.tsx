'use client'

import { DotsNine, FileText, Sparkle } from '@phosphor-icons/react'

export const generateTodoItems = (data) => {
  const user = data?.user
  const size = 16

  const numResumes = data?.resumes?.length
  const errorMessages = data?.resumes.map((resume) => {
    const errorMessages: (Maybe<string> | undefined)[] = []
    errorMessages.concat(resume?.simpleAnalysis?.map((field) => field.errorMessage))

    const workExperiencesErrorMessages = resume.workExperiences?.flatMap((workExperience) => {
      const errorMessages: (Maybe<string> | undefined)[] = []
      errorMessages.concat(workExperience.simpleAnalysis?.map((field) => field.errorMessage))

      const workPositionErrorMessages = workExperience.workPositions?.flatMap((workPosition) => {
        return workPosition.simpleAnalysis?.map((field) => field.errorMessage)
      })
      errorMessages.concat(workPositionErrorMessages)
      return errorMessages
    })
    errorMessages.concat(workExperiencesErrorMessages)
    return errorMessages
  })

  const todoList = [
    generateTodoListItem(
      <FileText size={size} />,
      numResumes && numResumes > 0 ? 'Complete your first resume' : 'Create your first resume',
      'Optimize resumes to increase your chances of landing the interview.',
      '/resumes',
      numResumes &&
        numResumes > 0 &&
        errorMessages &&
        errorMessages.some((resumeErrorMessage) => resumeErrorMessage.length === 0)
    ),
    generateTodoListItem(
      <Sparkle size={size} />,
      'Install our chrome extension',
      'Our chrome extension tracks and autofills applications with one click. Once installed, navigate to a supported site and login to the chrome extension to get started.',
      'https://chromewebstore.google.com/detail/canyon-track-apply-to-job/npekhmlmillbfcbohangleomoblkckih',
      user?.usedChromeExtension,
      true
    ),
    generateTodoListItem(
      <DotsNine size={size} />,
      'Create your first job application',
      'Track your job application and optimize your application to increase your chances of landing your dream job.',
      '/board',
      user?.numJobs && user?.numJobs > 0
    ),
    generateTodoListItem(
      <Sparkle size={size} />,
      'Improve your resume with AI',
      'Our AI features are proven to increase your chance of landing the interview.',
      '/resumes',
      user?.usedResumeAiFeature
    ),
    generateTodoListItem(
      <Sparkle size={size} />,
      'Increase your chances of landing your dream job using AI',
      'Our AI features are proven to help you pass the interview. Click into the job application to use the AI features.',
      '/board',
      user?.usedJobAiFeature
    ),
  ]

  return todoList
}

const generateTodoListItem = (icon, header, subText, href, checked, openInNewTab = false) => {
  return {
    checked,
    header,
    href,
    icon,
    openInNewTab,
    subText,
  }
}
