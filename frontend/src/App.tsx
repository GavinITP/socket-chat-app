import { Navigate, Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
