import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  if (images) {
    const elements = images.map(el => (
      <ImageGalleryItem
        onClick={() => openModal(el.largeImageURL)}
        key={el.id}
        url={el.webformatURL}
        tags={el.tags}
        largeImageURL={el.largeImageURL}
      />
    ));

    return <ul className={css.gallery}>{elements}</ul>;
  }

  return null;
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func
}

export default ImageGallery;
