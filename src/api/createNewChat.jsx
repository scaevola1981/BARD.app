import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

export const createOrGetChat = async (user1Id, user2Id, title = '') => {
  if (!user1Id || !user2Id) {
    throw new Error('Identificatorii utilizatorilor sunt obligatorii.');
  }

  if (!auth.currentUser) {
    throw new Error('Trebuie să fii autentificat pentru a accesa conversația.');
  }

  const chatId = [user1Id, user2Id].sort().join("_");
  const chatRef = doc(db, "chat", chatId);

  try {
    const snapshot = await getDoc(chatRef);
    if (!snapshot.exists()) {
      await setDoc(chatRef, {
        users: [user1Id, user2Id],
        participants: [user1Id, user2Id],
        createdAt: serverTimestamp(),
        name: title || (user2Id === 'support_bot' ? 'BARD Asistență' : 'Conversație'),
        text: '',
      });
    }

    return chatId;
  } catch (error) {
    console.warn('Eroare la crearea sau preluarea conversației:', error.code || error.message);
    throw error;
  }
};

