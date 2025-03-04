import { useState } from 'react';
import CustomModal from '../../Components/Modal/modal-component';
import styles from './notificari.module.css';  

const AnunturiFavorite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <CustomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        className={styles.notificariModal} 
      >
        <div>
          <h2>Notificări</h2>
          <h3>Conținut adus dinamic</h3>
          <button className={styles.notificariButton} onClick={toggleModal}>
            Deschide Notificări
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AnunturiFavorite;
