import useNotesStore from '@renderer/store/noteStore'
import { Trash2 } from 'lucide-react'

const Welcome = () => {
  const { deleteNote } = useNotesStore()

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <div className="flex justify-between font-medium text-sm items-center px-1">
      <span>Welcome!</span>
      <Trash2 onClick={handleDelete} size={24} className="hover:bg-zinc-200 p-1 rounded-[4px]" />
    </div>
  )
}

export default Welcome
