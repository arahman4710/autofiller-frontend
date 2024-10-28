import { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'

import { ForgotPassword } from './components/ForgotPassword'

export const metadata: Metadata = {
  title: 'Reset Account Password',
}

export default function ForgotPasswordPage() {
  return (
    <div>
      <PageHeader title="Reset Account Password" />
      <ForgotPassword />
    </div>
  )
}
