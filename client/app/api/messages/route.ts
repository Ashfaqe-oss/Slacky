import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
// import { pusherServer } from '@/app/libs/pusher'
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMesssage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId, //the unique conversation that we are talking about
          },
        },
        sender: {
          connect: {
            id: currentUser.id, //who sent it
          },
        },
        seen: {
          connect: {
            id: currentUser.id, //who has seen it already, the one who sentt it
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    //to be used with pusher
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },

      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMesssage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
            include: {
                seen: true
            }
        }
      }
      
    });

    return NextResponse.json(newMesssage)
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}


interface IParams {
  messageId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
) {
    try {
        const {messageId} = params

        // const currUser = await getCurrentUser()

        // if(!currUser?.id) {
        //     return new NextResponse('unauthorized request', {status: 401})
        // }

        const deletedConversation = await prisma.message.deleteMany({
            where: {
                id: messageId,
                // senderId: currUser.id //tis is why we got current user
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}