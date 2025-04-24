// Message.jsx
import { useState, useEffect } from 'react';
import { db } from '@/api/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import styles from './message.module.css';

const Message = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chat', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <div className={styles.messages}>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.user === 'current' ? styles.messageCurrentUser : styles.messageOtherUser
            }`}
          >
            {msg.user === 'current' && (
              <img src="avatar-placeholder.png" alt="avatar" className={styles.avatar} />
            )}
            <div>
              <div
                className={`${styles.text} ${
                  msg.user === 'current' ? styles.textCurrentUser : styles.textOtherUser
                }`}
              >
                {msg.text}
              </div>
              <div className={styles.timestamp}>
                {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString() : 'just now'}
              </div>
            </div>
            {msg.user === 'other' && (
              <img src="avatar-placeholder.png" alt="avatar" className={styles.avatar} />
            )}
          </div>
        ))
      ) : (
        <div>No messages yet</div>
      )}
    </div>
  );
};

export default Message;