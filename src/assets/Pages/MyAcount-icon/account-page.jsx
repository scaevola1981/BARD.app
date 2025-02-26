// Account.js
import './account-module.css';
import Modal from '../../Components/Modal/modal-component'
import { useState } from 'react';



const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <h1>Pagina cont</h1>
      <button onClick={toggleModal}>Deschide modal</button>
      <Modal isOpen={isModalOpen} 
             onClose={toggleModal}  
             className="account-header-modal">
        <div className="account-modal">
          <h1>Continutul pe viitor!!</h1>
          <p>In mare continutul din Chat dar ramane la alegerea noastra dupa refacerea paginii Chat</p>
        </div>
      </Modal>
    </>
  );
};

export default Account;