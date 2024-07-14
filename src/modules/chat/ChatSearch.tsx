import { Stack } from "tamagui";
import TextField from "../../components/TextField";

const ChatSearch = () => {
  return (
    <Stack>
      <TextField borderRadius="$8" placeholder="Search..." />
    </Stack>
  );
};

export default ChatSearch;
