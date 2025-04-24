// Input.jsx
import { useState } from 'react';
import { db} from '@/api/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import styles from './input.module.css';

const Input = ({ chatId }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim() || !chatId) return;

    try {
      // Adaugă mesajul în subcolecția "messages" a chat-ului
      await addDoc(collection(db, 'chat', chatId, 'messages'), {
        text: message,
        user: 'current', // Într-o aplicație reală, folosește ID-ul utilizatorului autentificat
        timestamp: serverTimestamp(),
      });

      // Actualizează documentul chat-ului cu ultimul mesaj (pentru previzualizare în Chats)
      const chatRef = doc(db, 'chat', chatId);
      await updateDoc(chatRef, {
        text: message,
        timestamp: serverTimestamp(),
      });

      setMessage(''); // Resetează input-ul
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Type something..."
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <img src="attachment-icon.png" alt="attach" className={styles.icon} />
      <button className={styles.sendButton} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default Input;
