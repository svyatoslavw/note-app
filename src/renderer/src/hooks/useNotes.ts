import useNotesStore from '@renderer/store/noteStore'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const { notes, selectedNoteIndex, setSelectedNoteIndex, loadNotes, setSelectedNote } =
    useNotesStore()

  const handleNoteSelect = (index: number) => {
    setSelectedNoteIndex(index)
    setSelectedNote()

    if (onSelect) onSelect()
  }

  return {
    notes,
    loadNotes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
