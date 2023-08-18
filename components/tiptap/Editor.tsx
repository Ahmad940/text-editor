'use client'

import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import PlaceHolder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapMenu from './TipTapMenu'

interface EditorProps {
  editorRef?: any
  editable?: boolean
  initialValue?: string
  placeholder?: string
}

const TipTapEditor = ({
  editable = true,
  initialValue,
  placeholder,
  editorRef,
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
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class: 'editor',
      },
    },
    onCreate: (e) => {
      if (e && e?.editor && editorRef)
        editorRef.current.value = e.editor.getHTML()
    },
    onUpdate: (e) => {
      if (e && e?.editor && editorRef)
        editorRef.current.value = e.editor.getHTML()
    },
  })

  return (
    <div className=''>
      <TipTapMenu editor={editor} />

      <div className='max-h-[74vh] overflow-hidden overflow-y-scroll px-3 bg-white rounded-b-xl'>
        <EditorContent editor={editor} ref={editorRef} />
      </div>
    </div>
  )
}

export default TipTapEditor
