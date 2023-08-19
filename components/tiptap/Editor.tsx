'use client'

import { TEXT_COUNT_LIMIT } from '@/utils/constants/editor.constants'
import CharacterCount from '@tiptap/extension-character-count'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import PlaceHolder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ChangeEvent } from 'react'
import TipTapFloatingMenu from './FloatingMenu'
import TipTapMenu from './TipTapMenu'
interface EditorProps {
  setEditorContent?: (arg: any) => void
  setEditorTitle?: (arg: any) => void
  editable?: boolean
  initialContent?: string
  initialTitle?: string
  placeholder?: string
}

const TipTapEditor = ({
  editable = true,
  initialContent,
  initialTitle,
  placeholder,
  setEditorContent,
  setEditorTitle,
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
      }),
      Youtube,
      Gapcursor,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'editor',
      },
    },
    onCreate: (e) => {
      if (e.editor) setEditorContent?.(e?.editor?.getHTML())
    },
    onUpdate: (e) => {
      if (e.editor) {
        // const words = editor?.storage?.characterCount?.words()
        setEditorContent?.(e?.editor?.getHTML())
      }
    },
  })

  // set the title of the editor on key press
  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setEditorTitle?.((event.target as HTMLInputElement).value)
  }

  if (!editor) {
    return null
  }

  return (
    <div className='border pt-5 rounded-md bg-[#fafafa] relative'>
      <div className='px-3 pb-10 relative overflow-hidden'>
        <input
          type='text'
          className='mb-3 outline-none font-semibold text-lg w-full pr-12'
          placeholder='Enter title here'
          onChange={updateTitle}
          defaultValue={initialTitle}
        />

        {/* Editor toolbar */}
        <TipTapMenu editor={editor} />

        {/* Editor container */}
        <div className='max-h-[70vh] h-screen overflow-hidden overflow-y-scroll px-3'>
          {/* Tip tap editor */}

          {/* 
        The editor floating
        the menu set offset so the floating menu display below the line of the current node as in requirement
         */}
          <TipTapFloatingMenu editor={editor} />

          <EditorContent editor={editor} />
        </div>
      </div>
      {/* Status bar */}
      <div className='flex flex-1 justify-end border bg-white shadow'>
        <p className='text-sm text-neutral-400 px-2'>
          {editor?.storage?.characterCount?.words()}/{1000} words
        </p>
      </div>
    </div>
  )
}

export default TipTapEditor
