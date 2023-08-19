import { Editor } from '@tiptap/react'
import { useCallback } from 'react'
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiDoubleQuotesL,
  RiFormatClear,
  RiH1,
  RiH2,
  RiItalic,
  RiLink,
  RiLinkUnlink,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiTextWrap,
} from 'react-icons/ri'
import TipTapMenuButton from './TipTapMenuButton'
import TipTapImagePlugin from './plugins/TipTapImagePlugin'

interface menuProps {
  editor: Editor | null
}

const TipTapMenu = ({ editor }: menuProps) => {
  const iconClass = 'h-5 w-5 fill-black'

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const Separator = () => (
    <div className='bg-[#a8a8a8] h-[1.25rem] w-[1px] ml-[.5rem] mr-[.5rem]'></div>
  )

  return (
    <div className='bg-white w-fit rounded-xl flex flex-row flex-wrap items-center px-1 py-2 sticky border shadow-sm'>
      {/* Paragraph */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setParagraph()}
        isActive={editor?.isActive('paragraph')}
        tooltip='Paragraph'
      >
        <RiParagraph className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* Heading 1 */}
      <TipTapMenuButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        isActive={editor?.isActive('heading', { level: 1 })}
        tooltip='Heading 1'
      >
        <RiH1 className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* Heading 2 */}
      <TipTapMenuButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        isActive={editor?.isActive('heading', { level: 2 })}
        tooltip='Heading 2'
      >
        <RiH2 className={`${iconClass}`} />
      </TipTapMenuButton>

      <Separator />

      {/* Link */}
      <TipTapMenuButton
        onClick={() =>
          editor?.isActive('link')
            ? editor?.chain().focus().unsetLink().run()
            : setLink()
        }
        isActive={editor?.isActive('link')}
        tooltip='Link'
      >
        {editor?.isActive('link') ? (
          <RiLinkUnlink className={`${iconClass}`} />
        ) : (
          <RiLink className={`${iconClass}`} />
        )}
      </TipTapMenuButton>

      {/* Image */}
      <TipTapImagePlugin editor={editor} iconClass={iconClass} />

      <Separator />

      {/* clear nodes */}
      {/* <TipTapMenuButton
        onClick={() => editor?.chain().focus().clearNodes().run()}
      >
        <RiMarkPenFill />
      </TipTapMenuButton> */}

      {/* align left */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
        isActive={editor?.isActive({ textAlign: 'left' })}
        tooltip='Align left'
      >
        <RiAlignLeft className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* align center */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
        isActive={editor?.isActive({ textAlign: 'center' })}
        tooltip='Align center'
      >
        <RiAlignCenter className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* align right */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
        isActive={editor?.isActive({ textAlign: 'right' })}
        tooltip='Align right'
      >
        <RiAlignRight className={`${iconClass}`} />
      </TipTapMenuButton>

      {/* align justify */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
        isActive={editor?.isActive({ textAlign: 'justify' })}
        tooltip='Align justify'
      >
        <RiAlignJustify className={`${iconClass}`} />
      </TipTapMenuButton>

      <Separator />

      {/* Bold */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        isActive={editor?.isActive('bold')}
        tooltip='Bold'
      >
        <RiBold className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* Italic */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        isActive={editor?.isActive('italic')}
        tooltip='Italic'
      >
        <RiItalic className={`${iconClass}`} />
      </TipTapMenuButton>
      {/*  Strike through */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        isActive={editor?.isActive('strike')}
        tooltip='Strike through'
      >
        <RiStrikethrough className={`${iconClass}`} />
      </TipTapMenuButton>

      <Separator />

      {/* bullet list */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        isActive={editor?.isActive('bulletList')}
        tooltip='Bullet list'
      >
        <RiListOrdered className={`${iconClass}`} />
      </TipTapMenuButton>
      {/*  ordered list */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        isActive={editor?.isActive('orderedList')}
        tooltip='Numbered list'
      >
        <RiListUnordered className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* task list */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        isActive={editor?.isActive('taskList')}
        tooltip='Task list'
      >
        <RiListCheck2 className={`${iconClass}`} />
      </TipTapMenuButton>

      <Separator />

      {/* blockquote */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        isActive={editor?.isActive('blockquote')}
        tooltip='Blockquote'
      >
        <RiDoubleQuotesL className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* horizontal line */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        tooltip='Horizontal line'
      >
        <RiSeparator className={`${iconClass}`} />
      </TipTapMenuButton>
      <Separator />

      {/* hard break */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().setHardBreak().run()}
        tooltip='Line break'
      >
        <RiTextWrap className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* Clear formatting */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
        tooltip='Clear format'
      >
        <RiFormatClear className={`${iconClass}`} />
      </TipTapMenuButton>
      <Separator />
      {/* undo */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().chain().focus().undo().run()}
        tooltip='Undo'
      >
        <RiArrowGoBackLine className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* redo */}
      <TipTapMenuButton
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().chain().focus().redo().run()}
        tooltip='Redo'
      >
        <RiArrowGoForwardLine className={`${iconClass}`} />
      </TipTapMenuButton>
      {/* <TipTapMenuButton
        onClick={() => editor?.chain().focus().setColor('#958DF1').run()}
        className={
          editor?.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }
      >
        purple
      </TipTapMenuButton> */}
    </div>
  )
}

export default TipTapMenu
