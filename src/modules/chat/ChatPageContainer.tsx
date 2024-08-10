import { Stack } from "tamagui";
import { colors } from "../../theme";
import ChatWidget from "./ChatWidget";
import ChatSearch from "./ChatSearch";

export const ChatPageContainer = () => {
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
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Kunwar"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Arogya"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
    </Stack>
  );
};
