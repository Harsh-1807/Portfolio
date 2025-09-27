import React from 'react';
import './Recommendations.css';
import chrisProfilePic from '../images/chris.jpg'; // Adjust the path based on your directory structure

const Recommendations: React.FC = () => {
  return (
    <div className='timeline-container'>
      <div className="recommendation-card">
        <div className="recommendation-header">
          <img src={chrisProfilePic} alt="Chris Smith" className="profile-pic" />
          <div>
            <h3>Chris Smith</h3>
            <p></p>
            <p className="date">September 24, 2025</p>
          </div>
        </div>
        <div className="recommendation-body">
          <p>Harsh is a hardworking and dedicated individual. He is a quick learner and always willing to help. He is a great asset to any team.</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
