import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/api/firebase';
import { createOrGetChat } from '@/api/createNewChat';

import styles from './search.module.css';

const Search = ({ onChatSelect }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const fetchedUsers = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUser.uid);
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [currentUser]);

  const handleUserClick = async (userId) => {
    if (!currentUser) return;
    const chatId = await createOrGetChat(currentUser.uid, userId);
    onChatSelect(chatId);
  };

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Find a user..." className={styles.searchInput} />
      <div className={styles.userList}>
        {users.map(user => (
          <div key={user.id} className={styles.userItem} onClick={() => handleUserClick(user.id)}>
            <img src="avatar-placeholder.png" alt="avatar" className={styles.avatar} />
            <span>{user.name || user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

