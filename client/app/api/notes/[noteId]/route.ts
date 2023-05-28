import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import prisma from "@/app/libs/prismadb";

interface IParams {
  noteId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { noteId } = params;
      // console.log(noteId)

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMessage = await prisma.note.findUnique({
      where: {
        id: noteId,
      }
    });

    if (!existingMessage) {
      return new NextResponse("Message not found", { status: 404 });
    }


    const deletedMessage = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    // await pusherServer.trigger(noteId, "notes:delete", noteId);

    return NextResponse.json(deletedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_DELETION");
    return new NextResponse("Error", { status: 500 });
  }
}

export async function POST (
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    const { noteId } = params;

    const body = await request.json();
    const {
      title,
      content,
      ownerId
    } = body;

    if (!currentUser?.id || !currentUser?.email || ownerId !== currentUser.id ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMessage = await prisma.note.findUnique({
      where: {
        id: noteId,
      }
    });

    if (!existingMessage) {
      return new NextResponse("Message not found", { status: 404 });
    }

    const updatedMessage = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: content,
        title: title,
        owner: {
          connect: { id: currentUser.id }
        },
      }
    });

    // await pusherServer.trigger(noteId, "notes:update", noteId);

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_DELETION");
    return new NextResponse("Error", { status: 500 });
  }
}