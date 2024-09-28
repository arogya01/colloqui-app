


export type Message = {
    conversationId: number,
    createdAt: string,
    id: number,
    media: {
        id: number,
        messageId: number,
        thumbnail: string | null,
        type: string,
        value: string
    },
    senderId: number
}; 

export const transformMessages = (message: Message[]) => {
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