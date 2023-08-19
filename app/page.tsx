'use client'

import NavButton from '@/components/NavButton'
import TipTapEditor from '@/components/tiptap/Editor'
import RenderTipTapHtml from '@/components/tiptap/RenderTipTapHtml'
import { useState } from 'react'

type tab_type = 'EDITOR' | 'RESULT'

export default function Home() {
  const [editorContent, setEditorContent] = useState('')
  const [editorTitle, setEditorTitle] = useState('')
  const [activeTab, setActiveTab] = useState<tab_type>('EDITOR')

  return (
    <>
      <div className='flex flex-row flex-1 items-center justify-between px-5 bg-indigo-500 h-12'>
        <p className='text-white font-bold'>Editor</p>

        <div className='flex flex-row items-center'>
          {/* Editor tab button */}
          <NavButton
            active={activeTab == 'EDITOR'}
            onClick={() => setActiveTab('EDITOR')}
          >
            Editor
          </NavButton>

          {/* Result tab button */}
          <NavButton
            active={activeTab == 'RESULT'}
            onClick={() => setActiveTab('RESULT')}
          >
            Result
          </NavButton>
        </div>
      </div>

      <div className=''>
        {activeTab === 'EDITOR' && (
          <div>
            <TipTapEditor
              setEditorContent={setEditorContent}
              setEditorTitle={setEditorTitle}
              placeholder='Write Something'
              initialContent={editorContent}
              initialTitle={editorTitle}
            />
          </div>
        )}

        {activeTab === 'RESULT' && (
          <div className='pt-5 px-10'>
            <p className='font-bold text-3xl'>{editorTitle}</p>
            <div className='mt-5'>
              <RenderTipTapHtml __html={editorContent} />
            </div>
          </div>
        )}

        {editorContent}
      </div>
    </>
  )
}
