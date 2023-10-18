import { db } from "./db";

export const getUser = async (id) => {
  const users = await db.getConnection().collection("users").find({ id });
  return users;
};
