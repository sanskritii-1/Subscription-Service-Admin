import React from 'react';
import classes from './ResourcesModal.module.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResourcesModal({ show, onClose, children }: ModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        {children}
      </div>
    </div>
  );
}
