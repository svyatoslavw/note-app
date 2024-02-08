import { NoteContent, NoteInfo } from 'src/shared/models'
import { create } from 'zustand'

export type CombinedNote = NoteInfo & { content: NoteContent }

interface INoteStore {
  notes: NoteInfo[]
  selectedNoteIndex: number | null
  setSelectedNoteIndex: (index: number) => void
  loadNotes: () => Promise<void>
  selectedNote: CombinedNote | null
  setSelectedNote: () => Promise<void>
  saveNote: (newContent: NoteContent) => Promise<void>
  createEmptyNote: () => any
  deleteNote: () => void
}

const useNotesStore = create<INoteStore>((set) => ({
  notes: [],
  selectedNote: null,
  selectedNoteIndex: null,
  loadNotes: async () => {
    const notes = await window.context.getNotes()
    set({ notes: notes.sort((a, b) => b.lastEditTime - a.lastEditTime) })
  },

  setSelectedNoteIndex: (index) => set({ selectedNoteIndex: index }),

  setSelectedNote: async () => {
    const { notes, selectedNoteIndex } = useNotesStore.getState()
    if (selectedNoteIndex === null || !notes) return
    const selectedNote = notes[selectedNoteIndex]
    const noteContent = await window.context.readNote(selectedNote.title)
    set({
      selectedNote: {
        ...selectedNote,
        content: noteContent
      }
    })
  },

  saveNote: async (newContent) => {
    const { notes, selectedNote } = useNotesStore.getState()

    if (!selectedNote || !notes) return

    await window.context.writeNote(selectedNote.title, newContent)

    set((state) => ({
      notes: state.notes.map((note) =>
        note.title === selectedNote.title ? { ...note, lastEditTime: Date.now() } : note
      )
    }))
  },
  createEmptyNote: async () => {
    const state = useNotesStore.getState()
    const notes = state.notes

    if (!notes) return

    const title = await window.context.createNote()

    if (!title) return

    const newNote: NoteInfo = {
      title,
      lastEditTime: Date.now()
    }

    set((state) => ({
      notes: [newNote, ...state.notes.filter((note) => note.title !== newNote.title)],
      selectedNoteIndex: null
    }))
  },

  deleteNote: async () => {
    const { notes, selectedNote } = useNotesStore.getState()

    if (!selectedNote || !notes) return

    const isDeleted = await window.context.deleteNote(selectedNote.title)

    if (!isDeleted) return

    set((state) => ({
      notes: state.notes.filter((note) => note.title !== selectedNote.title),
      selectedNoteIndex: null,
      selectedNote: null
    }))
  }
}))

export default useNotesStore
