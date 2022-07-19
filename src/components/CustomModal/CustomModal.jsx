import { React } from 'react';
import styles from './CustomModal.module.css';
import { CloseOutlined } from '@ant-design/icons';

const CustomModal = ({ isOpen, setIsOpen }) => {
    return (
        <div className={styles['modal']}>
            <div className={styles['modal-content']}>
                <div className={styles['modal-header']}>
                    <h4 className={styles['modal-title']}>Modal Title</h4>
                    <CloseOutlined />
                </div>
                <div className={styles['modal-body']}>
                    This is modal content.
                </div>
                <div className={styles['modal-footer']}>
                    <button
                        className={styles['cancel-button']}
                        onClick={() => setIsOpen(false)}
                    >Cancel</button>
                    <button
                        className={styles['save-button']}
                        // onClick={() => setIsOpen(false)}
                    >Save</button>
                </div>
            </div>
        </div>
    )
};

export default CustomModal;