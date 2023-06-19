import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Review from './Review'
import { Routes, Route, useNavigate } from 'react-router-dom';


function SearchBoxReview(){
    const   [place, setPlace] = useState('');
    const navigate = useNavigate();
    const [placeIdRec, setPlaceId] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The place you entered was: ${place}`)
        

        // get the place id from backend and set the session variable
        // fetch(`http://localhost:9000/api/ratingsPlaceId`)
        //  .then((response) => response.json())
        //  .then((actualData) => {setPlaceId(actualData[0].placeId);})
        //  .then(alert(placeIdRec))
        //  .then( sessionStorage.setItem('placeIdRec', placeIdRec))
        //  .then(navigate('/review'));

        fetch(`http://localhost:3001/api/ratingsPlaceId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "placeName": `${place}` 
        })

      })
         .then((response) => response.json())
         .then((json) => {
            // Handle data
            //console.log(json);
            // sessionStorage.setItem('placeIdRec', json.placeId);
            
            navigate('/review?placeIdURL='+json.placeId);
            
         })
        .catch((err) => {
            console.log(err.message);
            return 404;
         });
        
        
        
    }

    return (
        <form id="searchBar" onSubmit={handleSubmit}>
            <center>
        <div className="searchBar">
            <div class="searchInputBoxCont"><input class="searchInputBox" onChange={(e) => setPlace(e.target.value)} value={place}/></div>
            <button type='submit' class="btn btn-info searchBtn">Review</button>
            {/* <div><Link to="/review"><button class="btn btn-info searchBtn">Review</button></Link></div> */}
        
        </div>
        </center>   
        </form>

    );
}


export default SearchBoxReview;