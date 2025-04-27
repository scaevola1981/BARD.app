
import { useState } from 'react';
import Header from '../Header/header';
import Chats from './chats';
import Sidebar from './sidebar';
import Input from './input';
import Message from './message';
import Navbar from './navbar';
import Search from './search';
import { useTheme } from '../../../api/themeContext';

import styles from './chat.module.css';

const Chat = () => {
  const { theme } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className={`${styles.appContainer} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      <Header />
      <div className={styles.chatContainer}>
        <Sidebar className={styles.sidebar}>
          <Search onChatSelect={setSelectedChat} />
          <Chats onSelectChat={setSelectedChat} />
        </Sidebar>
        <div className={styles.mainContent}>
          {selectedChat ? (
            <div className={styles.chatContent}>
              <Navbar chatId={selectedChat} />
              <Message chatId={selectedChat} />
              <Input chatId={selectedChat} />
            </div>
          ) : (
            <div className={styles.placeholder}>
              Selectează un chat pentru a începe conversația
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;