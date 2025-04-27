import { useState, useEffect } from 'react';
import { db, observeAuthState } from '../../../api/firebase';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import styles from './chats.module.css';

const Chats = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userData, setUserData] = useState({});

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
    if (!currentUserId) return;

    const unsubscribe = onSnapshot(collection(db, 'chat'), async (snapshot) => {
      const chatList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((chat) => chat.users.includes(currentUserId));

      setChats(chatList);

      const data = {};
      for (const chat of chatList) {
        const otherUserId = chat.users.find((uid) => uid !== currentUserId);
        const userDocRef = doc(db, 'users', otherUserId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userInfo = userDoc.data();
          data[otherUserId] = {
            name: `${userInfo.firstName} ${userInfo.lastName}`,
            profilePicture: userInfo.profilePicture || 'avatar-placeholder.png',
          };
        } else {
          data[otherUserId] = {
            name: 'Utilizator necunoscut',
            profilePicture: 'avatar-placeholder.png',
          };
        }
      }
      setUserData(data);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return (
    <div className={styles.chats}>
      {chats.map((chat) => {
        const otherUserId = chat.users.find((uid) => uid !== currentUserId);
        return (
          <div
            key={chat.id}
            className={styles.chatItem}
            onClick={() => onSelectChat(chat.id)}
          >
            <img
              src={userData[otherUserId]?.profilePicture || 'avatar-placeholder.png'}
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>
                {userData[otherUserId]?.name || 'Chat'}
              </div>
              <div className={styles.lastMessage}>{chat.text || 'Niciun mesaj'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;