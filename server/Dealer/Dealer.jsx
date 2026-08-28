import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dealerRes = await fetch(`http://localhost:3030/fetchDealer/${id}`);
      const dealerData = await dealerRes.json();
      setDealer(dealerData);

      const reviewsRes = await fetch(`http://localhost:3030/fetchReviews/dealer/${id}`);
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData);
    };
    fetchData();
  }, [id]);

  if (!dealer) return <div>Loading...</div>;

  return (
    <div>
      <h1>{dealer.full_name}</h1>
      <p>{dealer.city}, {dealer.state} - {dealer.address}, {dealer.zip}</p>
      <Link to={`/postreview/${id}`}>Post Review</Link>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id}>
            <p><strong>{r.name}</strong> - {r.car_year} {r.car_make} {r.car_model}</p>
            <p>{r.review}</p>
            {r.sentiment && <p>Sentiment: {r.sentiment}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Dealer;