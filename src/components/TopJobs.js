import React, { useState, useEffect } from 'react';
import base_url from '../api/bootapi';

const TopJobs = () => {
  const [topJobs, setTopJobs] = useState([]);

  useEffect(() => {
    // Fetch the data from the endpoint
    fetch(`${base_url}/jobs/top-active`)
      .then(response => response.json())
      .then(data => setTopJobs(data))
      .catch(error => console.error('Error fetching top active jobs:', error));
  }, []);

  return (
    <div>
      <h2>Top 10 Active Jobs</h2>
      <ul>
        {topJobs.map(job => (
          <li key={job.id}>
            <h3>{job.description}</h3>
            <p>Requirements: {job.requirements}</p>
            <p>Poster: {job.posterName}</p>
            <p>Contact Info: {job.contactInfo}</p>
            <p>Active: {job.active ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopJobs;
