import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import styles from './Modal.module.css';

const Modal = ({
  isOpen = false,
  onClose = () => {},
  title = '',
  message = '',
  type = 'info', // 'favorite', 'success', 'warning', 'info'
  confirmText = 'OK',
  onConfirm = null,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        if (onConfirm) onConfirm();
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (type) {
      case 'favorite':
        return <FaHeart className={styles.iconFavorite} />;
      case 'success':
        return <FaCheckCircle className={styles.iconSuccess} />;
      case 'warning':
        return <FaExclamationTriangle className={styles.iconWarning} />;
      case 'info':
      default:
        return <FaInfoCircle className={styles.iconInfo} />;
    }
  };

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeIconBtn}
          onClick={onClose}
          aria-label="Închide"
        >
          <FaTimes />
        </button>

        <div className={styles.iconWrapper}>{renderIcon()}</div>

        {title && <h3 className={styles.modalTitle}>{title}</h3>}
        {message && <p className={styles.modalMessage}>{message}</p>}

        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={handleConfirmClick}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['favorite', 'success', 'warning', 'info']),
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default Modal;
