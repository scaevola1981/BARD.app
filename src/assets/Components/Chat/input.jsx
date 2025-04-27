import { useState, useEffect } from 'react';
import { db, observeAuthState } from '../../../api/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import styles from './input.module.css';

const Input = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !chatId || !currentUserId) return;

    try {
      await addDoc(collection(db, 'chat', chatId, 'messages'), {
        text: message,
        user: currentUserId,
        timestamp: serverTimestamp(),
      });

      const chatRef = doc(db, 'chat', chatId);
      await updateDoc(chatRef, {
        text: message,
        timestamp: serverTimestamp(),
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
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
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <img src="attachment-icon.png" alt="attach" className={styles.icon} />
      <button className={styles.sendButton} onClick={handleSend}>
        Trimite
      </button>
    </div>
  );
};

export default Input;