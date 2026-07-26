import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

const Card = ({ children, className, hover = false }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
        hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
