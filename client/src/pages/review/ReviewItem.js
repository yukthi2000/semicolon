import { FaTimes } from 'react-icons/fa';
import Card from './Card';
import PropTypes from 'prop-types';
import { useState} from 'react';

function ReviewItem({ item, handleDelete, setDeletedItem}) {

  const deleteFeedback = (ratingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
     
     fetch(`http://localhost:9000/api/deleteRating/`+ratingId).then(() =>setDeletedItem(ratingId));
     }
     
    }

  return (
    <Card>
      <div className="num-display">{item.avgRating}</div>
      <button onClick={() => deleteFeedback(item.ratingId)} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.comment}</div>
   </Card>
  );
}
ReviewItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default ReviewItem;