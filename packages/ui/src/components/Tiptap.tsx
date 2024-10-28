import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { ListBullets, ListNumbers, TextB, TextItalic, TextUnderline } from '@phosphor-icons/react'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { cn } from '../utils'
import { Toggle } from './Toggle'

export type TTiptapRef = {
  refreshContent: (newContent?: string) => void
}

interface ITiptapProps {
  content: string | undefined
  disabled?: boolean
  forceBulletList?: boolean
  onChange: (content: string) => void
  placeholder?: string
  refreshContent?: boolean
}

export const Tiptap = forwardRef<TTiptapRef, ITiptapProps>(
  ({ content, disabled = false, forceBulletList, onChange, placeholder }, ref) => {
    const [isContentMounted, setIsContentMounted] = useState(false)
    const editorRef = useRef<Editor | null>(null)

    useImperativeHandle(
      ref,
      () => ({
        refreshContent: (newContent) => {
          if (newContent) {
            editorRef.current?.chain().setContent(newContent).run()
          } else if (content) {
            editorRef.current?.chain().setContent(content).run()
          }
        },
      }),
      [content]
    )

    const extensions = [
      Underline,
      OrderedList,
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc',
          },
          keepAttributes: true,
          keepMarks: true,
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal',
          },
          keepAttributes: true,
          keepMarks: true,
        },
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: () => {
          return `${forceBulletList ? '•' : ''} ${placeholder ?? 'Type something...'}`
        },
      }),
    ]

    const editor = useEditor(
      {
        content: forceBulletList ? `<ul>${content}</ul>` : content,
        editable: !disabled,
        editorProps: {
          attributes: {
            class: cn(disabled ? 'cursor-not-allowed' : ''),
          },
        },
        extensions,
        onUpdate: ({ editor }) => {
          if (forceBulletList && !editor.isActive('bulletList')) {
            editor.chain().focus().toggleBulletList().run()
          }
          onChange(editor.getHTML())
        },
      },
      [forceBulletList, disabled]
    ) as Editor

    useEffect(() => {
      if (content && !isContentMounted) {
        editor?.chain().setContent(content).run()
        setIsContentMounted(true)
      }
    }, [content, isContentMounted, setIsContentMounted])

    if (!editor) return null

    editorRef.current = editor

    return (
      <div className="border-border-secondary rounded-md border">
        <EditorMenu editor={editor} hideToggleBulletList={forceBulletList} />
        <div className="px-4 py-3">
          <EditorContent editor={editor} width="100%" />
        </div>
      </div>
    )
  }
)

Tiptap.displayName = 'Tiptap'

const EditorMenu = ({
  editor,
  hideToggleBulletList,
}: {
  editor: Editor
  hideToggleBulletList?: boolean
}) => {
  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run()
  }, [editor])

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run()
  }, [editor])

  return (
    <div className="border-border-secondary flex flex-row gap-1 border-b px-2 py-1.5">
      <Toggle onPressedChange={toggleBold} pressed={editor.isActive('bold')} size="sm">
        <TextB />
      </Toggle>
      <Toggle onPressedChange={toggleUnderline} pressed={editor.isActive('underline')} size="sm">
        <TextUnderline />
      </Toggle>
      <Toggle onPressedChange={toggleItalic} pressed={editor.isActive('italic')} size="sm">
        <TextItalic />
      </Toggle>
      {!hideToggleBulletList && (
        <Toggle
          onPressedChange={toggleBulletList}
          pressed={editor.isActive('bulletList')}
          size="sm"
        >
          <ListBullets />
        </Toggle>
      )}
      <Toggle
        onPressedChange={toggleOrderedList}
        pressed={editor.isActive('orderedList')}
        size="sm"
      >
        <ListNumbers />
      </Toggle>
    </div>
  )
}
