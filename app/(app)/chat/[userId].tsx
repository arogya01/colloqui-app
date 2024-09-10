import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { XStack, YStack, Text, Input, Button } from "tamagui";
import { useSocketContext } from "../../../src/hooks/useSocketContext";
import { useSession } from "../../../src/hooks/useSession";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  primary: "#7289DA",
  primaryBlack: "#2C2F33",
  primaryWhite: "#FFFFFF",
  crimson: "#DC143C",
  tomato: "#FF6347",
  notQuiteBlack: "#212121",
  lightGray: "#D3D3D3",
};

const MessageBubble = ({ message, isUser }) => (
  <XStack
    justifyContent={isUser ? "flex-end" : "flex-start"}
    marginVertical={5}
    paddingHorizontal={10}
    background={colors.notQuiteBlack}
  >
    <YStack
      backgroundColor={isUser ? colors.primary : colors.lightGray}
      borderRadius={15}
      padding={10}
      maxWidth="80%"
    >
      <Text color={isUser ? colors.primaryWhite : colors.primaryBlack}>
        {message.media.value}
      </Text>
      <Text
        color={isUser ? colors.primaryWhite : colors.primaryBlack}
        fontSize={10}
        opacity={0.7}
        marginTop={5}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </YStack>
  </XStack>
);

const FallbackUI = () => (
  <YStack flex={1} justifyContent="center" alignItems="center">
    <Text color={colors.primaryWhite} fontSize={18} textAlign="center">
      No messages yet.{"\n"}Start the conversation!
    </Text>
  </YStack>
);

const MessagePage = ({ chatPartner = "Maa" }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      id: 6,
      conversationId: 3,
      senderId: 22,
      createdAt: "2024-09-09T14:05:32.942Z",
      media: {
        id: 6,
        type: "TEXT",
        thumbnail: null,
        messageId: 6,
        value: "lol too",
      },
    },
  ]); // This will be populated with chat messages
  const { userId } = useSession();
  const { createConversations, currConversation } = useSocketContext();
  const router = useRouter();

  const scrollViewRef = useRef();

  console.log("currConversation", chats);

  useEffect(() => {
    // Populate chats with messages from currConversation when it changes
    if (currConversation && currConversation.messages) {
      setChats(currConversation.messages);
    }
  }, [currConversation]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    createConversations({
      participants: [Number(userId), Number(22)],
      message: {
        senderId: Number(userId),
        value: message,
        valueType: "TEXT",
      },
      groupName: "",
    });

    setMessage("");
  };

  return (
    <SafeAreaView>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      > */}
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor={colors.primaryBlack}
      >
        {/* Header */}
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
        <YStack width="100%" height={20} backgroundColor={colors.primaryBlack}>
          <Text>lols</Text>
        </YStack>
        <YStack backgroundColor={colors.primaryBlack} height={120} flex={1}>
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
          <Button onPress={sendMessage} backgroundColor={colors.primary}>
            Send
          </Button>
          <Text color={colors.primaryBlack}>
            Hey man, where the fuck are you??
          </Text>
        </YStack>

        {/* Chat input - Always at the bottom */}
        {/* <XStack
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
          </XStack> */}
      </YStack>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default MessagePage;
