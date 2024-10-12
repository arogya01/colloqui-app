

export type Media = {
    id: number;
    type: string;
    thumbnail: string | null;
    messageId: number;
    value: string;
  };
  
export type ChatMessage = {
    id: number;
    conversationId: number;
    senderId: number;
    createdAt: string;
    media: Media;
  };
  
 export type ChatConversation = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    messages: ChatMessage[];
  };