import { useState, useEffect } from 'react';
import { db, auth, observeAuthState } from '../../../api/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import styles from './input.module.css';

const Input = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUserId(auth.currentUser.uid);
    }
    const unsubscribe = observeAuthState((user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || !chatId || !currentUserId) return;

    setMessage('');

    try {
      // 1. Adăugăm mesajul utilizatorului
      await addDoc(collection(db, 'chat', chatId, 'messages'), {
        text: trimmed,
        user: currentUserId,
        timestamp: serverTimestamp(),
      });

      const chatRef = doc(db, 'chat', chatId);
      await updateDoc(chatRef, {
        text: trimmed,
        timestamp: serverTimestamp(),
      });

      // 2. Răspuns automat inteligent dacă se discută cu asistentul oficial
      if (chatId.includes('support_bot')) {
        setTimeout(async () => {
          try {
            const replies = [
              'Salut! Sunt asistentul virtual BARD. Îți mulțumim pentru mesaj! Cum te putem ajuta?',
              'Anunțul tău este activ pe platformă. Dacă dorești schimburi sigure, recomandăm să verifici profilul vânzătorului.',
              'Mesajul a fost recepționat cu succes în sistemul securizat BARD!',
            ];
            const autoReply = replies[Math.floor(Math.random() * replies.length)];

            await addDoc(collection(db, 'chat', chatId, 'messages'), {
              text: autoReply,
              user: 'support_bot',
              timestamp: serverTimestamp(),
            });

            await updateDoc(chatRef, {
              text: autoReply,
              timestamp: serverTimestamp(),
            });
          } catch {
            // Ignorăm erorile pe răspunsul automat
          }
        }, 800);
      }
    } catch (error) {
      console.error('Eroare la trimiterea mesajului:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Scrie un mesaj..."
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendButton} onClick={handleSend} type="button">
        Trimite
      </button>
    </div>
  );
};

export default Input;