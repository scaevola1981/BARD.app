// navbar.jsx
import { useState, useEffect } from 'react';
import { db } from '@/api/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';
import styles from './navbar.module.css';

const Navbar = ({ chatId }) => {
  const [chatInfo, setChatInfo] = useState({ name: 'Lama Chat', userName: 'Unknown' });

  useEffect(() => {
    if (!chatId) return;

    const chatRef = doc(db, 'chat', chatId);
    const unsubscribe = onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setChatInfo({
          name: data.name || 'Lama Chat',
          userName: data.name || 'Unknown',
        });
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <nav className={styles.navbar}>
      <div>
        <span className={styles.chatTitle}>Lama Chat</span>
        <span className={styles.userName}>{chatInfo.userName}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.logout}>logout</button>
        <img src="video-icon.png" alt="video" className={styles.icon} />
        <img src="more-icon.png" alt="more" className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;