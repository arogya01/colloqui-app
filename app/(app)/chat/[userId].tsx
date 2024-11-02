import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import { XStack, YStack, Text, Input, Stack } from "tamagui";
import { useSocketContext } from "../../../src/hooks/useSocketContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetProfile } from "../../../src/hooks/services/useGetProfile";
import { FallbackUI } from "../../../src/modules/chat/components/FallbackUI";
import { MessageBubble } from "../../../src/modules/chat/components/MessageBubble";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../../src/theme";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { data: { userId = "" } = {} } = useGetProfile();
  const {
    createConversations,
    currConversation,
    fetchMessages,
    createMessage,
  } = useSocketContext();
  const router = useRouter();
  const local = useLocalSearchParams();
  const { conversationId, userId: participantUserId, participantName } = local;
  const scrollViewRef = useRef();

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    // Populate chats with messages from currConversation when it changes
    if (currConversation && currConversation?.length > 0) {
      setChats(currConversation);
    }
  }, [currConversation]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    if (chats.length === 0) {
      createConversations({
        participants: [Number(userId), Number(participantUserId)],
        message: {
          senderId: Number(userId),
          value: message,
          valueType: "TEXT",
        },
        groupName: "",
      });
    } else {
      createMessage({
        conversationId,
        senderId: Number(userId),
        message,
      });
    }
    setMessage("");
  };

  return (
    <Stack height="100%" backgroundColor={colors.notQuiteBlack}>
      <YStack
        justifyContent="space-between"
        height="100%"
        background={colors.primaryBlack}
      >
        <XStack
          width="100%"
          height={60}
          backgroundColor={colors.primary}
          alignItems="center"
          paddingHorizontal={10}
        >
          <FontAwesome
            size={14}
            color={colors.primaryWhite}
            name="chevron-left"
            marginHorizontal="$2"
            onPress={() => router.back()}
          />
          <Text marginLeft="$2" color={colors.primaryWhite} fontSize={18}>
            {participantName}
          </Text>
        </XStack>

        {/* Chat messages area or Fallback UI */}
        <YStack flex={1} backgroundColor={colors.primaryBlack}>
          {chats.length > 0 ? (
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {chats.map((chat) => (
                <MessageBubble
                  key={chat.id}
                  message={chat}
                  isUser={chat.senderId === Number(userId)}
                />
              ))}
            </ScrollView>
          ) : (
            <FallbackUI />
          )}
        </YStack>

        {/* Chat input - Always at the bottom */}
        <XStack
          height={60}
          backgroundColor={colors.notQuiteBlack}
          alignItems="center"
          paddingHorizontal={10}
          borderTopWidth={1}
          borderTopColor={colors.primary}
        >
          <Input
            flex={1}
            value={message}
            onChangeText={setMessage}
            borderRadius="$8"
            paddingHorizontal="$4"
            placeholder="Type a message..."
            placeholderTextColor={colors.primaryWhite}
            color={colors.primaryWhite}
            marginRight="$2"
          />
          <FontAwesome
            size={20}
            name="paper-plane"
            onPress={sendMessage}
            color={colors.primaryWhite}
          />
        </XStack>
      </YStack>
    </Stack>
  );
};

export default MessagePage;
