"use client"
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import styles from "../../../styles/modal.module.css";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <button onClick={handleClose} className={styles.closeButton}>
                            <IoMdClose size={18} className={styles.closeIcon} />
                        </button>
                        <div className={styles.modalTitle}>{title}</div>
                    </div>
                    <div className={styles.modalBody}>{body}</div>
                    <div className={styles.modalFooter}>
                        <div className={styles.footerActions}>
                            {secondaryAction && secondaryActionLabel && (
                                <button
                                    disabled={disabled}
                                    onClick={handleSecondaryAction}
                                    className={styles.secondaryButton}
                                >
                                    {/* <IoMdClose size={24} className={styles.buttonIcon} /> */}
                                    {secondaryActionLabel}
                                </button>
                            )}
                            <button
                                disabled={disabled}
                                onClick={handleSubmit}
                                className={styles.primaryButton}
                            >
                                {/* <IoMdClose size={24} className={styles.buttonIcon} /> */}
                                {actionLabel}
                            </button>
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
