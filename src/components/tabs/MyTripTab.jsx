import React, { useState } from 'react';

const MyTripTab = () => {
  const [myPlaces, setMyPlaces] = useState([
    { id: 1, name: 'Taipei 101 Ticket', price: 600 },
    { id: 2, name: 'Dinner at Din Tai Fung', price: 800 },
    { id: 3, name: 'MRT Day Pass', price: 180 },
  ]);

  const addPlace = () => {
    const newPlace = {
      id: Date.now(),
      name: `Random Activity ${myPlaces.length + 1}`,
      price: Math.floor(Math.random() * 500) + 100, // Random price between 100 and 600
    };
    setMyPlaces([...myPlaces, newPlace]);
  };

  const removePlace = (id) => {
    setMyPlaces(myPlaces.filter((place) => place.id !== id));
  };

  const totalTWD = myPlaces.reduce((sum, place) => sum + place.price, 0);
  const totalKRW = Math.round(totalTWD * 42.5);

  // Helper to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '140px' }}> {/* Extra padding for sticky bars */}
      <h2>My Trip</h2>
      <button onClick={addPlace} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Add Random Place
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myPlaces.map((place) => (
          <li key={place.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee'
          }}>
            <div>
              <strong>{place.name}</strong>
              <div style={{ color: '#666' }}>{place.price} TWD</div>
            </div>
            <button onClick={() => removePlace(place.id)} style={{ color: 'red', border: '1px solid red', padding: '5px 10px', borderRadius: '5px', background: 'transparent' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Sticky Budget Bar */}
      <div style={{
        position: 'fixed',
        bottom: '68px', // Above the GNB
        left: 0,
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: '15px 20px',
        boxSizing: 'border-box',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 900,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
        Total Budget Today: {formatNumber(totalTWD)} TWD (approx. {formatNumber(totalKRW)} KRW)
      </div>
    </div>
  );
};

export default MyTripTab;
