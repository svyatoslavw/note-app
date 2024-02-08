import { MDXEditorMethods } from '@mdxeditor/editor'
import useNotesStore from '@renderer/store/noteStore'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useEditor = () => {
  const { saveNote, selectedNote } = useNotesStore()

  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving:', selectedNote.title)

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSave.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSave,
    handleBlur
  }
}
