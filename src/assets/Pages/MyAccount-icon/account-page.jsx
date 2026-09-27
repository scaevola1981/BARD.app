import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { FaUser, FaLock, FaRedo, FaEdit } from 'react-icons/fa';
import { storage, auth, observeAuthState } from '../../../api/firebase'; // Adaugă observeAuthState
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { compressImageToBase64 } from '../../../api/imageUtils';
import Api from '../../../api';
import adEntity from '../../../api/adEntity';
import styles from './account.module.css';
import { useTheme } from '../../../api/themeContext';
import Header from '../../Components/Header/header';
import Card from '../../Components/Card/card';
import Modal from '../../Components/Modal/Modal';
import { getFavorites, addFavorite, removeFavorite } from '../../../api/favoritesManager';

const AccountPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  // const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    profilePicture: '',
  });
  const [userAds, setUserAds] = useState([]);
  const [visitedAds, setVisitedAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    profilePicture: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Adaugă stare pentru utilizator



  useEffect(() => {
    setFavoritesList(getFavorites());
    const handleStorageChange = () => {
      setFavoritesList(getFavorites());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAddFavorite = (ad) => {
    const isAlready = favoritesList.some((fav) => String(fav.id) === String(ad.id));
    if (isAlready) {
      setModalConfig({
        isOpen: true,
        title: 'Anunț deja salvat',
        message: 'Acest anunț este deja în lista ta de favorite!',
        type: 'info',
      });
      return;
    }

    const updated = addFavorite(ad);
    setFavoritesList(updated);
    setModalConfig({
      isOpen: true,
      title: 'Adăugat la Favorite! ❤️',
      message: `Anunțul „${ad.title}” a fost adăugat în favorite.`,
      type: 'favorite',
    });
  };

  const handleRemoveFavorite = (adId) => {
    const updated = removeFavorite(adId);
    setFavoritesList(updated);
    setModalConfig({
      isOpen: true,
      title: 'Eliminat din Favorite',
      message: 'Anunțul a fost eliminat din lista ta de favorite.',
      type: 'info',
    });
  };

  const checkIsFavorite = (adId) => {
    return favoritesList.some((fav) => String(fav.id) === String(adId));
  };

  useEffect(() => {
    const unsubscribe = observeAuthState(async (user) => {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        fetchUserData(user);
        fetchUserAds(user.uid);
        fetchVisitedAds();
      } else if (storedUser?.uid) {
        setCurrentUser(storedUser);
        setIsLoggedIn(true);
        fetchUserData(storedUser);
        fetchUserAds(storedUser.uid);
        fetchVisitedAds();
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async (activeUser) => {
    try {
      const userToFetch =
        activeUser ||
        currentUser ||
        JSON.parse(localStorage.getItem('user') || 'null');

      if (!userToFetch || !userToFetch.uid) {
        return;
      }

      const response = await Api.user.getProfile(userToFetch);

      if (response.success && response.data) {
        setUserData((prev) => ({
          ...prev,
          ...response.data,
        }));
        setEditForm((prev) => ({
          ...prev,
          ...response.data,
        }));
      } else if (!response.success) {
        console.error('Eroare la preluare profil:', response.message);
      }
    } catch (error) {
      console.error('Eroare generală la fetchUserData:', error);
    }
  };
  

 

  const fetchUserAds = async (userId) => {
    setIsLoading(true);
    try {
      const { data, success } = await adEntity.readAll();
      if (success) {
        const filteredAds = data.filter((ad) => ad.userId === userId);
        setUserAds(filteredAds);
      } else {
        setError('Nu s-au putut prelua anunțurile utilizatorului.');
      }
    } catch (err) {
      console.error('Eroare la preluarea anunțurilor:', err);
      setError('A apărut o eroare la preluarea anunțurilor.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVisitedAds = async () => {
    try {
      const visited = JSON.parse(localStorage.getItem('visitedAds')) || [];
      const { data, success } = await adEntity.readAll();
      if (success) {
        const visitedAdsData = data.filter((ad) => visited.includes(ad.id));
        setVisitedAds(visitedAdsData);
      }
    } catch (err) {
      console.error('Eroare la preluarea anunțurilor vizitate:', err);
      setError('A apărut o eroare la preluarea anunțurilor vizitate.');
    }
  };

  const validatePassword = () => {
    if (isRegistering && password !== confirmPassword) {
      setPasswordError('Parolele nu coincid');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Parola trebuie să aibă minim 6 caractere');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && !validatePassword()) {
      return;
    }

    try {
      let response;
      if (isRegistering) {
        response = await Api.user.signUp({
          email: username,
          password,
          confirmPassword,
        });
      } else {
        response = await Api.user.signIn({
          email: username,
          password,
        });
      }

      if (response.success) {
        localStorage.setItem('token', response.data.idToken);
        const userObj = {
          uid: response.data.localId,
          email: response.data.email,
        };
        localStorage.setItem('user', JSON.stringify(userObj));
        alert(isRegistering ? 'Înregistrare reușită!' : 'Autentificare reușită!');
        setIsLoggedIn(true);
        setCurrentUser(userObj);
        fetchUserData(userObj);
        fetchUserAds(userObj.uid);
        fetchVisitedAds();
      } else {
        alert(response.message || 'Eroare la autentificare');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A apărut o eroare');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch {
      // Ignorăm
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('visitedAds');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserData({ firstName: '', lastName: '', address: '', profilePicture: '' });
    setUserAds([]);
    setVisitedAds([]);
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      profilePicture: userData.profilePicture,
    });
    setProfileImageFile(null);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const activeUid = currentUser?.uid || storedUser?.uid;

    if (!activeUid) {
      alert('Trebuie să fii autentificat pentru a actualiza profilul.');
      return;
    }

    try {
      let updatedData = { ...editForm, uid: activeUid };

      // Încărcare imagine (dacă există)
      if (profileImageFile) {
        const isStorageBlocked =
          localStorage.getItem('storageQuotaExceeded') === 'true';

        if (isStorageBlocked) {
          updatedData.profilePicture = await compressImageToBase64(
            profileImageFile,
            300,
            0.7
          );
        } else {
          try {
            const storageRef = ref(storage, `profilePictures/${activeUid}`);
            await uploadBytes(storageRef, profileImageFile);
            updatedData.profilePicture = await getDownloadURL(storageRef);
          } catch {
            localStorage.setItem('storageQuotaExceeded', 'true');
            updatedData.profilePicture = await compressImageToBase64(
              profileImageFile,
              300,
              0.7
            );
          }
        }
      }

      // Actualizare profil prin API
      const response = await Api.user.updateProfile({ uid: activeUid }, updatedData);

      if (response.success) {
        setUserData(updatedData);
        setIsEditing(false);
        alert('Profil actualizat cu succes!');
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('Eroare actualizare:', err);
      setError(err.message);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      setEditForm((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  return (
    <>
      <Header />
      <div className={`${styles.accountPage} ${theme === 'dark' ? styles.darkTheme : ''}`}>
        <div className={styles.accountContent}>
          {isLoggedIn ? (
            <>
              <div className={styles.profileSection}>
                <div className={styles.profilePicture}>
                  {userData.profilePicture ? (
                    <img src={userData.profilePicture} alt="Poza de profil" />
                  ) : (
                    <FaUser className={styles.profileIcon} />
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className={styles.editForm}>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleInputChange}
                        placeholder="Nume"
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleInputChange}
                        placeholder="Prenume"
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleInputChange}
                        placeholder="Adresa"
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formButtons}>
                      <button type="submit" className={styles.saveBtn}>
                        Salvează
                      </button>
                      <button type="button" onClick={handleCancelEdit} className={styles.cancelBtn}>
                        Anulează
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <p className={styles.address}>Adresa: {userData.address}</p>
                    <button onClick={handleEditProfile} className={styles.editBtn}>
                      <FaEdit /> Editează Profilul
                    </button>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                      Deconectare
                    </button>
                  </>
                )}
              </div>

              <div className={styles.adsSection}>
                <h3>Anunțuri puse de tine</h3>
                {isLoading && <div className={styles.loading}>Se încarcă...</div>}
                {error && <div className={styles.error}>{error}</div>}
                {userAds.length === 0 && !isLoading && !error ? (
                  <p>Nu ai pus încă niciun anunț.</p>
                ) : (
                  <Card
                    ads={userAds}
                    isLoading={isLoading}
                    error={error}
                    onAddFavorite={handleAddFavorite}
                    onRemove={handleRemoveFavorite}
                    isFavorite={checkIsFavorite}
                    isFavoriteView={false}
                    onCardClick={(id) => navigate(`/ad/${id}`)}
                    hideTitle={true}
                  />
                )}
              </div>

              <div className={styles.adsSection}>
                <h3>Anunțuri vizitate</h3>
                {visitedAds.length === 0 ? (
                  <p>Nu ai vizitat încă niciun anunț.</p>
                ) : (
                  <Card
                    ads={visitedAds}
                    isLoading={false}
                    error={null}
                    onAddFavorite={handleAddFavorite}
                    onRemove={handleRemoveFavorite}
                    isFavorite={checkIsFavorite}
                    isFavoriteView={false}
                    onCardClick={(id) => navigate(`/ad/${id}`)}
                    hideTitle={true}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className={styles.authTitle}>
                {isRegistering ? 'Înregistrare' : 'Login'}
              </h2>
              <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.inputGroup}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Parolă"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                    minLength="6"
                  />
                </div>

                {isRegistering && (
                  <>
                    <div className={styles.inputGroup}>
                      <FaRedo className={styles.inputIcon} />
                      <input
                        type="password"
                        placeholder="Repetă parola"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.input}
                        minLength="6"
                      />
                    </div>
                    {passwordError && (
                      <p className={styles.errorText}>{passwordError}</p>
                    )}
                  </>
                )}

                <button type="submit" className={styles.submitBtn}>
                  {isRegistering ? 'Înregistrează-te' : 'Login'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className={styles.toggleBtn}
                >
                  {isRegistering ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Înregistrează-te'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </>
  );
};

export default AccountPage;
