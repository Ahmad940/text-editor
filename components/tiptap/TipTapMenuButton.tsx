import { ReactNode } from 'react'

interface btnProps {
  onClick?: () => void
  disabled?: boolean
  isActive?: boolean
  className?: string
  children: ReactNode
  tooltip?: string
}

const TipTapMenuButton = ({
  onClick,
  disabled,
  isActive,
  className,
  children,
  tooltip,
}: btnProps) => {
  return (
    <div className='relative group'>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-1 py-1 rounded-md ${
          isActive && 'bg-gray-400 text-white'
        } hover:bg-gray-300 ${className}`}
      >
        {children}
      </button>

      {tooltip && (
        <span className='pointer-events-none bg-black text-white text-center text-xs rounded-lg py-1 px-2 absolute -top-9 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 z-20'>
          {tooltip}
          <svg
            className='absolute text-black h-2 w-full left-0 top-full'
            x='0px'
            y='0px'
            viewBox='0 0 255 255'
            xmlSpace='preserve'
          >
            <polygon className='fill-current' points='0,0 127.5,127.5 255,0' />
          </svg>
        </span>
      )}
    </div>
  )
}

export default TipTapMenuButton
