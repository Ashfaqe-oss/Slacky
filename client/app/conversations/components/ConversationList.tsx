"use client";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModel";
import { User } from "@prisma/client";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
interface conversationListProps {
  initialItems: FullConversationType[];
  title: string;
  users: User[];
}

const ConversationList: React.FC<conversationListProps> = ({
  initialItems,
  title,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const session = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(initialItems)
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        // console.log(current);
        // console.log(conversation)
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:left-20 
          lg:w-80 
          lg:block
          overflow-y-auto 
          border-r 
          border-gray-200 
  `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">{title}</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
            rounded-full 
            p-2 
            bg-gray-100 
            text-gray-600 
            cursor-pointer 
            hover:opacity-75 
            transition
          "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
