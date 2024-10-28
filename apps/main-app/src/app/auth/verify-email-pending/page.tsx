import { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Verify Your Email',
}

export default function VerifyEmailPendingPage() {
  return (
    <div>
      <PageHeader
        subtitle="Please check your email for a verification link to complete your sign up."
        title="Verify Your Email"
      />
    </div>
  )
}
