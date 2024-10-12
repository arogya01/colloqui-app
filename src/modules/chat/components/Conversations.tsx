import { Button, Stack } from "tamagui";
import { colors } from "../../../theme";
import { useEffect } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";
import { useRouter } from "expo-router";
import ChatWidget from "../UI/ChatWidget";
import ChatSearch from "../UI/ChatSearch";
import { RenderConversationType } from "../../../utils/dataFilterFn";

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
      {
        conversations?.map((conversation:RenderConversationType) => (
          <ChatWidget key={conversation.id} {...conversation} />
        ))
      }
      {/* <Button style={{marginTop:'auto', backgroundColor:"red"}} onPress={()=>{console.log('hey');
      router.push({ pathname : `/chat/10`, params: {
        conversationId:2     
      }})      
      }}>Start Conversation with new person</Button> */}
    </Stack>
  );
};


export default Conversations; 