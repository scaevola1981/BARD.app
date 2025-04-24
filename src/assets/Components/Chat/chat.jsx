// Chat.jsx
import { useState } from 'react';
import { auth } from '@/api/firebase'; // ✅ import auth
import { createOrGetChat } from '../../../api/createNewChat'; // ✅ import funcție
import UsersList from '../UsersList/usersList'; // ✅ import componentă
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
          <UsersList
            onSelectUser={async (selectedUser) => {
              const chatId = await createOrGetChat(
                auth.currentUser.uid,
                selectedUser.uid
              );
              setSelectedChat(chatId);
            }}
          />
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

