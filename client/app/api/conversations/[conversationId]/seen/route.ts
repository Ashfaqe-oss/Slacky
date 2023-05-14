import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
// import { pusherServer } from '@/app/libs/pusher'
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {

    const currUser = await getCurrentUser()

    const { conversationId } = params
    
    if(!currUser?.id || !currUser?.email) {
        return new Response("Unauthorized", { status: 401 });
    }

    //find the existing connection
    const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId,
        },
        include: {
            messages: {
                include: {
                    seen: true
                }
            },
            users: true
        }
    })

    if(!conversation) {
        return new NextResponse("Not Found - Invalid ID", { status: 400 });
    }


    //of the conversation, get the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if(!lastMessage) {
      return NextResponse.json(conversation)
    }

    //update the last seen message with the user Id of the seen person

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage);

  } catch (error: any) {
    console.log("ERROR_MESSAGES_SEEN", error);
    return new NextResponse("Error", { status: error.status });
  }
}
