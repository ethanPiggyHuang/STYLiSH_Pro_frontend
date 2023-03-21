import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GetStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  // console.log(fullStars);
  // console.log(hasHalfStar);

  return (
    <div>
      <span>{rating.toFixed(1)} </span>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} />
      ))}
      {hasHalfStar && <FontAwesomeIcon icon={faStarHalf} />}
    </div>
  );
}

function StarRating({ id, ratings }) {
  return (
    <div>
      {ratings.length === 0 ? (
        ''
      ) : (
        <GetStars
          rating={
            ratings.findIndex((item) => item.product_id === id) === -1
              ? 5
              : ratings.find((item) => item.product_id === id).rank
          }
        />
      )}
    </div>
  );
}

export default StarRating;
