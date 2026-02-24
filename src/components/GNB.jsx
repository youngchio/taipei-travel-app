import React from 'react';
import { Home, Map, Newspaper, Info, User } from 'lucide-react';

const GNB = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'course-maker', label: 'Course Maker', icon: Map },
    { id: 'taipei-now', label: 'Taipei Now', icon: Newspaper },
    { id: 'local-insights', label: 'Local Insights', icon: Info },
    { id: 'my-trip', label: 'My Trip', icon: User },
  ];

  return (
    <nav style={styles.nav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              ...styles.button,
              color: isActive ? '#007BFF' : '#666',
            }}
          >
            <Icon size={24} />
            <span style={styles.label}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    padding: '10px 0',
    zIndex: 1000,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
  },
  label: {
    marginTop: '4px',
  },
};

export default GNB;
