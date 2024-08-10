import { Stack } from "tamagui";
import TextField from "../../components/TextField";
import { colors } from "../../theme";

const ChatSearch = () => {
  return (
    <Stack>
      <TextField
        backgroundColor={colors.primaryWhite}
        borderRadius="$8"
        padding="$4"
        margin="$2"
        color={colors.primaryBlack}
        placeholder="Search..."
      />
    </Stack>
  );
};

export default ChatSearch;
