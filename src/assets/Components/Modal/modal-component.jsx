import { Modal, Button } from 'react-bootstrap';
import styles from './modal.module.css';

const CustomModal = ({
  children,
  isOpen,
  onClose,
  className,
  position,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop={false}
      dialogClassName={`${styles.customModal} ${styles.accountModal}`}
      className={className}
      container={document.body}
      position={position}
    >
      <Modal.Body className={styles.modalBody}>{children}</Modal.Body>
      <Button className={styles.accountModalBtn} variant="primary" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default CustomModal;
