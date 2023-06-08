import React, { useState, useEffect } from 'react';
import My_map from './My_map';
import './App.css';
import welcomeImage from './data/welcome.png';


function App() {
  const [showMap, setShowMap] = useState(false);
  const parkName="PopPark";
  const parkDescription="Amusement park for children and adults";
  const date="June 9, 2023";
  const ExpectedAmount="10,100";
  const location="realStreet , realCountry "

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      

      if (scrolled + windowHeight >= fullHeight) {
        setShowMap(true);
      } else {
        setShowMap(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <div className={`fullscreen ${showMap ? 'hidden' : ''}`} style={{ backgroundImage: `url(${welcomeImage})` }}>
      </div>
      <div className={`map-container ${showMap ? 'show' : ''}`}>
        <My_map parkName={parkName} parkDescription={parkDescription} date={date} ExpectedAmount={ExpectedAmount} location={location}></My_map>
      </div>
    </div>
  );
}

export default App;











