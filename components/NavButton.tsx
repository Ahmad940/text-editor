import { ReactNode } from 'react'

interface NavButtonProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

const NavButton = ({ children, active, onClick }: NavButtonProps) => {
  return (
    <button
      className={`w-fit text-left px-4 py-3 rounded-md text-white hover:bg-indigo-600 ${
        active && 'bg-indigo-700'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NavButton
