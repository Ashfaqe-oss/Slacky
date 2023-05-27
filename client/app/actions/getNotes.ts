import prisma from "@/app/libs/prismadb";

const getNotes = async (ownerId: string) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: ownerId,
      },
      include: {
        owner: true,
      },
    });

    return notes;
  } catch (error: any) {
    return [];
  }
};

export default getNotes;
