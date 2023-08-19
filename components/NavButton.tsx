import { ReactNode } from 'react'

interface NavButtonProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

const NavButton = ({ children, active, onClick }: NavButtonProps) => {
  return (
    <button
      className={`w-full text-left px-4 py-2 text-white mb-1 ${
        active && 'bg-neutral-500'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NavButton
