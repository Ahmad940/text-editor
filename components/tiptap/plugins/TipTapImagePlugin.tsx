import { CLD_NAME, CLD_UPLOAD_PRESET } from '@/utils/constants/env.constant'
import { Editor } from '@tiptap/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { RiImage2Fill } from 'react-icons/ri'
import TipTapMenuButton from '../TipTapMenuButton'

interface imageProps {
  editor: Editor | null
  iconClass: string
}

const TipTapImagePlugin = ({ editor, iconClass }: imageProps) => {
  // upload image dialogue
  const [showDialogue, setShowDialogue] = useState(false)
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)

  // close the dialogue on  click
  const toggleDialogue = useCallback(() => {
    if (showDialogue) {
      setFile(undefined)
    }
    setShowDialogue((prev) => !prev)
  }, [showDialogue])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  const insertImage = () => {
    if (!file) return alert('No image selected')

    const url = `https://api.cloudinary.com/v1_1/${CLD_NAME}/image/upload`

    const formData = new FormData()
    formData.append('file', file as File)
    formData.append('upload_preset', CLD_UPLOAD_PRESET)

    // formData.append('api_key', CLD_KEY)

    setLoading(true)

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
        addImage(result.secure_url)
        toggleDialogue()
        setLoading(false)
      })
      .catch((err) => {
        console.log('Error occurred', err)
        setLoading(false)
      })
  }

  // adding image to text editor
  const addImage = useCallback(
    (url: string) => {
      // const url = window.prompt('URL')

      if (url) {
        editor?.commands.setImage({ src: url })
      }
    },
    [editor]
  )
  return (
    <div className=''>
      <TipTapMenuButton onClick={toggleDialogue} tooltip='Add Image'>
        <RiImage2Fill className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* <div className=''> */}
      {showDialogue && (
        <div className='fixed bg-black/40 top-0 bottom-0 left-0 right-0 z-[99999] shadow-neutral-800'>
          <div
            className={`fixed top-1/2 left-1/2 transform bg-white shadow-lg -translate-x-1/2 -translate-y-1/2 z-[99999]`}
          >
            <div className='shadow shadow-gray-500 flex flex-col flex-1 justify-center items-center'>
              <div className='flex flex-1 flex-col px-2 py-2'>
                <div className='flex flex-1 justify-between items-center'>
                  <p>Embed</p>
                  <p
                    className='float-right mr-2 mt-2 cursor-pointer'
                    onClick={toggleDialogue}
                  >
                    x
                  </p>
                </div>

                <p className='text-xs mt-3'>Upload Image</p>

                <p className='mt-2 text-xs text-gray-600'>File upload</p>
                <div
                  {...getRootProps({
                    className: `dropzone-form`,
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

                <div className='mt-2 flex flex-row gap-3'>
                  <button
                    className='py-2 text-white bg-green-700 flex items-center gap-2 px-3 rounded-md'
                    disabled={loading}
                    onClick={insertImage}
                  >
                    {loading && (
                      <AiOutlineLoading3Quarters className='animate-spin' />
                    )}
                    Embed
                  </button>

                  <button
                    className='py-2 border border-gray-500 flex items-center gap-2 px-3 rounded-md'
                    disabled={loading}
                    onClick={toggleDialogue}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TipTapImagePlugin
