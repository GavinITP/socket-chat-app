import { Axios } from "../services/axios.ts";
import { useEffect, useState } from "react";
import { ChatType } from "../types/index.ts";
import Navbar from "../components/Navbar.tsx";

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
      <Navbar />
      {chats?.map((chat) => (
        <p key={chat._id}>{chat.chatName}</p>
      ))}
    </div>
  );
};

export default Chat;
