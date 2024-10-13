import React from "react";
import { XStack, YStack, Text, styled, Image } from "tamagui";
import { colors } from "../../../theme";
import AvatarImg from "../../../../assets/avatar.png";
import { RenderConversationType } from "../../../utils/dataFilterFn";
import { useGetProfile } from "../../../hooks/services/useGetProfile";



const ChatWidget = (props: RenderConversationType) => {
  const {name, lastMessage} = props; 
  const {media,  senderId} = lastMessage || {};
  const {data : {userId = '' }  = {}} = useGetProfile();
  const {value} = media || {};
  const isMessageFromUser = userId === senderId;
  return (
    <XStack
      padding="$3"
      backgroundColor={colors.notQuiteBlack}
      alignItems="center"
    >
      <XStack marginRight="$3">
      <Image source={AvatarImg} width={40} height={40} />
      </XStack>
      <YStack flex={1}>
        <Text color="white" fontSize="$4" fontWeight="bold">
          {name}
        </Text>
        <XStack alignItems="center">
          {/* <Check size={12} color="$gray400" /> */}
          <Text color="white" fontSize="$2" flex={1} numberOfLines={1}>
            {isMessageFromUser ? "You" : name} : {value}
          </Text>
        </XStack>
      </YStack>

      {/* <XStack alignItems="center" space="$2">
        <Text color="white" fontSize="$1">
          {timestamp}
        </Text>
      </XStack> */}
    </XStack>
  );
};

export default ChatWidget;