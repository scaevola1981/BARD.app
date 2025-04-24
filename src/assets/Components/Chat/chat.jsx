// Chat.jsx
import { useState } from 'react';
import Header from '../Header/header';
import Chats from './chats';
import Sidebar from './sidebar';
import Input from './input';
import Message from './message';
import Navbar from './navbar';
import Search from './search';
import styles from './chat.module.css';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.chatContainer}>
        <Sidebar className={styles.sidebar}>
          <Search />
          <Chats onChatSelect={setSelectedChat} />
        </Sidebar>
        <div className={styles.mainContent}>
          {selectedChat ? (
            <div className={styles.chatContent}>
              <Navbar chatId={selectedChat} />
              <Message chatId={selectedChat} />
              <Input chatId={selectedChat} />
            </div>
          ) : (
            <div className={styles.placeholder}>Select a chat to start messaging</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;