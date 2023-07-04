import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({onLoadMore}) => {
  return <button onClick={onLoadMore} className={css.button}>Load More</button>;
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
}

export default Button;
