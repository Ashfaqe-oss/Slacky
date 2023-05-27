import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getNotes from "@/app/actions/getNotes";

interface IdParams {
  conversationId: string;
}

const conversationId = async ({ params }: { params: IdParams }) => {
  console.log(params);

  const currentUser = await getCurrentUser();

  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const notes = await getNotes(currentUser?.id!);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:ml-80 h-screen p-4  rounded-lg">
      <div className="h-full flex flex-col justify-between">
        {/* Conversation id is {params.conversationId} */}
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form notes={notes} />
      </div>
    </div>
  );
};

export default conversationId;
