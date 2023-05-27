'use client'

import { format } from "date-fns";
import { useState } from "react";
import CreateNoteModal from "./CreateNoteModal";

interface NoteBoxProps {
  note: any;
}

const NoteBox:React.FC<NoteBoxProps> = ({
  note
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <CreateNoteModal
        note={note}
        existing={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    <div
        onClick={() => setIsModalOpen(true)}
      className="col-span-1 cursor-pointer group border border-gray-300 rounded-xl m-2 p-4"
    >
      <div className="flex h-full flex-col gap-1 w-full">
        <div className="font-semibold text-lg mt-1">{note.title}</div>

        <div className="font-light text-neutral-500">category</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold"> 
          {format(new Date(note?.createdAt), "p")}
           </div>
          {/* <div className="font-light">, updated at</div> */}
        </div>
        <div className="flex flex-1 flex-col">
          <p className="flex flex-1 h-full p-1 font-light text-sm text-neutral-500">
            {note?.content.slice(0, 65) + '...'}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default NoteBox;
