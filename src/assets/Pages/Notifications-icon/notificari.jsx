import './notificari-module.css';
import CustomModal from '../../Components/Modal/modal-component';
import { useState } from 'react';

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
        className="notificari-modal , notificari-dialog"
      >
        <div>
          <h2>Notificări</h2>
          <h3>Conținut adus dinamic</h3>
          <button onClick={toggleModal}>Deschide Notificări</button>
        </div>
        
      </CustomModal>
    </>
  );
};

export default AnunturiFavorite;
