import useNotesStore from '@renderer/store/noteStore'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const { notes, selectedNoteIndex, setSelectedNoteIndex, loadNotes, selectNote } = useNotesStore()

  const handleNoteSelect = (index: number) => {
    setSelectedNoteIndex(index)
    selectNote()

    if (onSelect) onSelect()
  }

  return {
    notes,
    loadNotes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
