import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data - Bad Request", { status: 400 });
    }

    if (isGroup) {
      const newCoonversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true, //includes the user objects
        },
      });

      return NextResponse.json(newCoonversation);
    }

    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversation[0]

    if(singleConversation) return NextResponse.json(singleConversation)

    const newCoonversation = await prisma.conversation.create({
        data: {
            users: {
                connect: [
                    {
                        id: currentUser.id
                    },
                    {
                        id: userId
                    }
                ]
            }
        },
        include: {
            users: true
        }
    })

    newCoonversation.users.map((user) => {
        if(user.email) {
            pusherServer.trigger(user.email, 'conversation:new', newCoonversation)
        }
    })

    return NextResponse.json(newCoonversation)

  } catch (error: any) {
    console.log("CONVERSATIONS_POST", error);
    return new NextResponse("Internal_error", { status: 500 });
  }
}
