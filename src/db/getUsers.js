import { db } from "./db";

export const getUsers = async () => {
  const users = await db.getConnection().collection("users").find({}).toArray();
  return users;
};
