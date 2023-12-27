import css from './ImageGallery.module.css';
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../../components';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.lastNewImageRef = createRef();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data.hits !== this.props.data.hits) {
      this.scrollToLastNewImage();
    }
  }

  scrollToLastNewImage = () => {
    if (this.lastNewImageRef.current) {
      this.lastNewImageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  render() {
    const { data, onImageClick } = this.props;
    return (
      <ul className={css.imageGallery}>
        {data.hits.map((item, index) => (
          <ImageGalleryItem
            key={item.id}
            id={item.id}
            imageUrl={item.webformatURL}
            imageTags={item.tags}
            onImageClick={onImageClick}
            forwardedRef={
              index === data.hits.length - 1 ? this.lastNewImageRef : null
            }
          ></ImageGalleryItem>
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
