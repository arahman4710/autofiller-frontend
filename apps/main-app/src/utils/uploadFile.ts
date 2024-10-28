'use client'

import { getSession } from 'next-auth/react'

interface IUploadFile {
  file: File
  onComplete: (response: { filename: string; signed_id: string }) => void
  onError: () => void
  onProgress?: (progress: number) => void
}

export const uploadFile = async ({
  file,
  onComplete,
  onError,
  onProgress,
}: IUploadFile): Promise<XMLHttpRequest> => {
  const session = await getSession()
  const token = session?.token
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`
  const formData = new FormData()
  const xhr = new XMLHttpRequest()

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Authorization', `Bearer ${token}`)

  if (onProgress) {
    xhr.upload.addEventListener('progress', (e) => {
      onProgress((e.loaded * 100) / e.total || 100)
    })
  }

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      onComplete(JSON.parse(xhr.response))
    } else if (xhr.readyState === 4 && xhr.status !== 200 && xhr.status !== 0) {
      onError()
    }
  })

  formData.append('file', file)
  xhr.send(formData)
  return xhr
}
