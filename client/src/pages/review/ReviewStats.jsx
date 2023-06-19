import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
function ReviewStats({review, placeId}) {
  // Calculate Ratings Average
  const [average, setAverage] = useState(0);
  const [revCount, setRevCount] = useState(0);
  // let average =
  //   review.reduce((accumulator, current) => {
  //     return accumulator + current.rating;
  //   }, 0) / review.length;
  // average = average.toFixed(1);
  useEffect(() => {
    fetch(`http://localhost:3001/api/avgRating/${placeId}`)
    .then((response) => response.json())
    .then((json) => {setAverage(json[0].averageRating.toFixed(1)); setRevCount(json[0].count);})
    .catch((err) => {
     console.log(err.message);
    });
    
  });

  return (
    <div className="feedback-stats">
      ReviewStats
      <h4>{revCount}  Reviews</h4>
      <h4>Average destination Rating: {average}</h4>
     </div>
  );
}
ReviewStats.propTypes = {
  review: PropTypes.array.isRequired
};
export default ReviewStats;