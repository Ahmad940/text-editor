import { CLD_NAME } from '@/utils/constants/env.constant'
import { Editor } from '@tiptap/react'
import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RiImage2Fill } from 'react-icons/ri'
import TipTapMenuButton from '../TipTapMenuButton'
interface imageProps {
  editor: Editor | null
  iconClass: string
}

const TipTapImagePlugin = ({ editor, iconClass }: imageProps) => {
  // upload image dialogue
  const [showDialogue, setShowDialogue] = useState(false)
  const DialogueDivRef = useRef<HTMLDivElement>(null)

  // close the dialogue on  click
  const toggleDialogue = useCallback(() => {
    setShowDialogue((prev) => !prev)
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const url = `https://api.cloudinary.com/v1_1/${CLD_NAME}/image/upload`

    const formData = new FormData()

    for (let i = 0; i < acceptedFiles.length; i++) {
      let file = acceptedFiles[i]
      formData.append('file', file)
      formData.append('upload_preset', 'wazobia')
      // formData.append('api_key', CLD_KEY)
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.text()
        })
        .then((data) => {
          const result = JSON.parse(data)
          console.log('Image', result.secure_url)
          // addImage(result.secure_url)
          toggleDialogue()
        })
        .catch((err) => {
          console.log('Error occurred', err)
        })
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  // adding image to text editor
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.commands.setImage({ src: url })
    }
  }, [editor])
  return (
    <div className=''>
      <TipTapMenuButton onClick={addImage} tooltip='Add Image'>
        <RiImage2Fill className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* <div className=''> */}
      {showDialogue && (
        <div
          ref={DialogueDivRef}
          className={`${
            !showDialogue && 'hidden'
          } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <div className='shadow shadow-gray-500 flex flex-col flex-1 justify-center items-center'>
            <div className='flex flex-1 flex-col gap-5 px-2 py-2'>
              <div>
                <p
                  className='float-right mr-2 mt-2 cursor-pointer'
                  onClick={toggleDialogue}
                >
                  x
                </p>
              </div>

              <div
                {...getRootProps({
                  className: 'dropzone-form ',
                })}
              >
                <div className=''>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Click to select image or click and drag</p>
                  )}
                </div>
              </div>

              <div>
                <button className='px-1 py-2 text-white bg-blue-700 float-right'>
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TipTapImagePlugin
