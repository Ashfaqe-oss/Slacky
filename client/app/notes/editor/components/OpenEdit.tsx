"use client";

import { Editor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteNoteModal from "./DeleteNoteModal";
type Props = {
  isEditable: boolean;
  handleIsEditable: (isEditable: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  tempTitle: string;
  setTempTitle: (tempTitle: string) => void;
  tempContent: string;
  setTempContent: (tempContent: string) => void;
  editor: Editor | null;
  note: any;
};

const OpenEdit = ({
  isEditable,
  handleIsEditable,
  title,
  setTitle,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  editor,
  note,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleEnableEdit = () => {
    handleIsEditable(!isEditable);
    setTempTitle(title);
    setTempContent(editor?.getHTML() || "");
  };

  const handleCancelEdit = () => {
    handleIsEditable(!isEditable);
    setTitle(tempTitle);
    editor?.commands.setContent(tempContent);
  };
 

  return (
    <div className="flex justify-between items-center">
      <div className="mt-3">
        {isEditable ? (
          <div className="flex justify-between gap-3 p-2">
            <button onClick={handleCancelEdit}>
              <AiOutlineCloseCircle className="h-6 w-6 text-accent-red text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex">
            <button onClick={handleEnableEdit}>
              <PencilSquareIcon className="h-6 w-6 text-accent-red m-2 cursor-pointer" />
            </button>
            {note && (
              <>
                <DeleteNoteModal
                  note={note}
                  isOpen={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                />
                <button
                  disabled={isLoading}
                  // className="mt-2 max-h-6 mr-[6px] hover:bg-red-500 transition rounded-full z-10"
                  onClick={() => setConfirmOpen(true)}
                >
                  <BsTrash
                    // onClick={handleDelete}
                    className=" h-6 w-6 text-accent-red m-2 cursor-pointer"
                  />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenEdit;
