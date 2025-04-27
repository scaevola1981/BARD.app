import { db} from './firebase';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const createOrGetChat = async (currentUserId, selectedUserId) => {
  try {
    const chatsRef = collection(db, 'chat');
    const q = query(chatsRef, where('users', 'array-contains', currentUserId));
    const querySnapshot = await getDocs(q);

    let existingChat = null;
    querySnapshot.forEach((doc) => {
      const chatData = doc.data();
      if (chatData.users.includes(selectedUserId)) {
        existingChat = doc.id;
      }
    });

    if (existingChat) {
      return existingChat;
    }

    // Preia datele utilizatorilor pentru a seta un nume de chat
    const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
    const selectedUserDoc = await getDoc(doc(db, 'users', selectedUserId));
    const currentUserName = currentUserDoc.exists()
      ? `${currentUserDoc.data().firstName} ${currentUserDoc.data().lastName}`
      : 'Utilizator necunoscut';
    const selectedUserName = selectedUserDoc.exists()
      ? `${selectedUserDoc.data().firstName} ${selectedUserDoc.data().lastName}`
      : 'Utilizator necunoscut';

    const newChatRef = await addDoc(collection(db, 'chat'), {
      users: [currentUserId, selectedUserId],
      name: `${currentUserName} - ${selectedUserName}`,
      text: '',
      timestamp: new Date(),
    });

    return newChatRef.id;
  } catch (error) {
    console.error('Error creating or getting chat:', error);
    return null;
  }
};