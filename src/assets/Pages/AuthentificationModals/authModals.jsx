

import  { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AuthModals = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      judet: formData.get('judet'),
      oras: formData.get('oras'),
      localitate: formData.get('localitate'),
      comuna: formData.get('comuna'),
    };
    setUserData(user);
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button onClick={() => setShowRegister(true)}>Înregistrare</Button>
      ) : (
        <Button>Adaugă Anunț</Button>
      )}

      {/* Modal Înregistrare */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Înregistrare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group>
              <Form.Label>Județ</Form.Label>
              <Form.Control name="judet" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Oraș</Form.Label>
              <Form.Control name="oras" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Localitate</Form.Label>
              <Form.Control name="localitate" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comună</Form.Label>
              <Form.Control name="comuna" required />
            </Form.Group>
            <Button type="submit">Continuă</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Login */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Autentificare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Parolă</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
            <Button type="submit">Autentifică-te</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModals;
