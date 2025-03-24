import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const RegisterPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const redirectTo = localStorage.getItem('redirectTo') || '/addPostForm';
        if (redirectTo) {
          localStorage.remveItem('redirectTo');
          navigate(redirectTo); 
        }
      
      }
    });
  }, [auth, navigate]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      localStorage.setItem('token', userCredential.user.accessToken);
      alert('Înregistrare reușită!');

      const redirectTo = localStorage.getItem('redirectTo') || '/addPostForm';
      localStorage.removeItem('redirectTo');

      navigate(redirectTo);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Înregistrare</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduceti email-ul"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Parolă</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduceti parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirmă Parola</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmă parola"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Înregistrează-te</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;

