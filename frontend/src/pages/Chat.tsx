import { Axios } from "../services/axios.ts";
import { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    const getChats = async () => {
      const { data } = await Axios.get("/api/chat");

      console.log(data);
    };

    getChats();
  }, []);

  return <div>Chat</div>;
};

export default Chat;
