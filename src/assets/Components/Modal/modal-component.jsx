import { Modal, Button } from 'react-bootstrap';
import './modal.css';

const CustomModal = ({
  children,
  isOpen,
  onClose,
  className,
  position,
}) => {
  const dialogClassName = 'custom-modal';

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        backdrop={false}
        dialogClassName={`custom-modal, notificari-dialog ${dialogClassName}`}
        className={` ${className}`}
        container={document.body}
        position={position}
      >
        <Modal.Body>{children}</Modal.Body>
        <Button className='account-modal-btn' variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default CustomModal;
