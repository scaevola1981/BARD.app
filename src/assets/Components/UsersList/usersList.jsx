import { useState, useEffect } from "react";
import { db, auth } from "@/api/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./usersList.module.css";

const UsersList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
   
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

   
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.uid !== currentUser?.uid); 
      setUsers(userList);
    });

   
    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [currentUser]); 

  return (
    <div className={styles.usersList}>
      <h4>Users</h4>
      {users.map((user) => (
        <div
          key={user.uid}
          className={styles.userItem}
          onClick={() => onSelectUser(user)}
        >
          <img src={user.photoURL || "avatar-placeholder.png"} alt="" />
          <span>{user.displayName || user.email}</span>
        </div>
      ))}
    </div>
  );
};

export default UsersList;

