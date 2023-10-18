import { getUsers } from "../db";

export const getUsersRoute = {
  method: "get",
  path: "/users",
  handler: async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
  },
};
