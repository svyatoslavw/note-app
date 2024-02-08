import useNotesStore from '@renderer/store/noteStore'
import { ClipboardPen } from 'lucide-react'

const CreateButton = () => {
  const { createEmptyNote, selectedNoteIndex } = useNotesStore()

  console.log(selectedNoteIndex)

  return (
    <ClipboardPen
      onClick={createEmptyNote}
      size={35}
      className="hover:bg-zinc-200 p-2 rounded-[5px]"
    />
  )
}

export { CreateButton }
