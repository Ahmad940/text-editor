'use client'

import TipTapEditor from '@/components/tiptap/Editor'
import RenderTipTapHtml from '@/components/tiptap/RenderTipTapHtml'
import { useRef } from 'react'

export default function Home() {
  const editorRef = useRef<any>()

  return (
    <div className='flex flex-1 flex-col justify-center px-20 pt-20 gap-5'>
      <div className='w-full'>
        <TipTapEditor editorRef={editorRef} placeholder='Write Something' />
      </div>

      <div>
        <p>Result</p>
        <RenderTipTapHtml __html={editorRef.current?.value} />
      </div>
    </div>
  )
}
