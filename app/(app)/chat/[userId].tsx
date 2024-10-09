import React, { useState, useRef, useEffect } from "react";
import {  ScrollView, } from "react-native";
import { XStack, YStack, Text, Input, Button, Stack } from "tamagui";
import { useSocketContext } from "../../../src/hooks/useSocketContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetProfile } from "../../../src/hooks/services/useGetProfile";
import { Message } from "../../../src/utils/dataFilterFn";

const colors = {
  primary: "#7289DA",
  primaryBlack: "#2C2F33",
  primaryWhite: "#FFFFFF",
  crimson: "#DC143C",
  tomato: "#FF6347",
  notQuiteBlack: "#212121",
  lightGray: "#D3D3D3",
};

const MessageBubble = ({ message, isUser }: {message: Message, isUser:boolean}) => (
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

const FallbackUI = () => (
  <YStack background={colors.primaryBlack} flex={1} justifyContent="center" alignItems="center">
    <Text color={colors.primaryWhite} fontSize={18} textAlign="center">
      No messages yet.{"\n"}Start the conversation!
    </Text>
  </YStack>
);

const MessagePage = ({ chatPartner = "Maa" }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const {data : {userId = '' }  = {}} = useGetProfile();
  console.log('userId from profile',userId);
  const { createConversations, currConversation , fetchMessages, createMessage } = useSocketContext();
  const router = useRouter();
  const local = useLocalSearchParams(); 
  const {conversationId, participantUserId} = local; 
  console.log({local});
  const scrollViewRef = useRef();

  console.log("currConversation", chats);

  useEffect(()=>{
    if(conversationId){
      fetchMessages(conversationId); 
    }
  },[conversationId])

  useEffect(() => {
    // Populate chats with messages from currConversation when it changes
    if (currConversation && currConversation?.length > 0) {
      setChats(currConversation);
    }
  }, [currConversation]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    console.log('currConversation',currConversation); 
    if(chats.length === 0){
      createConversations({
        participants: [Number(userId), Number(participantUserId)],
        message: {
          senderId: Number(userId),
          value: message,
          valueType: "TEXT",
        },
        groupName: "",
      });
    }
    else{
      createMessage({        
    conversationId, 
    senderId: Number(userId),
    value: message,
      })
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
              {chats.map((chat:Message) => (
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
