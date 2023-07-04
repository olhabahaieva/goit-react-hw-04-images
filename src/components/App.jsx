import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from './api/getImages';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    query: '',
    largeImageURL: null,
  };

  fetchPhotoByName = async query => {
    try {
      this.setState({ isLoading: true });
      const photoByName = await getImages(query, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...photoByName.hits],
      }));
    } catch (err) {
      console.log('error', err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = async query => {
    this.setState({ query: query, images: [], page: 1 });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchPhotoByName(this.state.query);
    }
  }

  onLoadMore = async () => {
    this.setState({ 
      page: this.state.page + 1, 
    });
  };

  openModal = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, page, isLoading, largeImageURL, tags } = this.state;

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
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ImageGallery
              images={images}
              page={page}
              openModal={this.openModal}
            />
            {images.length > 0 && images.length >= 12 && (
              <Button onLoadMore={this.onLoadMore}/>
            )}
            
          </>
        )}
        {largeImageURL !== null && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
