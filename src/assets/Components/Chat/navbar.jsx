import { useState, useEffect } from 'react';
import { auth, db, observeAuthState } from '../../../api/firebase';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import styles from './navbar.module.css';

const Navbar = ({ chatId }) => {
  const [chatInfo, setChatInfo] = useState({ name: 'Chat', userName: 'Unknown' });
  const [currentUserId, setCurrentUserId] = useState(null);

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

    const chatRef = doc(db, 'chat', chatId);
    const unsubscribe = onSnapshot(chatRef, async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const otherUserId = data.users.find((uid) => uid !== currentUserId);
        const userDocRef = doc(db, 'users', otherUserId);
        const userDoc = await getDoc(userDocRef);
        let userName = 'Unknown';
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userName = `${userData.firstName} ${userData.lastName}`;
        }
        setChatInfo({
          name: userName,
          userName: userName,
        });
      }
    });

    return () => unsubscribe();
  }, [chatId, currentUserId]);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('visitedAds');
    window.location.href = '/';
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <span className={styles.chatTitle}>{chatInfo.name}</span>
        <span className={styles.userName}>{chatInfo.userName}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.logout} onClick={handleLogout}>
          Deconectare
        </button>
        <img src="video-icon.png" alt="video" className={styles.icon} />
        <img src="more-icon.png" alt="more" className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;