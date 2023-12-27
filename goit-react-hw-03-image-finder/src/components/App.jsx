import css from './APP.module.css';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { SearchBar, Loader, ImageGallery, Button, Modal } from '../components';

import { searchImage } from '../services';

export class App extends Component {
  state = {
    data: { total: 0, hits: [] },
    searchKey: '',
    totalPages: 0,
    activePage: 1,
    isLoading: false,
    isOpenModal: false,
    selectedImageId: 0,
  };

  fetchImages = (name, page) => {
    this.setState({ isLoading: true });
    searchImage(name, page)
      .then(response => {
        if (!response.totalHits) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (page > 1) {
          this.setState(prevState => ({
            data: {
              total: response.totalHits,
              hits: [...prevState.data.hits, ...response.hits],
            },
            totalPages: Math.ceil(response.totalHits / 12),
          }));
        } else {
          Notiflix.Notify.success(`We found ${response.totalHits} images.`);
          this.setState(prevState => ({
            data: {
              total: response.totalHits,
              hits: [...response.hits],
            },
            totalPages: Math.ceil(response.totalHits / 12),
          }));
        }
        if (page === this.state.totalPages) {
          Notiflix.Notify.warning('All images from the database are displayed');
        }
      })

      .catch(error => {
        Notiflix.Notify.failure('Something went wrong! Please, try again.');
        console.log(error);
      })
      .finally(() => {
        this.setState(prevState => ({
          isLoading: false,
          activePage: prevState.activePage + 1,
        }));
      });
  };

  handlerSearch = data => {
    this.fetchImages(data.searchKey, 1);
    this.setState(prevState => ({
      searchKey: data.searchKey,
      activePage: 1,
    }));
  };

  handlerLoadMoreImage = () => {
    this.fetchImages(this.state.searchKey, this.state.activePage);
  };

  handlerOpenModal = eve => {
    const { id } = eve.target;
    const numericId = parseInt(id, 10);
    this.setState({
      selectedImageId: numericId,
      isOpenModal: true,
    });
  };
  handlerCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const {
      data,
      totalPages,
      activePage,
      isLoading,
      isOpenModal,
      selectedImageId,
    } = this.state;
    let selectedImage = null;

    if (selectedImageId) {
      selectedImage = data.hits.find(item => item.id === selectedImageId);
    }
    return (
      <>
        <div className={css.App}>
          <SearchBar onSubmit={this.handlerSearch} />

          {totalPages > 0 && (
            <ImageGallery
              data={data}
              onImageClick={this.handlerOpenModal}
            ></ImageGallery>
          )}
          {isLoading && <Loader />}

          {totalPages >= activePage && (
            <Button onClick={this.handlerLoadMoreImage}></Button>
          )}
          {isOpenModal && (
            <Modal
              selectedImage={selectedImage}
              onCloseModal={this.handlerCloseModal}
            ></Modal>
          )}
        </div>
      </>
    );
  }
}

App.propTypes = {
  data: PropTypes.shape({
    total: PropTypes.number.isRequired,
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  searchKey: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  selectedImageId: PropTypes.number.isRequired,
  handlerSearch: PropTypes.func.isRequired,
  handlerLoadMoreImage: PropTypes.func.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
  handlerCloseModal: PropTypes.func.isRequired,
};
