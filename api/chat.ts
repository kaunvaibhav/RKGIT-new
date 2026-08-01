import { handleChatRequest } from "../src/services/chatService";

export default async function handler(req: Request) {
  return handleChatRequest(req);
}
