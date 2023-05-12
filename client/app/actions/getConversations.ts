import getCurrentUser from "./getCurrentUser";


const getConversations = async () => {
    const currUser = await getCurrentUser();

    if(!currUser?.id) return []

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    }
                }
            }
        })
        // console.log("CONVERSATIONS_liST", conversations)
        return conversations
    } catch(error: any) {
        console.log(error)
        return []
    }
}

export default getConversations