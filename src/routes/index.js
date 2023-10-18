import { getUserConversationsRoute } from "./getUserConversationsRoute";
import { getUsersRoute } from "./getUsersRoute";
import { createConversationRoute } from "./createConversationRoute";

export { protectRoute } from "./protectRoute";

export const routes = [
  getUserConversationsRoute,
  createConversationRoute,
  getUsersRoute,
];
