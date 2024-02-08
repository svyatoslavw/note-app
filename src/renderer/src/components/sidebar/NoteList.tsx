import { useNotesList } from '@renderer/hooks/useNotes'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { ComponentProps, useEffect } from 'react'
import { NoteItem } from './NoteItem'

export type INoteList = ComponentProps<'ul'> & {
  onSelect?: () => void
}

const NoteList = ({ onSelect, className, ...props }: INoteList) => {
  const { notes, selectedNoteIndex, handleNoteSelect, loadNotes } = useNotesList({ onSelect })
  useEffect(() => {
    loadNotes()
  }, [])
  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={clsx('text-center pt-4 font-medium text-sm', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NoteItem
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={() => handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}

export { NoteList }
