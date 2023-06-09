"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { note } from "@prisma/client";

// import Input from "../inputs/Input";
// import Select from '../inputs/Select';
// import Modal from './Modal';
// import Button from '../Button';
import { toast } from "react-hot-toast";
import Model from "@/app/components/Model";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import Select from "@/app/components/inputs/Select";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { htmlToText } from "html-to-text";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  notes: any[];
  conversationId?: string;
}

const GroupChatModel: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  notes = [],
  conversationId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedNote, setSelectedNote] = useState();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const text = htmlToText(selectedNote!, {
      wordwrap: 130,
    });

    axios
      .post("/api/messages", {
        message: text,
        conversationId: conversationId,
      })
      .then((response) => {
        toast.success("Note shared successfully !");
        onClose();
      })
      .catch((error) => {
        toast.error("OOops, Something is not right ! ");
      });
  };

  //   type OptionType = { note: any };
  //   type OptionsType = Array<OptionType>;
  return (
    <Model isOpen={isOpen!} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Select one of your Notes
            </h2>
            {notes.length > 0 && (
              <p className="mt-1 text-sm leading-6 text-gray-600">
                to share with your friends ..
              </p>
            )}
            {notes.length === 0 && (
              <>
                <p className="mt-6 text-sm leading-6 text-red-500">
                  You have No notes to share. Please create one first !
                </p>
                <p className="mt-1 text-sm leading-6 text-sky-500">
                  Click on the notes icon to enter Notes Editor .
                </p>
              </>
            )}
            <div className="mt-10 flex flex-col gap-y-8">
              <Select
                disabled={isLoading || notes.length === 0}
                label="Notes"
                options={notes.map((note) => ({
                  value: note.id,
                  label: note.title,
                  content: note.content,
                }))}
                noMulti={false}
                onChange={(note) => setSelectedNote(note.content)}
                // value={notes.filter((note) => {
                //     note.content === selectedNote
                // })}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Send
          </Button>
        </div>
      </form>
    </Model>
  );
};

export default GroupChatModel;
