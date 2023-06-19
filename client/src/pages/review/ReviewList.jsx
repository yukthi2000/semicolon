import { motion, AnimatePresence } from 'framer-motion';
import ReviewItem from './ReviewItem';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
function ReviewList({ review, handleDelete, placeId}) {

  //fetch reviews from backend
  const [data, setData] = useState([{"ratingId": 0, "placeId": 'test', "userId": 'test', "avgRating": 0, "comment": 'Loading'}, {"ratingId": 1, "placeId": 'test', "userId": 'test', "avgRating": 0, "comment": 'Loading'}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewItemDeleted, setDeletedItem] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:9000/api/ratings/${[placeId]}`)
    .then((response) => response.json())
    .then((actualData) => {setData(actualData); console.log(data);})
    .catch((err) => {
     console.log(err.message);
    });
    
  }, [reviewItemDeleted]);

   //data fetch end


  if (!review || review.length === 0) {
    return <p>No reviews yet</p>;
  }
  return (
   <div className="feedback-list" id="feedback-list">
   <AnimatePresence>
  {data.map(item => (
  <motion.div key={item.ratingId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
   <ReviewItem key={item.ratingId} item={item} handleDelete={handleDelete}  setDeletedItem={setDeletedItem}   />
  </motion.div>
   ))}
 </AnimatePresence>
 </div>
 );
}
ReviewList.propTypes = {
  review: PropTypes.arrayOf(
  PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
   })
  )
};
export default ReviewList;