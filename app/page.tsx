'use client'

import TipTapEditor from '@/components/tiptap/Editor'
import RenderTipTapHtml from '@/components/tiptap/RenderTipTapHtml'
import { useState } from 'react'

export default function Home() {
  const [editorContent, setEditorContent] = useState('')

  return (
    <div className='flex flex-1 flex-col justify-center px-20 pt-10 gap-5'>
      <div className='w-full'>
        <TipTapEditor
          setEditorContent={setEditorContent}
          placeholder='Write Something'
        />
      </div>

      <div>
        <p>Result</p>
        <RenderTipTapHtml __html={editorContent} />
      </div>
    </div>
  )
}
