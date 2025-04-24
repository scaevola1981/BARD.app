import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaRedo } from 'react-icons/fa';
import Api from '../../../api';
import styles from './autentificare.module.css';
import Header from '../../Components/Header/header'




const AuthLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    const token = localStorage.getItem('token');
  
    if (token && justLoggedIn === 'true') {
      setIsLoggedIn(true);
      navigate('/account-page');
      localStorage.removeItem('justLoggedIn'); // evită redirecționarea ulterioară
    }
  }, [navigate]);
  
  

  useEffect(() => {
    // Verificăm parametrul URL la încărcare
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('mode') === 'register') {
      setIsRegistering(true);
    }
     
        // Verificăm autentificarea
        const token = localStorage.getItem('token');
        setIsLoggedIn(token);
      }, [location]); // Adaugăm location ca dependency
    

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
          confirmPassword
        });
      } else {
        response = await Api.user.signIn({
          email: username,
          password
        });
      }

      if (response.success) {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('justLoggedIn', 'true');
        alert(isRegistering ? 'Înregistrare reușită!' : 'Autentificare reușită!');
        setIsLoggedIn(true);
        navigate('/account-page');
      } else {
        alert(response.message || 'Eroare la autentificare');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A apărut o eroare');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };


  return (
     <>
    <Header/>
   
    <div className={styles.authLayout}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Bun venit!</h1>
        <nav className={styles.nav}>
          {isLoggedIn ? (
            <>
              <Link to="/account-page" className={styles.navLink}>Profil</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Deconectare
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className={styles.toggleBtn}
            >
              {isRegistering ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Înregistrează-te'}
            </button>
          )}
        </nav>
      </header>

      <main className={styles.mainContent}>
        {isLoggedIn ? (
          <Outlet />
        ) : (
          <div className={styles.authSection}>
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
            </form>
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default AuthLayout;