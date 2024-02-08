import { useNotesList } from '@renderer/hooks/useNotes'
import { useOutside } from '@renderer/hooks/useOutside'

import { NoteInfo } from '@shared/models'
import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'
import { NotebookPenIcon, SearchIcon } from 'lucide-react'

interface ISearchItem {
  searchNotes: NoteInfo[]
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
  onSelect?: () => void
}

const SearchItem = ({ searchNotes, searchText, setSearchText, onSelect }: ISearchItem) => {
  const { isShow, ref, setIsShow } = useOutside(false)
  const { handleNoteSelect, notes } = useNotesList({ onSelect })

  const handleSelect = (searchIndex: number) => {
    const selectedNote = searchNotes[searchIndex]
    const selectedIndex = notes.findIndex((note) => note.title === selectedNote.title)
    handleNoteSelect(selectedIndex)
  }

  return (
    <div
      onClick={() => setIsShow(true)}
      ref={ref}
      className={clsx(
        'flex items-center px-4 py-1 my-1 rounded-md gap-2 text-neutral-500 font-semibold hover:bg-zinc-300/40 cursor-pointer w-full transition-colors duration-100'
      )}
    >
      <SearchIcon size={18} />
      {isShow ? (
        <input
          autoFocus
          className="flex w-4/5 h-5 px-1 outline-none caret-zinc-700 rounded-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      ) : (
        <span className="truncate text-sm">Search</span>
      )}
      {isShow && searchNotes.length > 0 && (
        <div
          className={clsx(
            'animate-fade h-32 w-44 overflow-y-auto bg-zinc-300 absolute mt-40 ml-[22px] rounded-lg'
          )}
        >
          <ul>
            {searchNotes.map((note, index) => (
              <li
                key={note.title}
                className="flex gap-2 w-full px-2 py-1 text-sm items-center hover:bg-zinc-200 rounded"
                onClick={() => handleSelect(index)}
              >
                <NotebookPenIcon size={16} />
                {note.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { SearchItem }
