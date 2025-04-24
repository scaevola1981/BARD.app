// Chats.jsx
import { useState, useEffect } from 'react';
import { db } from '@/api/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import styles from './chats.module.css';

const Chats = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chat'), (snapshot) => {
      const chatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.chats}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={styles.chatItem}
          onClick={() => onChatSelect(chat.id)}
        >
          <img src="avatar-placeholder.png" alt="avatar" className={styles.avatar} />
          <div className={styles.chatInfo}>
            <div className={styles.chatName}>{chat.name}</div>
            <div className={styles.lastMessage}>{chat.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;