"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import NoteSelectModal from "./NoteSelectModal";
import { useState } from "react";
import { CgNotes } from "react-icons/cg";

interface FormProps {
  notes: any[];
}
const Form: React.FC<FormProps> = ({ notes = [] }) => {
  const { conversationId } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(notes)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
    // console.log(data)
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId: conversationId,
    });
  };


  return (
    <>
      <NoteSelectModal
        notes={notes}
        // onSubmit={handleSubmit(onSubmit)}
        conversationId={conversationId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div
        className="
          pt-4
          sm:p-2
          bg-white 
          border-t 
          flex 
          items-center 
          gap-2 
          lg:gap-4 
          w-full
          "
      >
        <div className="flex flex-col sm:flex-row">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="hcgosbip"
          >
            <HiPhoto size={30} className="text-sky-500 cursor-pointer" />
          </CldUploadButton>
          <CgNotes
            className="text-sky-500 h-6 w-6 ml-1 mt-1 sm:ml-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message"
          />
          <button
            type="submit"
            className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
