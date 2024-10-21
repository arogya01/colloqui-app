import { Text, YStack } from "tamagui";
import { colors } from "../../../theme";

export const FallbackUI = () => (
  <YStack
    background={colors.primaryBlack}
    flex={1}
    justifyContent="center"
    alignItems="center"
  >
    <Text color={colors.primaryWhite} fontSize={18} textAlign="center">
      No messages yet.{"\n"}Start the conversation!
    </Text>
  </YStack>
);
