import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    // Get sentiment from Flask microservice
    const sentimentRes = await fetch(`http://localhost:5050/analyze/${encodeURIComponent(review)}`);
    const sentimentData = await sentimentRes.json();

    const newReview = {
      name,
      dealership: parseInt(id),
      review,
      purchase: true,
      purchase_date: new Date().toISOString().split('T')[0],
      car_make: carMake,
      car_model: carModel,
      car_year: parseInt(carYear),
      sentiment: sentimentData.sentiment,
    };

    await fetch("http://localhost:3030/postReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    navigate(`/dealer/${id}`);
  };

  return (
    <div>
      <h1>Post a Review</h1>
      <form onSubmit={submitReview}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Review</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        </div>
        <div>
          <label>Car Make</label>
          <input value={carMake} onChange={(e) => setCarMake(e.target.value)} />
        </div>
        <div>
          <label>Car Model</label>
          <input value={carModel} onChange={(e) => setCarModel(e.target.value)} />
        </div>
        <div>
          <label>Car Year</label>
          <input type="number" value={carYear} onChange={(e) => setCarYear(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostReview;