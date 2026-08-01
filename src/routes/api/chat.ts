import { createAPIFileRoute } from "@tanstack/react-start/api";
import { handleChatRequest } from "../../services/chatService";

export const APIRoute = createAPIFileRoute("/api/chat")({
  POST: async ({ request }) => {
    return handleChatRequest(request);
  },
});
