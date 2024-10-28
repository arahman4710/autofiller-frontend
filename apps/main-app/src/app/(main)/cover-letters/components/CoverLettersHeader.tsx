'use client'

import { Article } from '@phosphor-icons/react'

import { PageHeader } from '@/components/PageHeader'

export const CoverLettersHeader = () => {
  return (
    <PageHeader
      subtitle="Manage and create cover letters."
      title="Cover Letters"
      titleIcon={<Article />}
    />
  )
}
