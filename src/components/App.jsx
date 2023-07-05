import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from './api/getImages';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = ({ query, images, page, isLoading, largeImageURL, tags }) => {
  const [imagesState, setImages] = useState([]);
  const [pageState, setPage] = useState(1);
  // eslint-disable-next-line
  const [isLoadingState, setIsLoading] = useState(false);
  const [queryState, setQuery] = useState('');
  const [largeImageURLState, setLargeImageURL] = useState(null);



  const onSubmit = async query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchPhotoByName = async () => {
      if (queryState !== '' && pageState === 1) {
        try {
          setIsLoading(true);
          const photoByName = await getImages(queryState, pageState);
          setImages(photoByName.hits);
        } catch (err) {
          console.log('error', err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchPhotoByName();
  }, [queryState, pageState]);

  const onLoadMore = async () => {
    setPage(page + 1);
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery images={imagesState} page={pageState} openModal={openModal} />
          {imagesState.length > 0 && imagesState.length >= 12 && (<Button onLoadMore={onLoadMore} />)}
        </>
      )}
      {largeImageURLState !== null && (
        <Modal
          largeImageURL={largeImageURLState}
          tags={tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
