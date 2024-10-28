import { Metadata } from 'next'

import { ResetPassword } from './components/ResetPassword'

export const metadata: Metadata = {
  title: 'Reset Account Password',
}

export default async function Page() {
  return <ResetPassword />
}
