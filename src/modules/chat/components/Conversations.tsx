import { Button, Stack } from "tamagui";
import { colors } from "../../../theme";
import ChatWidget from "../ChatWidget";
import ChatSearch from "../ChatSearch";
import { useEffect } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";
import { useRouter } from "expo-router";

const Conversations = () => {

const { conversations, fetchConversations } = useSocketContext();
const router = useRouter(); 

  useEffect(() => {
    // Fetch conversations when the component mounts
    fetchConversations();
  }, [fetchConversations]);

  console.log('conversations',conversations);
  return (
    <Stack height="100%" backgroundColor={colors.notQuiteBlack}>
      <ChatSearch />
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Mine"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
      <ChatWidget
        avatarUrl="https://example.com/avatar.jpg"
        name="Kartik"
        message="https://youtu.be/rc_zVAS..."
        timestamp="Yesterday"
      />
      <Button style={{marginTop:'auto', backgroundColor:"red"}} onPress={()=>{console.log('hey');
      router.push({ pathname : `/chat/10`, params: {
        id:1, 
        userName:"arogyanw12",
        email:"arogyanew@gmail.com", 
        phoneNumber:"8989123123",
        bio:"imbecile",
        image:"google.com"
      }})      
      }}>Start Conversation with new person</Button>
    </Stack>
  );
};


export default Conversations; 