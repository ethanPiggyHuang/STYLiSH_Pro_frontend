import React from 'react';
import styled from 'styled-components';

const ProductRatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductRatingIcon = styled.span`
  display: inline-block;
  font-size: 10px;
  color: #9e9e9e;
  /* Use a unicode star icon */
  &:before {
    content: '\\2605';
  }

  /* Fill in the star icon if it is highlighted */
  ${({ highlighted }) =>
    highlighted &&
    `
    color: #ff9800;
    text-shadow:
      0 0 1px #ff9800,
      0 0 1px #ff9800,
      0 0 1px #ff9800,
      0 0 1px #ff9800,
      0 0 2px #ff9800,
      0 0 2px #ff9800,
      0 0 2px #ff9800,
      0 0 2px #ff9800;
  `}
`;

const ProductRating = ({ rating }) => {
  console.log(rating);
  const MAX_RATING = 5;
  const highlightedStars = Math.round(rating * 2) / 2;
  console.log(highlightedStars);
  const fullStars = Math.floor(highlightedStars);
  const hasHalfStar = highlightedStars % 1 !== 0;
  console.log(hasHalfStar);
  // Generate an array of star icons with appropriate highlighting
  const stars = Array(MAX_RATING)
    .fill(0)
    .map((_, index) => {
      const highlighted =
        index < fullStars || (index === fullStars && hasHalfStar);
      return <ProductRatingIcon key={index} highlighted={highlighted} />;
    });

  return (
    <ProductRatingWrapper>
      {rating.toFixed(1)}
      {stars}
    </ProductRatingWrapper>
  );
};

export default ProductRating;
