import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import Chats from './chats';
import Sidebar from './sidebar';
import Input from './input';
import Message from './message';
import Navbar from './navbar';
import Search from './search';
import { auth, observeAuthState } from '../../../api/firebase';
import { useTheme } from '../../../api/themeContext';
import styles from './chat.module.css';

const Chat = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchParams] = useSearchParams();
  const urlChatId = searchParams.get('chatId');

  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setAuthUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (urlChatId) {
      setSelectedChat(urlChatId);
    }
  }, [urlChatId]);

  return (
    <div
      className={`${styles.appContainer} ${
        theme === 'dark' ? styles.darkTheme : ''
      }`}
    >
      <Header />

      {authLoading ? (
        <div className={styles.chatLoader}>
          <div className={styles.spinner}></div>
          <p>Se încarcă mediul securizat de chat...</p>
        </div>
      ) : !authUser ? (
        <div className={styles.authRequiredContainer}>
          <div className={styles.authCard}>
            <div className={styles.authLockIcon}>🔒</div>
            <h2>Autentificare Necesară</h2>
            <p>
              Pentru confidențialitatea și securitatea conversațiilor tale BARD,
              trebuie să fii conectat la un cont de utilizator.
            </p>
            <div className={styles.authActions}>
              <button
                className={styles.loginBtn}
                onClick={() => navigate('/register')}
              >
                Conectează-te la cont
              </button>
              <button
                className={styles.registerBtn}
                onClick={() => navigate('/register?mode=register')}
              >
                Creează un cont nou
              </button>
            </div>
            <p className={styles.authHint}>
              Mesajele și identitatea sunt protejate conform regulilor de securitate BARD.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chatContainer}>
          <Sidebar className={styles.sidebar}>
            <Search onChatSelect={setSelectedChat} />
            <Chats onSelectChat={setSelectedChat} />
          </Sidebar>
          <div className={styles.mainContent}>
            {selectedChat ? (
              <div className={styles.chatContent}>
                <Navbar chatId={selectedChat} />
                <Message chatId={selectedChat} />
                <Input chatId={selectedChat} />
              </div>
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderBox}>
                  <span className={styles.placeholderIcon}>💬</span>
                  <h3>Conversațiile tale BARD</h3>
                  <p>
                    Alege o conversație din stânga sau trimite un mesaj direct din
                    pagina oricărui anunț.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;