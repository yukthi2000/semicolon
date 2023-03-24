import { useState } from 'react';


function TestRadioRating(props) {
    const [rating, setRating] = useState(2);
    const handleChange = e => {
        setRating(e.currentTarget.value);
        alert(rating);
        
    }
    return ( 
        <ul className="rating">
            <li>
            <input type="radio" name="name" id="1" value={1} />
            <label htmlFor="num1">1</label>
            </li>
            <li>
            <input type="radio" name="name" id="2" value={2}/>
            <label htmlFor="num2">2</label>
            </li>
            {/* <li>
            <input type="radio" name={"q" + props.qNo} id={props.qNo + "_3"} value={3} onClick={(event) => setRating(event.currentTarget.value)} />
            <label htmlFor="num3">3</label>
            </li>
            <li>
            <input type="radio" name={"q" + props.qNo} id={props.qNo + "_4"} value={4} onClick={(event) => setRating(event.currentTarget.value)} />
            <label htmlFor="num4">4</label>
            </li> */}
        </ul>
     );
}

export default TestRadioRating;