import { useEffect, useState } from 'react';
import { db, auth, observeAuthState } from '../../../api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { createOrGetChat } from '../../../api/createNewChat';
import styles from './search.module.css';

const Search = ({ onChatSelect }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser);
    }
    const unsubscribe = observeAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser || !auth.currentUser) return;

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const fetchedUsers = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.id !== currentUser.uid);

        // Dacă nu mai sunt alți utilizatori în baza de date, adăugăm suportul oficial BARD
        const allUsers = [...fetchedUsers];
        allUsers.push({
          id: 'support_bot',
          firstName: 'BARD',
          lastName: 'Asistență',
          email: 'suport@bard.app',
          profilePicture: '/foto-icons/logo-6-app-exvero.png',
        });

        setUsers(allUsers);
      } catch (err) {
        console.warn('Utilizatorii nu au putut fi preluați din Firestore:', err);
        // Fallback contact
        setUsers([
          {
            id: 'support_bot',
            firstName: 'BARD',
            lastName: 'Asistență',
            email: 'suport@bard.app',
            profilePicture: '/foto-icons/logo-6-app-exvero.png',
          },
        ]);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleUserClick = async (user) => {
    if (!currentUser || !auth.currentUser) {
      alert('Trebuie să fii autentificat pentru a începe o conversație.');
      return;
    }
    try {
      const chatTitle = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Conversație';
      const chatId = await createOrGetChat(currentUser.uid, user.id, chatTitle);
      onChatSelect(chatId);
    } catch (err) {
      console.warn('Nu s-a putut deschide conversația:', err);
      alert('Eroare la deschiderea conversației.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
              onClick={() => handleUserClick(user)}
            >
              <img
                src={user.profilePicture || '/foto-icons/stock-logo.jpg'}
                alt="avatar"
                className={styles.avatar}
                onError={(e) => {
                  e.target.src = '/foto-icons/stock-logo.jpg';
                }}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{`${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Utilizator'}</span>
                {user.id === 'support_bot' && (
                  <span className={styles.botBadge}>Oficial</span>
                )}
              </div>
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
