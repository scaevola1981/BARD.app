import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where, orderBy, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '../../Components/Header/header';
import styles from './chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0]
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch users list
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '!=', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });
        
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Select/create conversation
  const selectUser = async (user) => {
    setSelectedUser(user);
    
    // Generate unique conversation ID between users
    const conversationId = [currentUser.uid, user.uid].sort().join('_');
    
    // Listen for new messages in real-time
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  };

  // Send message
  const handleSend = async () => {
    if (!inputValue.trim() || !selectedUser || !currentUser) return;

    try {
      const conversationId = [currentUser.uid, selectedUser.uid].sort().join('_');
      
      // Create conversation if it doesn't exist
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationSnap = await getDoc(conversationRef);
      
      if (!conversationSnap.exists()) {
        await setDoc(conversationRef, {
          participants: [currentUser.uid, selectedUser.uid],
          createdAt: new Date()
        });
      }

      // Add message
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        text: inputValue,
        senderId: currentUser.uid,
        senderName: currentUser.displayName,
        timestamp: new Date(),
        read: false
      });

      setInputValue('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.chatContainer}>
        {/* Users sidebar */}
        <div className={styles.usersList}>
          <h2>Conversații</h2>
          <div className={styles.usersScroll}>
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.uid}
                  className={`${styles.userItem} ${selectedUser?.uid === user.uid ? styles.selected : ''}`}
                  onClick={() => selectUser(user)}
                >
                  <div className={styles.userAvatar}>
                    {user.displayName?.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{user.displayName}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noUsers}>
                {loading ? 'Se încarcă utilizatori...' : 'Nu s-au găsit utilizatori'}
              </div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={styles.chatArea}>
          {selectedUser ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.userAvatarHeader}>
                  {selectedUser.displayName?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.chatWith}>
                  Conversație cu <strong>{selectedUser.displayName}</strong>
                </div>
              </div>
              
              <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                  <div className={styles.noMessages}>
                    Începeți conversația cu {selectedUser.displayName}
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.senderId === currentUser.uid ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {message.senderId !== currentUser.uid && (
                          <div className={styles.senderName}>{message.senderName}</div>
                        )}
                        <div className={styles.messageText}>{message.text}</div>
                        <div className={styles.messageTime}>
                          {new Date(message.timestamp?.toDate()).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.inputArea}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Scrie un mesaj..."
                  className={styles.chatInput}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className={styles.sendButton}
                  disabled={!inputValue.trim()}
                >
                  Trimite
                </button>
              </div>
            </>
          ) : (
            <div className={styles.selectUserPrompt}>
              Selectează un utilizator pentru a începe conversația
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;

