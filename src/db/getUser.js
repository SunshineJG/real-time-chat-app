import { db } from "./db";

export const getUser = async (id) => {
  const user = await db.getConnection().collection("users").findOne({ id: id });
  return user;
};
