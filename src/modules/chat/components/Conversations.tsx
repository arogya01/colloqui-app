import { Stack } from "tamagui";
import { colors } from "../../../theme";
import ChatWidget from "../ChatWidget";
import ChatSearch from "../ChatSearch";
import { useEffect } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";

const Conversations = () => {

const { conversations, fetchConversations } = useSocketContext();

  useEffect(() => {
    // Fetch conversations when the component mounts
    fetchConversations();
  }, [fetchConversations]);

  console.log('conversations',conversations);
  return (
    <Stack height="100%" backgroundColor={colors.notQuiteBlack}>
      <ChatSearch />
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Mine"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Kartik"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
    </Stack>
  );
};


export default Conversations; 