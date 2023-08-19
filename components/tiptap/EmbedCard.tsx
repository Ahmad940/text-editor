import { ReactNode } from 'react'

interface EmbedCardProps {
  onClick: () => void
  title: string
  label: string
  icon: ReactNode
}

const EmbedCard = ({ onClick, label, title, icon }: EmbedCardProps) => {
  return (
    <div
      className='flex flex-row px-2 py-2 gap-1 hover:bg-[#e9f1ea]'
      onClick={onClick}
    >
      <div className='flex-[0.1] '>{icon}</div>
      <div>
        <p className='text-xs font-semibold'>{title}</p>
        <p className='text-[9px] text-gray-600'>{label} </p>
      </div>
    </div>
  )
}

export default EmbedCard
