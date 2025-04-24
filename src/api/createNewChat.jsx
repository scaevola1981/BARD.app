import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/api/firebase";

export const createOrGetChat = async (user1Id, user2Id) => {
  const chatId = [user1Id, user2Id].sort().join("_");
  const chatRef = doc(db, "chat", chatId);

  const snapshot = await getDoc(chatRef);
  if (!snapshot.exists()) {
    await setDoc(chatRef, {
      participants: [user1Id, user2Id],
      createdAt: serverTimestamp(),
      name: `Chat cu ${user2Id}`, // opțional, pt display
    });
  }

  return chatId;
};
