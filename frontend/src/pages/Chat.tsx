import { Axios } from "../services/axios.ts";
import { useEffect, useState } from "react";
import { ChatType } from "../types/index.ts";

const Chat = () => {
  const [chats, setChats] = useState<ChatType[] | null>(null);

  useEffect(() => {
    const getChats = async () => {
      const { data } = await Axios.get("/api/chat");
      console.log(data);
      setChats(data);
    };

    getChats();
  }, []);

  return (
    <div>
      {chats?.map((chat) => (
        <p key={chat._id}>{chat.chatName}</p>
      ))}
    </div>
  );
};

export default Chat;
