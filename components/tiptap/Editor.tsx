'use client'

import { TEXT_COUNT_LIMIT } from '@/utils/constants/editor.constants'
import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import PlaceHolder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapMenu from './TipTapMenu'

interface EditorProps {
  setEditorContent?: (arg: any) => void
  editable?: boolean
  initialValue?: string
  placeholder?: string
}

const TipTapEditor = ({
  editable = true,
  initialValue,
  placeholder,
  setEditorContent,
}: EditorProps) => {
  const editor = useEditor({
    editable: editable,
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      PlaceHolder.configure({
        placeholder: placeholder || 'Write here',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link,
      Image,
      CharacterCount.configure({
        limit: TEXT_COUNT_LIMIT,
        mode: 'textSize',
      }),
      Youtube,
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class: 'editor',
      },
    },
    onCreate: (e) => {
      if (e.editor) setEditorContent?.(e?.editor?.getHTML())
    },
    onUpdate: (e) => {
      if (e.editor) setEditorContent?.(e?.editor?.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className=''>
      {/* Editor toolbar */}
      <TipTapMenu editor={editor} />

      {/* Editor container */}
      <div className='max-h-[74vh] overflow-hidden overflow-y-scroll px-3 bg-white'>
        {/* Tip tap editor */}
        <EditorContent editor={editor} />
      </div>
      {/* Status bar */}
      <div className='rounded-b-xl flex flex-1 justify-end px-3'>
        <p className='text-sm text-neutral-400'>
          {editor.storage.characterCount.words()}/{TEXT_COUNT_LIMIT} words
        </p>
      </div>
    </div>
  )
}

export default TipTapEditor
