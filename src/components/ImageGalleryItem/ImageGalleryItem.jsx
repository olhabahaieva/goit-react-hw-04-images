import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ( {url, tags, onClick} ) => {
    return (
      <li className={css.galleryItem} onClick={onClick}>
          <img
            className={css.galleryItemImage}
            src={url}
            alt={tags}
          />
      </li>
    );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func
}

export default ImageGalleryItem;
