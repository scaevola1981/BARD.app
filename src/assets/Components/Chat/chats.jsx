import { useState, useEffect } from 'react';
import { db, auth, observeAuthState } from '../../../api/firebase';
import { collection, onSnapshot, doc, getDoc, query, where } from 'firebase/firestore';
import styles from './chats.module.css';

const Chats = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(auth.currentUser?.uid || null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
        setChats([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserId || !auth.currentUser) {
      setChats([]);
      return;
    }

    // Interogare securizată conform regulilor Firestore de producție
    const q = query(
      collection(db, 'chat'),
      where('users', 'array-contains', currentUserId)
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const chatList = snapshot.docs.map((docItem) => {
          const docData = docItem.data();
          const members = Array.isArray(docData.users)
            ? docData.users
            : Array.isArray(docData.participants)
            ? docData.participants
            : [];
          return {
            id: docItem.id,
            ...docData,
            users: members,
          };
        });

        setChats(chatList);

        const data = {};
        for (const chat of chatList) {
          const otherUserId = chat.users.find((uid) => uid !== currentUserId);
          if (!otherUserId) continue;

          if (otherUserId === 'support_bot') {
            data[otherUserId] = {
              name: 'BARD Asistență',
              profilePicture: '/foto-icons/logo-6-app-exvero.png',
            };
            continue;
          }

          try {
            const userDocRef = doc(db, 'users', otherUserId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userInfo = userDoc.data();
              const fullName = `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim();
              data[otherUserId] = {
                name: fullName || userInfo.email || 'Utilizator',
                profilePicture: userInfo.profilePicture || '/foto-icons/stock-logo.jpg',
              };
            } else {
              data[otherUserId] = {
                name: chat.name || 'Conversație',
                profilePicture: '/foto-icons/stock-logo.jpg',
              };
            }
          } catch {
            data[otherUserId] = {
              name: chat.name || 'Conversație',
              profilePicture: '/foto-icons/stock-logo.jpg',
            };
          }
        }
        setUserData((prev) => ({ ...prev, ...data }));
      },
      (error) => {
        console.warn('Chats snapshot notification:', error.code || error.message);
      }
    );

    return () => unsubscribe();
  }, [currentUserId]);

  return (
    <div className={styles.chats}>
      <div className={styles.sectionHeading}>Conversațiile tale</div>
      {chats.length > 0 ? (
        chats.map((chat) => {
          const otherUserId = chat.users.find((uid) => uid !== currentUserId);
          const partner = userData[otherUserId] || {
            name: chat.name || 'Chat',
            profilePicture: '/foto-icons/stock-logo.jpg',
          };

          return (
            <div
              key={chat.id}
              className={styles.chatItem}
              onClick={() => onSelectChat(chat.id)}
            >
              <img
                src={partner.profilePicture || '/foto-icons/stock-logo.jpg'}
                alt="avatar"
                className={styles.avatar}
                onError={(e) => {
                  e.target.src = '/foto-icons/stock-logo.jpg';
                }}
              />
              <div className={styles.chatInfo}>
                <div className={styles.chatName}>{partner.name}</div>
                <div className={styles.lastMessage}>
                  {chat.text || 'Începe conversația...'}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.emptyState}>
          Nu ai nicio conversație încă. Trimite un mesaj din pagina unui anunț sau selectează un contact din căutare!
        </div>
      )}
    </div>
  );
};

export default Chats;