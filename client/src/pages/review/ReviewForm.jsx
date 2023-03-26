import { useState, useEffect  } from 'react';
import Card from './Card';
import Button from './button';
import RatingSelect from './RatingSelect';
import './ReviewForm.css';

function ReviewForm(props) {
  const [text, setText] = useState('');
  const [rating1, setRating1] = useState(10);
  const [rating2, setRating2] = useState(10);
  const [rating3, setRating3] = useState(10);
  const [rating4, setRating4] = useState(10);
  const [rating5, setRating5] = useState(10);
  // const [rating, setuserratingAvg] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');


  const handleTextChange = event => {
   if (text === '') {
     setBtnDisabled(true);
     setMessage(null);
  } else if (text !== '' && text.trim().length <= 10) {
    setMessage('Text must be at least 10 characters');
    setBtnDisabled(true);
  } else {
    setMessage(null);
    setBtnDisabled(false);
    }
   setText(event.target.value);
  };
    const handleSubmit = event => {
    event.preventDefault();
   if (text.trim().length > 10) {
    
    let rating = (rating1+rating2+rating3+rating4+rating5)/5;
    const newFeedback = {
    text,
    rating
   };
   props.handleAdd(newFeedback);
    setText('');
   }
};
  return (
   <Card>
    <form onSubmit={handleSubmit}>
    <h2>Question 1?</h2>
    <RatingSelect select={rating1 => setRating1(rating1) } questionNo="q1" />
    <h2>Question 2?</h2>
    <RatingSelect select={rating2 => setRating2(rating2) } questionNo="q2" />
    <h2>Question 3?</h2>
    <RatingSelect select={rating3 => setRating3(rating3) } questionNo="q3" />
    <h2>Question 4?</h2>
    <RatingSelect select={rating4 => setRating4(rating4) } questionNo="q4" />
    <h2>Question 5?</h2>
    <RatingSelect select={rating5 => setRating5(rating5) } questionNo="q5" />
   <div className="input-group">
  <input 
   onChange={handleTextChange} 
   type="text" 
   placeholder="Write a review" 
   value={text} 
   />
   <Button type="submit" isDisabled={btnDisabled}>
    Send
  </Button>
    </div>
      {message && <div className="message">{message}</div>}
   </form>
 </Card>
 );
}
export default ReviewForm;

