"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";

interface MessageBoxProps {
  key: string;
  data: FullMessageType;
  isLast: boolean;
}
const MessageBox: React.FC<MessageBoxProps> = ({ key, data, isLast }) => {
  const session = useSession();
  //to check if it is the user's message or friend's
  const isOwn = session.data?.user?.email === data?.sender?.email;

  const [imageModelOpen, setImageModelOpen] = useState(false);

  //an arr to maintain the list of users who have seen the message n turn to text for rendering
  const seenList = (data.seen || []) //empty [] to avoid error when filtering oprs
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", "); //ex - 'user1, user2, user3'

  //classes that are dynamic preferably written here
  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

    // console.log(session.data?.user?.email , data?.sender?.email)
  //   console.log(data)
  //   console.log(seenList)
  // console.log(seenList, isLast, isOwn, seenList.length)
  return (
    // <div className="p-3  m-2 border rounded-2xl border-indigo-500 w-max">
    //   {data.body}
    //   {data.image && <Image src={data?.image} alt="Avatar" width={220} height={220} />}
    // </div>
    <div className={container}>
      <div className={avatar}>
        <Avatar  h={6} w={6} user={data.sender} />
      </div>
      <div className={body}>
      <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>

        <div className={message}>
          {/* <ImageModel src={data.image} isOpen={imageModelOpen} onClose={() => setImageModelOpen(false)} /> */}

          {data.image ? (
            <Image
              alt="Image"
              height={220}
              width={250}
            //   onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
        {/* <div> {`Seen by ${seenList}`}</div> */}
      </div>
    </div>
  );
};

export default MessageBox;
