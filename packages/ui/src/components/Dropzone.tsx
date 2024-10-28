import { useEffect, useState } from 'react'

import { CloudArrowUp, FileArrowUp, X } from '@phosphor-icons/react'
import { useDropzone } from 'react-dropzone'

import { cn } from '../utils'
import { Button } from './Button'

interface IDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string
  disabled?: boolean
  loading?: boolean
  multiple?: boolean
  onDropAccepted: (files: File[]) => void
}

export const Dropzone = ({
  className,
  description,
  disabled = false,
  loading,
  multiple = false,
  onDropAccepted,
}: IDropzoneProps) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [isInputMounted, setIsInputMounted] = useState<boolean>(true)
  const { getInputProps, getRootProps, isDragAccept, isDragReject, isFocused, open } = useDropzone({
    accept: {
      'application/msword': [], // .doc
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], // .docx
    },
    disabled: loading || disabled,
    multiple,
    noClick: true,
    noKeyboard: true,
    onDropAccepted: (files: File[]) => {
      setAcceptedFiles(files)
      onDropAccepted(files)
    },
  })

  const rootClassName = cn(
    'flex min-h-[225px] items-center justify-center rounded-md border border-dashed border-border-secondary p-8',
    isFocused && 'border-blue-500 bg-background-background/70',
    isDragAccept && 'border-green-500',
    isDragReject && 'border-destructive'
  )

  const showDropzone = acceptedFiles.length === 0 || multiple

  const handleRemoveFile = (fileIndex: number) => {
    setAcceptedFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex))
    setIsInputMounted(false)
  }

  useEffect(() => {
    if (!isInputMounted) {
      setIsInputMounted(true)
    }
  }, [isInputMounted])

  return (
    <div className={cn('flex flex-col gap-4 ', className)}>
      {showDropzone && (
        <div {...getRootProps({ className: rootClassName })}>
          {isInputMounted && <input {...getInputProps()} />}
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <CloudArrowUp size={48} />
            <p className="font-semibold text-stone-400">
              {description ?? 'Drag and drop your file here'} or{' '}
              <button
                className="cursor-pointer text-blue-500 underline"
                onClick={open}
                type="button"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-stone-500">Accepted File Types: .pdf, .doc, and .docx</p>
          </div>
        </div>
      )}
      <div>
        <ul className="flex flex-row gap-2">
          {acceptedFiles.map((file, index) => {
            return (
              <UploadedFile
                file={file}
                fileIndex={index}
                key={file.name}
                onRemoveFile={handleRemoveFile}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const UploadedFile = ({
  file,
  fileIndex,
  onRemoveFile,
}: {
  file: File
  fileIndex: number
  onRemoveFile: (fileIndex: number) => void
}) => {
  return (
    <li className="border-border-secondary bg-background-secondary flex h-20 w-full flex-row items-center justify-between rounded-md border px-4 py-2">
      <div className="flex flex-row items-center gap-2">
        <FileArrowUp className="text-green-500" size={36} />
        <div className="overflow-ellipsis font-mono text-sm text-stone-400">
          <p>{file.name}</p>
          <p>{Math.floor(file.size / 1024)}KB</p>
        </div>
      </div>
      <Button onClick={() => onRemoveFile(fileIndex)} title="Remove file" variant="ghost">
        <X className="cursor-pointer text-stone-400 hover:text-white" size={14} />
      </Button>
    </li>
  )
}
