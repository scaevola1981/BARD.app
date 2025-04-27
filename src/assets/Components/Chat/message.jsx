import { useState, useEffect } from 'react';
import { db, observeAuthState } from '../../../api/firebase';
import { collection, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import styles from './message.module.css';

const Message = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userAvatars, setUserAvatars] = useState({});

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!chatId || !currentUserId) return;

    const messagesRef = collection(db, 'chat', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);

      // Preia avatarele utilizatorilor
      const avatars = {};
      const userIds = [...new Set(messageList.map((msg) => msg.user))];
      for (const userId of userIds) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          avatars[userId] = userDoc.data().profilePicture || 'avatar-placeholder.png';
        } else {
          avatars[userId] = 'avatar-placeholder.png';
        }
      }
      setUserAvatars(avatars);
    });

    return () => unsubscribe();
  }, [chatId, currentUserId]);

  return (
    <div className={styles.messages}>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.user === currentUserId
                ? styles.messageCurrentUser
                : styles.messageOtherUser
            }`}
          >
            {msg.user === currentUserId && (
              <img
                src={userAvatars[msg.user] || 'avatar-placeholder.png'}
                alt="avatar"
                className={styles.avatar}
              />
            )}
            <div>
              <div
                className={`${styles.text} ${
                  msg.user === currentUserId
                    ? styles.textCurrentUser
                    : styles.textOtherUser
                }`}
              >
                {msg.text}
              </div>
              <div className={styles.timestamp}>
                {msg.timestamp
                  ? new Date(msg.timestamp.toDate()).toLocaleTimeString()
                  : 'acum'}
              </div>
            </div>
            {msg.user !== currentUserId && (
              <img
                src={userAvatars[msg.user] || 'avatar-placeholder.png'}
                alt="avatar"
                className={styles.avatar}
              />
            )}
          </div>
        ))
      ) : (
        <div className={styles.noMessages}>Niciun mesaj încă.</div>
      )}
    </div>
  );
};

export default Message;