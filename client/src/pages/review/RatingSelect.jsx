import { useState } from 'react';
import "./RatingSelect.css";
function RatingSelect( props) {
  const [selected, setSelected] = useState(10);
  const handleChange = e => {
    setSelected(+e.currentTarget.value);
    props.select(+e.currentTarget.value);
  };
  return (
    <ul className="rating">
      <li>
        <input
          type="radio"
          id={props.questionNo + "1"}
          name={props.questionNo}
          value="1"
          onChange={handleChange}
          checked={selected === 1}
        />
        <label htmlFor={props.questionNo + "1"}>1</label>
      </li>
      <li>
        <input
         type="radio"
         id={props.questionNo + "2"}
        name={props.questionNo}
        value="2"
        onChange={handleChange}
        checked={selected === 2}
         />
       <label htmlFor={props.questionNo + "2"}>2</label>
     </li>
   <li>
     <input
      type="radio"
      id={props.questionNo + "3"}
      name={props.questionNo}
      value="3"
      onChange={handleChange}
      checked={selected === 3}
     />
     <label htmlFor={props.questionNo + "3"}>3</label>
  </li>
  <li>
    <input
     type="radio"
     id={props.questionNo + "4"}
     name={props.questionNo}
     value="4"
     onChange={handleChange}
     checked={selected === 4}
     />
     <label htmlFor={props.questionNo + "4"}>4</label>
   </li>
   <li>
      <input
       type="radio"
       id={props.questionNo + "5"}
       name={props.questionNo}
       value="5"
       onChange={handleChange}
       checked={selected === 5}
      />
      <label htmlFor={props.questionNo + "5"}>5</label>
    </li>
    <li>
      <input
       type="radio"
       id={props.questionNo + "6"}
       name={props.questionNo}
       value="6"
       onChange={handleChange}
       checked={selected === 6}
       />
    <label htmlFor={props.questionNo + "6"}>6</label>
  </li>
 <li>
   <input
    type="radio"
    id={props.questionNo + "7"}
    name={props.questionNo}
    value="7"
    onChange={handleChange}
    checked={selected === 7}
    />
    <label htmlFor={props.questionNo + "7"}>7</label>
  </li>
  <li>
    <input
     type="radio"
     id={props.questionNo + "8"}
     name={props.questionNo}
     value="8"
     onChange={handleChange}
     checked={selected === 8}
    />
    <label htmlFor={props.questionNo + "8"}>8</label> 
  </li>
  <li>
    <input
     type="radio"
     id={props.questionNo + "9"}
     name={props.questionNo}
     value="9"
     onChange={handleChange}
     checked={selected === 9}
     />
      <label htmlFor={props.questionNo + "9"}>9</label>
   </li>
   <li>
    <input
     type="radio"
     id={props.questionNo + "10"}
     name={props.questionNo}
     value="10"
     onChange={handleChange}
    checked={selected === 10}
   />
    <label htmlFor={props.questionNo + "10"}>10</label>
   </li>
   </ul>
  );
}
export default RatingSelect;