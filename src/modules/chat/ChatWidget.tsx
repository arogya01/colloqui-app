import React from "react";
import { XStack, YStack, Avatar, Text, styled } from "tamagui";
import { colors } from "../../theme";
import { Check } from "@tamagui/lucide-icons";

type ChatWidgetProps = {
  avatarUrl: string;
  name: string;
  message: string;
  timestamp: string;
};

const ChatWidget = ({
  avatarUrl,
  name,
  message,
  timestamp,
}: ChatWidgetProps) => {
  return (
    <XStack
      padding="$3"
      backgroundColor={colors.notQuiteBlack}
      alignItems="center"
    >
      {/* <Avatar circular size="$4" backgroundColor="$purple300">
        <Avatar.Image src={avatarUrl} />
        <Avatar.Fallback backgroundColor="$purple300" />
      </Avatar> */}

      <YStack flex={1}>
        <Text color="white" fontSize="$4" fontWeight="bold">
          {name}
        </Text>
        <XStack alignItems="center">
          {/* <Check size={12} color="$gray400" /> */}
          <Text color="white" fontSize="$2" flex={1} numberOfLines={1}>
            You: {message}
          </Text>
        </XStack>
      </YStack>

      <XStack alignItems="center" space="$2">
        <Text color="white" fontSize="$1">
          {timestamp}
        </Text>
        {/* <Edit2 size={14} color="$gray500" /> */}
      </XStack>
    </XStack>
  );
};

export default ChatWidget;
