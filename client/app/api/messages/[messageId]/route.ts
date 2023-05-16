import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import prisma from "@/app/libs/prismadb";

interface IParams {
  messageId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { messageId } = params;
    //   console.log(messageId)

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMessage = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        conversation: true,
      },
    });

    if (!existingMessage) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const conversationId = existingMessage.conversation.id;

    const deletedMessage = await prisma.message.delete({
      where: {
        id: messageId,
        // sender: {
        //   id:  [currentUser.id] // only people belonging to that conversation can delete the group or chat
        // }, //tis is why we got current user
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    await pusherServer.trigger(conversationId, "messages:delete", messageId);

    return NextResponse.json(deletedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_DELETION");
    return new NextResponse("Error", { status: 500 });
  }
}

//   await pusherServer.trigger(conversationId, "messages:delete", messageId);

//   const contextConversation = await prisma.conversation.findUnique({
//     where: {
//       id: conversationId,
//     },
//   });

//   // Trigger conversation:remove event for each userId in the conversation
//   contextConversation.userIds.forEach((userId) => {
//     if (userId !== currentUser.id) {
//       const userEmail = getUserEmailById(userId); // Implement a function to get the user email by their ID
//       if (userEmail) {
//         pusherServer.trigger(userEmail, "conversation:remove", conversation);
//       }
//     }
//   });
