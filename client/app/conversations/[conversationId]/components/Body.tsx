"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/app/libs/pusher";
import axios from "axios";
import { find } from "lodash";
interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  //for user to scroll down n up
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  //PUSHER CODE
  useEffect(() => {
    //client subscription to conversationId
    pusherClient.subscribe(conversationId);
    //to scroll to last
    bottomRef?.current?.scrollIntoView();


    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      console.log('sent seen')

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          // console.log(current)
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            // console.log(newMessage)
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    const deleteMessageHandler = (newMessage: string) => {
      //remove the deleted message from the list
      setMessages((current) => {
        // console.log(current);
        return [...current.filter((msg) => msg.id !== newMessage)];
      });
      // console.log(messages)
    };
    // console.log(messages)


    //bind client to expect message //messagehandler is to update 
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    pusherClient.bind('messages:delete', deleteMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      pusherClient.unbind('messages:delete', deleteMessageHandler);

    };
  }, [conversationId, messages]);

  return (
    <div className="flex-1 h-80 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-8" ref={bottomRef} />
    </div>
  );
};

export default Body;
