import { Button, Spinner, Stack } from "tamagui";
import { colors } from "../../../theme";
import { useEffect } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";
import { useRouter } from "expo-router";
import ChatWidget from "../UI/ChatWidget";
import ChatSearch from "../UI/ChatSearch";
import { RenderConversationType } from "../../../utils/dataFilterFn";

const Conversations = () => {
  const { conversations, fetchConversations, isConversationLoading } =
    useSocketContext();
  const router = useRouter();

  useEffect(() => {
    // Fetch conversations when the component mounts
    fetchConversations();
  }, [fetchConversations]);

  if (isConversationLoading) {
    return <Spinner size="large" color={colors.primary} />;
  }

  return (
    <Stack height="100%" backgroundColor={colors.notQuiteBlack}>
      <ChatSearch />
      {conversations?.map((conversation: RenderConversationType) => (
        <ChatWidget key={conversation.id} {...conversation} />
      ))}
    </Stack>
  );
};

export default Conversations;
