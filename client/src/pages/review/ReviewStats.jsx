import PropTypes from 'prop-types';
import "./ReviewStats.css";

function DestReviewStats({ review }) {
  // Calculate Ratings Average

  
  let average =
    review.reduce((accumulator, current) => {
      return accumulator + current.rating;
    }, 0) / review.length;
  average = average.toFixed(1);
  return (
    <div className="feedback-stats">
      ProductReviewStats
      <h4>{review.length} Destination Reviews</h4>
      <h4>Average travellers' Rating: {isNaN(average) ? 0 : average}</h4>
     </div>
  );
}
DestReviewStats.propTypes = {
  review: PropTypes.array.isRequired
};
export default DestReviewStats;