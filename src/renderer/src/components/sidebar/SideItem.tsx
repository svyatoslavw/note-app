import clsx from 'clsx'
import { type LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

export type ISideLink = {
  Icon: LucideIcon
  text: string
} & ComponentProps<'div'>

const SideItem = ({ text, content, className, Icon, ...props }: ISideLink) => {
  return (
    <div
      className={clsx(
        'flex items-center px-4 py-1 my-1 rounded-md gap-2 text-neutral-500 font-semibold hover:bg-zinc-300/40 cursor-pointer w-full transition-colors duration-100',
        className
      )}
      {...props}
    >
      <Icon size={18} />
      <span className="truncate text-sm">{text}</span>
    </div>
  )
}
export { SideItem }
