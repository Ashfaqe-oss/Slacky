"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";
import ImageModel from "./ImageModel";
import Button from "@/app/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useConversation from "@/app/hooks/useConversation";
import useOtherUser from "@/app/hooks/useOtherUser";
import { pusherClient } from "@/app/libs/pusher";
import conversationId from "../page";
import { find } from "lodash";
import DeleteModel from "./DeleteModel";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [msg, setsg] = useState(data);
  // const { conversationId } = useConversation();

  const isOwn = session.data?.user?.email === msg?.sender?.email;
  const seenList = (msg.seen || [])
    .filter((user) => user.email !== msg?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col ", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    msg.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  

  const [confirmOpen, setConfirmOpen] = useState(false)


  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={msg?.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{msg?.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(msg?.createdAt), "p")}
          </div>
        </div>
        <div className="flex">
          {session?.data?.user?.email === msg?.sender?.email && (
            <>
              <DeleteModel msg={msg} isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}/>
              <button
                disabled={isLoading}
                className="mt-2 mr-[6px] hover:bg-red-500 transition rounded-full z-10"
                onClick={() => setConfirmOpen(true)}              >
                🗑️
              </button>
            </>
          )}

          <div className={message}>
            <ImageModel
              src={msg?.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            {msg.image ? (
              <Image
                alt="Image"
                height="288"
                width="288"
                onClick={() => setImageModalOpen(true)}
                src={msg?.image}
                className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
              />
            ) : (
              <div>{msg?.body}</div>
            )}
          </div>
        </div>

        {isLast && isOwn && seenList.length >= 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            pt-1
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
