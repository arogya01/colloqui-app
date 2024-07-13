import React from "react";
import { XStack, YStack, Avatar, Text, styled } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

const ChatWidget = ({ avatarUrl, name, message, timestamp }) => {
  return (
    <XStack
      backgroundColor="white"
      padding="$2"
      borderRadius="$2"
      alignItems="center"
    >
      {/* <Avatar circular size="$4" backgroundColor="$purple300">
        <Avatar.Image src={avatarUrl} />
        <Avatar.Fallback backgroundColor="$purple300" />
      </Avatar> */}

      <YStack flex={1}>
        <Text color="$gray400" fontSize="$3" fontWeight="bold">
          {name}
        </Text>
        <XStack alignItems="center" space="$1">
          {/* <Check size={12} color="$gray400" /> */}
          <Text color="$gray400" fontSize="$2" flex={1} numberOfLines={1}>
            You: {message}
          </Text>
        </XStack>
      </YStack>

      <XStack alignItems="center" space="$2">
        <Text color="$gray500" fontSize="$1">
          {timestamp}
        </Text>
        {/* <Edit2 size={14} color="$gray500" /> */}
      </XStack>
    </XStack>
  );
};

export default ChatWidget;
