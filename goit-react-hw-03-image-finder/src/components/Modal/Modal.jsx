import css from './Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onCloseModal(); // Wywołujemy funkcję zamykającą modal
    }
  };
  handleCloseModal = event => {
    this.props.onCloseModal();
  };

  render() {
    const { selectedImage } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleCloseModal}>
        <div className={css.modal}>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
