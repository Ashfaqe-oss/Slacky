import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher'
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      title,
      content,
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // console.log("not3es" , currentUser.id)
    const newNote = await prisma.note.create({
      data: {
        content: content,
        title: title,
        owner: {
          connect: { id: currentUser.id }
        },
      }
    });

    
    // const updatedConversation = await prisma.conversation.update({
    //   where: {
    //     id: ownerId
    //   },
    //   data: {
    //     lastMessageAt: new Date(),
    //     messages: {
    //       connect: {
    //         id: newMessage.id
    //       }
    //     }
    //   },
    //   include: {
    //     users: true,
    //     messages: {
    //       include: {
    //         seen: true
    //       }
    //     }
    //   }
    // });

    // await pusherServer.trigger(conversationId, 'messages:new', newMessage); //ID, key to trigger update, new mesg
    // //adds new msg in real time

    // const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    // //have to update for all the users right?
    // updatedConversation.users.map((user) => {
    //   pusherServer.trigger(user.email!, 'conversation:update', {
    //     id: conversationId,
    //     messages: [lastMessage]
    //   });
    // });

    return NextResponse.json(newNote)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }
}

