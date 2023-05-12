import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | {users: User[]}) => {
    const session = useSession()

    const otherUserMemo = useMemo(() => {
        const currUserEmail = session?.data?.user?.email
        const otherUser = conversation.users.filter((user) => user.email !== currUserEmail)

        return otherUser[0]
    }, [conversation.users, session?.data?.user?.email]);

    return otherUserMemo
}

export default useOtherUser