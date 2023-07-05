import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from './api/getImages';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = ({ isLoading, tags }) => {
  const [images, setImages] = useState([]);
  const [isLoadingState, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState(null);

  const onSubmit = async query => {
    setQuery(query);
    setImages([]);
  };

  const fetchPhotoByName = async (query, page) => {
    try {
      setIsLoading(true);
      const photoByName = await getImages(query, page);
      setImages(prevImages => [...prevImages, ...photoByName.hits]);
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query !== '') {
      fetchPhotoByName(query, 1);
    }
  }, [query]);

  const onLoadMore = async () => {
    const nextPage = Math.ceil(images.length / 12) + 1;
    fetchPhotoByName(query, nextPage);
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={onSubmit} />
      {isLoadingState ? (
        <Loader />
      ) : (
        <>
          <ImageGallery images={images} page={1} openModal={openModal} />
          {images.length >= 12 && <Button onLoadMore={onLoadMore} />}
        </>
      )}
      {largeImageURL !== null && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
