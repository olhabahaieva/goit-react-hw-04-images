import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({closeModal, largeImageURL, tags})=> {
  const handleOverlayClick = () => {
   closeModal(); 
  };

    return (
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }

Modal.propTypes = {
  largeImageURL: PropTypes.string, 
  tags: PropTypes.string
}
export default Modal;
