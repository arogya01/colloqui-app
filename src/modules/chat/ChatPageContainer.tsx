import { Stack, Text } from "tamagui";
import { colors } from "../../theme";
import TextField from "../../components/TextField";
import ChatWidget from "./ChatWidget";

export const ChatPageContainer = () => {
  return (
    <Stack height="100%" backgroundColor={colors.notQuiteBlack}>
      <Stack>
        <TextField borderRadius="$8" placeholder="Search..." />
      </Stack>

      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Mine"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
    </Stack>
  );
};
