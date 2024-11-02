import React, { useState } from "react";
import {
  Stack,
  XStack,
  YStack,
  Input,
  ScrollView,
  Text,
  styled,
} from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Modal } from "react-native";
import { colors } from "../../../theme";
import { useSearchUser } from "../../../hooks/services/useSearchUser";
import { _debounceTextSearch } from "../../../commonUtils";
import { useRouter } from "expo-router";
import { ChatParticipant } from "@src/types";
const FullScreenInput = styled(Input, {
  flex: 1,
  fontSize: 16,
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  borderRadius: "$8",
  color: colors.primaryWhite,
});

const Option = styled(XStack, {
  paddingVertical: "$4",
  paddingHorizontal: "$6",
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGray,
});

const ChatSearch = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: availableUsers, isLoading = false } = useSearchUser({
    userName: searchTerm,
  });

  const handleFocus = () => {
    console.log("handleFocus");
    setIsFullScreen(true);
  };

  const handleBlur = () => {
    setIsFullScreen(false);
    setSearchTerm("");
  };
  const router = useRouter();
  const onChatWidgetClick = (participantInfo: ChatParticipant) => {
    router.push({
      pathname: `/chat/${participantInfo.id}`,
      params: {
        participantName: participantInfo.userName,
      },
    });
  };

  const renderFullScreenSearch = () => (
    <Modal visible={isFullScreen} animationType="slide">
      <YStack flex={1} backgroundColor={colors.primaryBlack}>
        <XStack gap="$2" alignItems="center" padding="$4">
          {/* <Image source={SearchIcon} width={16} height={16} alt="search" /> */}
          <FullScreenInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search Username..."
            autoFocus
          />
          <FontAwesome
            size={16}
            name="close"
            onPress={handleBlur}
            color={colors.primaryWhite}
          />
        </XStack>
        <ScrollView>
          {Array.isArray(availableUsers)
            ? availableUsers.map((option, index) => (
                <Option onPress={() => onChatWidgetClick(option)} key={index}>
                  <Text>{option.userName}</Text>
                </Option>
              ))
            : null}
        </ScrollView>
      </YStack>
    </Modal>
  );

  return (
    <Stack>
      <XStack alignItems="center">
        {/* <Image source={SearchIcon} width={16} height={16} alt="search" /> */}
        <Input
          borderRadius="$8"
          paddingVertical="$2"
          paddingHorizontal="$4"
          margin="$4"
          width="90%"
          color={colors.primaryWhite}
          placeholder="Search..."
          onChangeText={handleFocus}
          onPressIn={handleFocus}
        />
      </XStack>
      {renderFullScreenSearch()}
    </Stack>
  );
};

export default ChatSearch;
