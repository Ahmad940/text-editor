import { addImageToEditor, addYoutubeVideoToEditor } from '@/utils/editor/media'
import { PlusIcon, VideoCameraIcon } from '@heroicons/react/20/solid'
import { Editor, FloatingMenu } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { RiImage2Fill } from 'react-icons/ri'
import EmbedCard from './EmbedCard'

interface menuProps {
  editor: Editor | null
}

const TipTapFloatingMenu = ({ editor }: menuProps) => {
  const [isActive, setIsActive] = useState(false)

  const toggleActive = () => setIsActive((prev) => !prev)

  const embedContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Function to handle clicks outside the target component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        embedContainerRef.current &&
        !embedContainerRef.current.contains(event.target as Node) &&
        isActive
      ) {
        toggleActive()
      }
    }

    // Attach the click event listener to the document
    document.addEventListener('click', handleClickOutside)

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive])

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ offset: [33, 0] }}>
          <button
            className='bg-[#d6e9d9] rounded-full p-2 shadow-sm'
            onClick={toggleActive}
          >
            <PlusIcon className='h-6 w-6 fill-black' />

            <div
              ref={embedContainerRef}
              className={`${
                !isActive && 'hidden'
              } absolute z-[1000] mt-4 bg-white w-52 shadow -translate-x-5`}
            >
              <div className='w-max px-3 mt-1'>
                <p className='text-[0.55rem]'>EMBEDS</p>
              </div>

              <div>
                {/* Picture card */}
                <EmbedCard
                  title='Picture'
                  label='JPEG, PNG'
                  icon={<RiImage2Fill className='h-5 w-5' />}
                  onClick={() => addImageToEditor(editor)}
                />

                {/* Embed video card */}
                <EmbedCard
                  title='Video'
                  label='Youtube'
                  icon={<VideoCameraIcon className='h-5 w-5' />}
                  onClick={() => addYoutubeVideoToEditor(editor)}
                />
              </div>
            </div>
          </button>
        </FloatingMenu>
      )}
    </>
  )
}

export default TipTapFloatingMenu
