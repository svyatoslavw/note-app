import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useEditor } from '@renderer/hooks/useEditor'
import { Toolobar } from './Toolobar'

const Separator = () => <div className="w-[2px] h-5 mx-2 bg-zinc-300" />

const admonitionMarkdown = `
# Hello World

> some description

## Todo example:

* [ ] first
* [x] second

Example table:

| Example | Example |
| :-----: | :-----: |
| Example | Example |
`

const Editor = () => {
  const { editorRef, handleAutoSave, handleBlur, selectedNote } = useEditor()

  if (!selectedNote)
    return (
      <div className="flex items-center justify-center h-1/2 text-lg font-medium italic text-neutral-500">
        Please select a note or{' '}
        <span className="ml-1 hover:underline cursor-pointer transition-colors text-neutral-900 duration-100">
          create a new note
        </span>
      </div>
    )

  return (
    <>
      <MDXEditor
        ref={editorRef}
        key={selectedNote.title}
        markdown={selectedNote.content}
        onChange={handleAutoSave}
        onBlur={handleBlur}
        className="bg-gradient-to-r from-zinc-50 to-zinc-200 "
        contentEditableClassName="outline-none min-h-screen max-w-none text-md px-8 py-5 caret-zinc-500 prose prose-text-neutral-700 prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-5 prose-li:text-sm prose-code:px-1 prose-code:text-neutral-700 prose-code:before:content-[''] prose-code:after:content-['']"
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          toolbarPlugin({
            toolbarContents: () => <Toolobar selectedNote={selectedNote} />
          })
        ]}
      />
    </>
  )
}
export { Editor }
