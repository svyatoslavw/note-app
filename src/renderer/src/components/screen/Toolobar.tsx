import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  UndoRedo
} from '@mdxeditor/editor'
import { CombinedNote } from '@renderer/store/noteStore'

const Toolobar = ({ selectedNote }: { selectedNote: CombinedNote }) => {
  return (
    <div className="block w-full">
      <p className="text-center text-sm font-medium border-b-2 border-zinc-200 mb-2 pt-1.5 pb-2">
        {selectedNote.title ? selectedNote.title : 'Getting started'}
      </p>
      <div className="flex items-center">
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <Separator />
        <InsertTable />
        <InsertThematicBreak />
        <Separator />
        <ListsToggle />
        <Separator />
        <CodeToggle />
        <BlockTypeSelect />
      </div>
    </div>
  )
}

export { Toolobar }
