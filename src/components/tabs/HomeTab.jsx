import React from 'react';

const HomeTab = () => {
  const courses = [
    { id: 1, title: 'Taipei 101 View', image: 'https://via.placeholder.com/300x200?text=Taipei+101' },
    { id: 2, title: 'Night Market Tour', image: 'https://via.placeholder.com/300x200?text=Night+Market' },
    { id: 3, title: 'Jiufen Old Street', image: 'https://via.placeholder.com/300x200?text=Jiufen' },
    { id: 4, title: 'Beitou Hot Springs', image: 'https://via.placeholder.com/300x200?text=Hot+Springs' },
    { id: 5, title: 'Tamsui Fisherman\'s Wharf', image: 'https://via.placeholder.com/300x200?text=Tamsui' },
  ];

  const adCard = {
    id: 'ad',
    title: 'Taiwan Travel Insurance 30% Off',
    image: 'https://via.placeholder.com/300x200?text=Insurance+Ad',
    isAd: true,
  };

  const displayCourses = [...courses];
  displayCourses.splice(2, 0, adCard); // Insert ad at index 2

  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <h2>Recommended Courses</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '16px',
        padding: '10px 0',
      }}>
        {displayCourses.map((course) => (
          <div key={course.id} style={{
            minWidth: '280px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: course.isAd ? '#fff3cd' : '#fff', // Highlight ad slightly
          }}>
            <img src={course.image} alt={course.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{course.title}</h3>
              {course.isAd && <span style={{ fontSize: '12px', color: '#856404', fontWeight: 'bold' }}>Sponsored</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Simulate other content */}
      <div style={{ marginTop: '30px' }}>
        <h3>Explore More</h3>
        <p>Discover the hidden gems of Taipei.</p>
      </div>
    </div>
  );
};

export default HomeTab;
