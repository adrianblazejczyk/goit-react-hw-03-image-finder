import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    const { id, imageUrl, imageTags, onImageClick, forwardedRef } = this.props;
    return (
      <li className={css.imageGalleryItem} ref={forwardedRef}>
        <img
          id={id}
          className={css.imageGalleryItemImage}
          src={imageUrl}
          alt={imageTags}
          onClick={onImageClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
