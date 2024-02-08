import { formatDateFromMs } from '@renderer/utils/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

import clsx from 'clsx'
import { ChevronRightIcon, ChevronsRightIcon } from 'lucide-react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

const NoteItem = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  return (
    <div
      className={clsx(
        'flex items-center px-4 py-1 rounded-md gap-1 text-xs text-neutral-500 my-1 font-semibold hover:bg-zinc-300/40 cursor-pointer w-full transition-colors duration-100 ',
        {
          'bg-gradient-to-br from-zinc-200 to-zinc-300': isActive,
          'hover:bg-zinc-200/50': !isActive
        },
        className
      )}
      {...props}
    >
      {isActive ? (
        <ChevronsRightIcon className="rounded-full" size={18} />
      ) : (
        <ChevronRightIcon className="rounded-full" size={18} />
      )}
      <span className="truncate text-sm">{title}</span>
    </div>
  )
}
export { NoteItem }
