import { Metadata } from 'next'

import { AddBusinessName } from './components/AddBusinessName'

export const metadata: Metadata = {
  title: 'Add your business name',
}

export default async function Page() {
  return <AddBusinessName />
}
