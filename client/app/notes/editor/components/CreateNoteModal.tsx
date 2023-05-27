"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import Model from "@/app/components/Model";
import Button from "@/app/components/Button";
import Tiptap from "./TipTap";
import NoteContent from "./NoteContent";

interface CreateNoteModalProps {
  isOpen?: boolean;
  onClose: () => void;
  existing?: boolean;
  note?: any;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  existing,
  note,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Model isOpen={isOpen!} onClose={onClose}>
      <div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
              >
                Create a new Note
              </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Express yourself with a note and share it with friends
            </p>

            <NoteContent note={note} existing={existing} onClose={onClose}/>
          </div>
        </div>
        
      </div>
    </Model>
  )
};

export default CreateNoteModal;
