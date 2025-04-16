import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '../../Components/Header/header';
import styles from './chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    console.log('Current user:', currentUser);
  }, [currentUser]);
  // Monitorizăm starea de autentificare
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Preluăm conversațiile când currentUser se schimbă
  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'conversations'),
          where('participants', 'array-contains', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const conversationsData = [];

        for (const docRef of querySnapshot.docs) {
          const conversation = docRef.data();
          const interlocutorId = conversation.participants.find(
            id => id !== currentUser.uid
          );

          if (interlocutorId) {
            const userDoc = await getDoc(doc(db, 'users', interlocutorId));
            if (userDoc.exists()) {
              conversationsData.push({
                id: docRef.id,
                interlocutorId,
                name: userDoc.data().displayName || userDoc.data().email,
                avatar: userDoc.data().photoURL || '',
                lastMessage: conversation.lastMessage?.text || 'Niciun mesaj',
                unread: conversation.unreadCount || 0,
                timestamp: conversation.lastMessage?.timestamp?.toDate() || null
              });
            }
          }
        }

        conversationsData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setConversations(conversationsData);
        if (conversationsData.length > 0) setActiveConversation(0);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [currentUser]);

  // Preluăm mesajele pentru conversația selectată
  useEffect(() => {
    const fetchMessages = async () => {
      if (activeConversation === null || !conversations[activeConversation]) return;

      try {
        const conversationId = conversations[activeConversation].id;
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        const querySnapshot = await getDocs(messagesRef);

        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }));

        messagesData.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesData);

      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [activeConversation, conversations]);

  const handleSend = async () => {
    if (inputValue.trim() === '' || activeConversation === null || !currentUser) return;

    try {
      const conversationId = conversations[activeConversation].id;
      
      const newMessage = {
        text: inputValue,
        senderId: currentUser.uid,
        timestamp: new Date(),
        read: false
      };

      await addDoc(collection(db, 'conversations', conversationId, 'messages'), newMessage);

      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: newMessage,
        updatedAt: new Date()
      });

      setMessages([...messages, {
        ...newMessage,
        id: Date.now().toString()
      }]);

      setInputValue('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loading}>Se încarcă...</div>
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Header />
        <div className={styles.authMessage}>
          Trebuie să fii autentificat pentru a accesa chat-ul.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.chatPage}>
        {/* Coloana conversații */}
        <div className={styles.conversationsColumn}>
          <h2>Conversații</h2>
          {conversations.length === 0 ? (
            <p className={styles.noConversations}>Nu aveți nicio conversație</p>
          ) : (
            conversations.map((conversation, index) => (
              <div 
                key={conversation.id}
                className={`${styles.conversationItem} ${
                  activeConversation === index ? styles.active : ''
                }`}
                onClick={() => setActiveConversation(index)}
              >
                {conversation.avatar ? (
                  <img 
                    src={conversation.avatar} 
                    alt={conversation.name} 
                    className={styles.userAvatar}
                  />
                ) : (
                  <div className={styles.userAvatar}>
                    {conversation.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{conversation.name}</div>
                  <div className={styles.lastMessage}>
                    {conversation.lastMessage}
                  </div>
                </div>
                {conversation.unread > 0 && (
                  <span className={styles.unreadBadge}>
                    {conversation.unread}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Coloana chat */}
        <div className={styles.chatColumn}>
          {activeConversation !== null ? (
            <>
              <div className={styles.chatHeader}>
                {conversations[activeConversation].name}
              </div>
              
              <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                  <p className={styles.noMessages}>
                    Începeți conversația cu {conversations[activeConversation].name}
                  </p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.senderId === currentUser.uid
                          ? styles.userMessage
                          : styles.otherMessage
                      }`}
                    >
                      <div className={styles.messageBubble}>
                        {message.text}
                        <div className={styles.messageTime}>
                          {message.timestamp?.toLocaleTimeString([], {
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
            <div className={styles.noChatSelected}>
              Selectați o conversație pentru a începe discuția
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;