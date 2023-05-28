"use client";

import React, { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import useConversation from "@/app/hooks/useConversation";
import { toast } from "react-hot-toast";
import Model from "@/app/components/Model";
import { FullMessageType } from "@/app/types";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  note: any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, note }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    <Model isOpen={isOpen!} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Message
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
                This message will be deleted for everyone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={handleDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Model>
  );
};

export default ConfirmModal;
