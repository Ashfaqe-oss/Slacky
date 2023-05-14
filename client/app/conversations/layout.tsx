import getUsers from "../actions/getUsers"
import getConversations from "../actions/getConversations"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    // console.log(conversations)
    const users = await getUsers()

    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div>
                <ConversationList title="Messages" initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}