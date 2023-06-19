

export default async function postReview(placeId, userId, avgRating, comment){

    fetch(`http://localhost:9000/api/ratings/${placeId}/${userId}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "avgRating": avgRating,
                "comment": `${comment}`
        })

      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            return 200;
            // Handle data
         })
         .catch((err) => {
            console.log(err.message);
            return 404;
         });

}