import { Text, XStack, YStack } from "tamagui";
import { ChatMessage } from "../../../types";
import { colors } from "../../../theme";

export const MessageBubble = ({
  message,
  isUser,
}: {
  message: ChatMessage;
  isUser: boolean;
}) => {
  return (
    <XStack
      justifyContent={isUser ? "flex-end" : "flex-start"}
      marginVertical={4}
      paddingHorizontal={16}
      background={colors.notQuiteBlack}
    >
      <YStack
        backgroundColor={isUser ? colors.primary : colors.lightGray}
        borderRadius={15}
        padding={10}
        maxWidth="100%"
      >
        <Text color={isUser ? colors.primaryWhite : colors.primaryBlack}>
          {message?.media?.value}
        </Text>
        <Text
          color={isUser ? colors.primaryWhite : colors.primaryBlack}
          fontSize={10}
          opacity={0.7}
          marginTop={2}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </YStack>
    </XStack>
  );
};
