
import { ChatConversation , ChatMessage, ChatParticipant} from "../types";


export const transformMessages = (message: ChatMessage[]) => {
    return message.map((message) => {
      const {conversationId, createdAt, id, media, senderId} = message; 
      return {
          conversationId, 
          createdAt, 
          id, 
          media,
          senderId
      }
    }); 
  }

 export type RenderConversationType = {
    id: ChatConversation["id"];
    name: ChatConversation["name"];
    createdAt: ChatConversation["createdAt"];
    updatedAt: ChatConversation["updatedAt"];
    lastMessage: ChatMessage | undefined;
    participants: ChatParticipant[];
  }

export const transformConversations = (conversations: ChatConversation[]): RenderConversationType[] => {
    return conversations.map((conversation) => {
        const {id, name, createdAt, updatedAt, messages, participants} = conversation; 
        return {
            id, 
            name, 
            createdAt, 
            updatedAt, 
            lastMessage: messages?.[messages?.length - 1],
            participants
        }
    })
}