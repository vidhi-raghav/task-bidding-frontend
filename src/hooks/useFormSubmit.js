import { useState } from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';

const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitJob = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/jobs`, formData);
      console.log('Job submitted successfully:', response.data);
      return response.data; // Optionally return response data
    } catch (error) {
      console.error('Error submitting job:', error);
      setError('Failed to submit job. Please try again later.');
      throw error; // Re-throw the error for the caller to handle
    } finally {
      setLoading(false);
    }
  };

  return { submitJob, loading, error };
};

export default useFormSubmit;
