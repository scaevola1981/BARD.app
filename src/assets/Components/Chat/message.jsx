import { useState, useEffect, useRef } from 'react';
import { db, auth, observeAuthState } from '../../../api/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import styles from './message.module.css';

const Message = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(auth.currentUser?.uid || null);
  const [userAvatars, setUserAvatars] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUserId(auth.currentUser.uid);
    }
    const unsubscribe = observeAuthState((user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!chatId || !currentUserId || !auth.currentUser) return;

    const messagesRef = collection(db, 'chat', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const messageList = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));
        setMessages(messageList);

        // Preia avatarele utilizatorilor
        const avatars = {};
        const userIds = [...new Set(messageList.map((msg) => msg.user))];
        for (const userId of userIds) {
          if (userId === 'support_bot') {
            avatars[userId] = '/foto-icons/logo-6-app-exvero.png';
            continue;
          }

          try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              avatars[userId] =
                userDoc.data().profilePicture || '/foto-icons/stock-logo.jpg';
            } else {
              avatars[userId] = '/foto-icons/stock-logo.jpg';
            }
          } catch {
            avatars[userId] = '/foto-icons/stock-logo.jpg';
          }
        }
        setUserAvatars(avatars);
      },
      (error) => {
        console.warn('Messages snapshot warning:', error.code || error.message);
      }
    );

    return () => unsubscribe();
  }, [chatId, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageTime = (ts) => {
    if (!ts) return 'acum';
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'acum';
    }
  };

  return (
    <div className={styles.messages}>
      {messages.length > 0 ? (
        messages.map((msg) => {
          const isMe = msg.user === currentUserId;

          return (
            <div
              key={msg.id}
              className={`${styles.message} ${
                isMe ? styles.messageCurrentUser : styles.messageOtherUser
              }`}
            >
              {!isMe && (
                <img
                  src={userAvatars[msg.user] || '/foto-icons/stock-logo.jpg'}
                  alt="avatar"
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.src = '/foto-icons/stock-logo.jpg';
                  }}
                />
              )}
              <div className={styles.bubbleContainer}>
                <div
                  className={`${styles.text} ${
                    isMe ? styles.textCurrentUser : styles.textOtherUser
                  }`}
                >
                  {msg.text}
                </div>
                <div className={styles.timestamp}>
                  {formatMessageTime(msg.timestamp)}
                </div>
              </div>
              {isMe && (
                <img
                  src={userAvatars[msg.user] || '/foto-icons/stock-logo.jpg'}
                  alt="avatar"
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.src = '/foto-icons/stock-logo.jpg';
                  }}
                />
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.noMessages}>
          <span>👋 Niciun mesaj încă. Scrie primul mesaj!</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Message;