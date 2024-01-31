import React, { useState } from 'react';
import useFormSubmit from '../hooks/useFormSubmit';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: '',
    requirements: '',
    posterName: '',
    contactInfo: '',
    expirationDateTime: '' // New state for expiration date and time
  });
  const { submitJob, loading, error } = useFormSubmit();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Log the form data (for debugging)
      console.log("Form data:", formData);
      
      // Submit the form data
      await submitJob(formData);

      // Clear the form data after successful submission
      setFormData({
        description: '',
        requirements: '',
        posterName: '',
        contactInfo: '',
        expirationDateTime: '' // Clear expiration date and time as well
      });
    } catch (error) {
      // Error handling is already handled inside the hook
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          rows="4"
          cols="50"
          maxLength="16384"
          required
        />
      </label><br />
      <label>
        Job Requirements:
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Enter job requirements"
          rows="4"
          cols="50"
          maxLength="16384"
          required
        />
      </label><br />
      <label>
        Name of the Job Poster:
        <input
          type="text"
          name="posterName"
          value={formData.posterName}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </label><br />
      <label>
        Contact Info:
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="Enter your contact information"
          required
        />
      </label><br />
      <label>
        Expiration Date and Time:
        <input
          type="datetime-local" // Use datetime-local input type for date and time
          name="expirationDateTime"
          value={formData.expirationDateTime}
          onChange={handleChange}
          required
        />
      </label><br />
      <button type="submit" disabled={loading}>Submit</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default JobForm;
