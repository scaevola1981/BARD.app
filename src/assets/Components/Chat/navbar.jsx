import { useState, useEffect } from 'react';
import { auth, db, observeAuthState } from '../../../api/firebase';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import styles from './navbar.module.css';

const Navbar = ({ chatId }) => {
  const [chatInfo, setChatInfo] = useState({
    name: 'Conversație',
    profilePicture: '/foto-icons/stock-logo.jpg',
  });
  const [currentUserId, setCurrentUserId] = useState(auth.currentUser?.uid || null);

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

    const chatRef = doc(db, 'chat', chatId);
    const unsubscribe = onSnapshot(
      chatRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const members = Array.isArray(data.users)
            ? data.users
            : Array.isArray(data.participants)
            ? data.participants
            : [];
          const otherUserId = members.find((uid) => uid !== currentUserId);

          if (otherUserId === 'support_bot') {
            setChatInfo({
              name: 'BARD Asistență',
              profilePicture: '/foto-icons/logo-6-app-exvero.png',
            });
            return;
          }

          let partnerName = data.name || 'Conversație';
          let partnerPic = '/foto-icons/stock-logo.jpg';

          if (otherUserId) {
            try {
              const userDocRef = doc(db, 'users', otherUserId);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const uData = userDoc.data();
                partnerName =
                  `${uData.firstName || ''} ${uData.lastName || ''}`.trim() ||
                  uData.email ||
                  'Utilizator';
                partnerPic = uData.profilePicture || '/foto-icons/stock-logo.jpg';
              }
            } catch {
              // Continuăm cu valorile implicite
            }
          }

          setChatInfo({
            name: partnerName,
            profilePicture: partnerPic,
          });
        }
      },
      (error) => {
        console.warn('Navbar snapshot warning:', error.code || error.message);
      }
    );

    return () => unsubscribe();
  }, [chatId, currentUserId]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.partnerInfo}>
        <img
          src={chatInfo.profilePicture}
          alt="avatar"
          className={styles.partnerAvatar}
          onError={(e) => {
            e.target.src = '/foto-icons/stock-logo.jpg';
          }}
        />
        <div>
          <div className={styles.chatTitle}>{chatInfo.name}</div>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span>Activ acum</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;