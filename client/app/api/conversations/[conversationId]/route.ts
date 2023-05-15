import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
// import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
) {
    try {
        const {conversationId} = params

        const currUser = await getCurrentUser()

        if(!currUser?.id) {
            return new NextResponse('untuthorized request', {status: 401})
        }

        //this is mainly to use wiht pusher
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        //this code is to precheck if Conversation exists b4 attempting to delete it

        if(!existingConversation) {
            return new NextResponse('Invalid ID', {status: 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currUser.id] // only people belonging to that conversation can delete the group or chat
                } //tis is why we got current user
            }
        })

        existingConversation.users.forEach((user: { email: any; }) => {
            if (user.email) {
              pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
          });

        return NextResponse.json(deletedConversation)
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}