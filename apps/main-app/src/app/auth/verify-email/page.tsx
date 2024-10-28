import { Metadata } from 'next'

import { EmailVerify } from './components/EmailVerify'

export const metadata: Metadata = {
  title: 'Finish Signing Up',
}

export default async function Page() {
  return <EmailVerify />
}
