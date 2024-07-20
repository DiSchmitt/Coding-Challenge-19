//Task 2: Gallery.js (Tour List Component):
//Store the fetched data in a state variable via useState.



import React, { useState, useEffect } from 'react';
import './App.css';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://raw.githubusercontent.com/DiSchmitt/Coding-Challenge-19/main/TourData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        const toursWithState = data.map(tour => ({ ...tour, isExpanded: false }));
        setTours(toursWithState);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleRemoveTour = (id) => {
    const updatedTours = tours.filter(tour => tour.id !== id);
    setTours(updatedTours);
  };

  const toggleReadMore = (id) => {
    const updatedTours = tours.map(tour =>
      tour.id === id ? { ...tour, isExpanded: !tour.isExpanded } : tour
    );
    setTours(updatedTours);
  };
//Handle and display loading and error states effectively.
  if (isLoading) {
    return <div className="loader">Currently Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
//Implement a "Read More"/"Show Less" button for each tour to toggle the visibility of more detailed information.
//Render each tour using a map function, including details and a "Not Interested" button to remove tours from the view.
  return (
    <>
      <div className="header">
        <h1>Tour Comparison App</h1>
      </div>
      <div className="gallery">
        {tours.length === 0 ? (
          <div className="no-tours">That was it for the tours.</div>
        ) : (
          tours.map((tour, index) => (
            <div key={tour.id} className="tour">
                <p></p>
              <img
                src={tour.image}
                alt={tour.name}
                className="tour-image"
              />
              
              <div className="tour-info">
                <h2>{tour.name}</h2>
                <h3>${tour.price}</h3>
                <p>
                  {tour.isExpanded ? tour.info : `${tour.info.substring(0, 200)}...`}
                  <p></p>
                  <button onClick={() => toggleReadMore(tour.id)}>
                    {tour.isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                </p>
                <button onClick={() => handleRemoveTour(tour.id)}>I'm not interested in this tour.</button>
              </div>
              {index !== tours.length - 1 && <hr className="tour-divider" />}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Gallery;
