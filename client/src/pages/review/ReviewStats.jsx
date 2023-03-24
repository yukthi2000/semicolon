import PropTypes from 'prop-types';
function DestReviewStats({ review }) {
  // Calculate Ratings Average

  
  let average =
    review.reduce((accumulator, current) => {
      return accumulator + current.rating;
    }, 0) / review.length;
  average = average.toFixed(1);
  return (
    <div className="feedback-stats">
      <h6>ProductReviewStats</h6>
      <h6>{review.length} Product Reviews</h6>
      <h6>Average Product Rating: {isNaN(average) ? 0 : average}</h6>
     </div>
  );
}
DestReviewStats.propTypes = {
  review: PropTypes.array.isRequired
};
export default DestReviewStats;