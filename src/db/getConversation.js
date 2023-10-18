import { ObjectId } from "mongodb";
import { db } from "./db";
import { getUser } from "./getUser";

/*
{
  name: 'My Group',
  _id: ObjectID('xxx'),
  membersIds: ['1223', '2222'],
  members: [{  // need to create this
    name: 'xxxx',
    id: '1223'
  }]
  messages: [{
    _id: Objectxxxx
    postedById: '1223',
    postedBy: { name: 'xxxx', id: '1223' }  // need to create this
    text: 'Hi!',
  }]
}
*/

export const getConversation = async (conversationId) => {
  const conversation = await db
    .getConnection()
    .collection("conversations")
    .findOne({ _id: new ObjectId(conversationId) });

  const members = await Promise.all(
    conversation.memberIds.map((id) => getUser(id))
  );
  const usersForMessages = await Promise.all(
    conversation.messages.map((message) => getUser(message.postedById))
  );

  const populatedMessages = conversation.messages.map((message, i) => ({
    ...message,
    postBy: usersForMessages[i],
  }));

  const populatedConversation = {
    ...conversation,
    members,
    messages: populatedMessages,
  };

  return populatedConversation;
};
