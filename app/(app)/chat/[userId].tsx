import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import { XStack, YStack, Text, Input, Button, Stack } from "tamagui";
import { useSocketContext } from "../../../src/hooks/useSocketContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetProfile } from "../../../src/hooks/services/useGetProfile";
import { FallbackUI } from "../../../src/modules/chat/components/FallbackUI";
import { MessageBubble } from "../../../src/modules/chat/components/MessageBubble";
import { colors } from "../../../src/theme";

const MessagePage = ({ chatPartner = "Maa" }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { data: { userId = "" } = {} } = useGetProfile();
  console.log("userId from profile", userId);
  const {
    createConversations,
    currConversation,
    fetchMessages,
    createMessage,
  } = useSocketContext();
  const router = useRouter();
  const local = useLocalSearchParams();
  const { conversationId, participantUserId } = local;
  console.log({ local });
  const scrollViewRef = useRef();

  console.log("currConversation", chats);

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
    console.log("currConversation", currConversation);
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
        value: message,
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
          <Button marginHorizontal="$2" onPress={() => router.back()}>
            Go Back
          </Button>
          <Text color={colors.primaryWhite} fontSize={18}>
            {chatPartner}
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
            placeholder="Type a message..."
            placeholderTextColor={colors.primaryWhite}
            color={colors.primaryWhite}
            marginRight={10}
          />
          <Button onPress={sendMessage} backgroundColor={colors.primary}>
            Send
          </Button>
        </XStack>
      </YStack>
    </Stack>
  );
};

export default MessagePage;
