'use client'

import { Files } from '@phosphor-icons/react'

import { PageHeader } from '@/components/PageHeader'

export const ResumesHeader = () => {
  return (
    <PageHeader
      className="pl-6"
      subtitle="Manage and create resumes."
      title="Resumes"
      titleIcon={<Files />}
    />
  )
}
