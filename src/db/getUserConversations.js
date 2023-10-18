import { db } from "./db";

export const getUserConversations = async (id) => {
  const conversations = await db
    .getConnection()
    .collection("conversations")
    .find({ memberIds: id })
    .toArray();
  return conversations;
};
