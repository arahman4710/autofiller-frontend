'use server'

import { redirect } from 'next/navigation'

export const redirectToHome = async () => {
  redirect('/')
}
