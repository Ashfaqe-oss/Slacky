"use client";

import { Editor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
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

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/notes/${note?.id}`)
      .then(() => {
        toast.success(`Note deleted successfully`);
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [note?.id]);

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
            {note && <BsTrash onClick={handleDelete} className=" h-6 w-6 text-accent-red m-2 cursor-pointer" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenEdit;
