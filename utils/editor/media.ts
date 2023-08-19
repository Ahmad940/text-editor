import { Editor } from '@tiptap/react'

// adding image to text editor
export const addImageToEditor = (editor: Editor) => {
  const url = window.prompt('URL')

  if (url) {
    editor?.commands.setImage({ src: url })
  }
}

export const addYoutubeVideoToEditor = (editor: Editor) => {
  const url = prompt('Enter YouTube URL')

  if (url) {
    editor?.commands.setYoutubeVideo({
      src: url,
    })
  }
}
