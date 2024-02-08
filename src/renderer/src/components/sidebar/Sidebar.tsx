import useNotesStore from '@renderer/store/noteStore'
import { NoteInfo } from '@shared/models'
import { ComponentProps, useEffect, useState } from 'react'

import clsx from 'clsx'
import { PlusCircleIcon } from 'lucide-react'

import { NoteList } from './NoteList'
import { SearchItem } from './SearchItem'
import { SideItem } from './SideItem'
import Welcome from './Welcome'

type ISidebar = ComponentProps<'aside'> & { resetScroll: () => void }

const Sidebar = ({ className, resetScroll, ...props }: ISidebar) => {
  const { createEmptyNote, notes } = useNotesStore()
  const [searchText, setSearchText] = useState('')
  const [searchNotes, setSearchNotes] = useState<NoteInfo[]>([])

  useEffect(() => {
    if (searchText.trim() !== '') {
      const result = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      )
      setSearchNotes(result)
    } else {
      setSearchNotes([])
    }
  }, [notes, searchText])
  return (
    <aside
      {...props}
      className={clsx('w-[250px] h-[100vh] overflow-auto bg-zinc-200/50 py-3 px-1', className)}
    >
      <Welcome />
      <div className="h-[2px] rounded-lg my-1 w-full bg-zinc-200"></div>
      <SideItem onClick={createEmptyNote} Icon={PlusCircleIcon} text="New page" />
      <SearchItem
        searchNotes={searchNotes}
        searchText={searchText}
        setSearchText={setSearchText}
        onSelect={resetScroll}
      />
      <NoteList onSelect={resetScroll} />
    </aside>
  )
}

export { Sidebar }
