import styles from './account.module.css';
import Modal from '../../Components/Modal/modal-component';
import { useState } from 'react';

const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <h1>Pagina cont</h1>
      <button className={styles['account-modal-btn']} onClick={toggleModal}>
        Deschide modal
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <div className={styles['account-header-modal']}>
            <h1>Continutul pe viitor!!</h1>
            <p>In mare continutul din Chat dar ramane la alegerea noastra dupa refacerea paginii Chat</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Account;
