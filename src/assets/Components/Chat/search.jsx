import { useEffect, useState } from 'react';
import { db, observeAuthState } from '../../../api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { createOrGetChat } from '../../../api/createNewChat';
import styles from './search.module.css';

const Search = ({ onChatSelect }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const fetchedUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser.uid);
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [currentUser]);

  const handleUserClick = async (userId) => {
    if (!currentUser) return;
    const chatId = await createOrGetChat(currentUser.uid, userId);
    onChatSelect(chatId);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Caută un utilizator..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={styles.userItem}
              onClick={() => handleUserClick(user.id)}
            >
              <img
                src={user.profilePicture || 'avatar-placeholder.png'}
                alt="avatar"
                className={styles.avatar}
              />
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>Niciun utilizator găsit.</div>
        )}
      </div>
    </div>
  );
};

export default Search;

