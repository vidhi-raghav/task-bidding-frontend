import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';

function RecentJobPostings() {
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    fetchRecentJobPostings();
  }, []);

  const fetchRecentJobPostings = async () => {
    try {
      const response = await axios.get(`${base_url}/job/recent`);
      setRecentJobs(response.data);
    } catch (error) {
      console.error('Error fetching recent job postings:', error);
    }
  };

  return (
    <div>
      <h2>Recent Job Postings</h2>
      <ul>
        {recentJobs.map((job) => (
          <li key={job.id}>
            <h3>JOB requirment: {job.requirements}</h3>
            <p>Job Description: {job.description}</p>
            {/* Render other job details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentJobPostings;
