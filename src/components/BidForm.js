import React, { useState } from 'react';
import axios from 'axios';

function BidForm() {
  const [bidData, setBidData] = useState({
    jobId: '',
    amount: '',
    bidderName: '',
    bidderMobile: '',
    bidderEmail: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBidData({ ...bidData, [name]: value });
    // Clear previous errors when the user starts typing in a field
    setErrors({ ...errors, [name]: undefined });
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = (email) => {
    const emailRegex = /^(.+)@(.+)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number and email address
    const mobileValid = validateMobile(bidData.bidderMobile);
    const emailValid = validateEmail(bidData.bidderEmail);

    if (!mobileValid) {
      setErrors((prevErrors) => ({ ...prevErrors, bidderMobile: 'Invalid mobile number' }));
    }

    if (!emailValid) {
      setErrors((prevErrors) => ({ ...prevErrors, bidderEmail: 'Invalid email address' }));
    }

    // If validation fails, don't submit the form
    if (!mobileValid || !emailValid) {
      return;
    }

    try {
      await axios.post('http://localhost:8080/bids/place', bidData);
      alert('Bid placed successfully!');
      // Clear form fields or do any other necessary actions upon successful bid placement
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return (
    <div>
      <h2>Place Bid</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job ID:
          <input type="text" name="jobId" value={bidData.jobId} onChange={handleChange} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" name="amount" value={bidData.amount} onChange={handleChange} />
        </label>
        <br />
        <label>
          Bidder Name:
          <input type="text" name="bidderName" value={bidData.bidderName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile:
          <input
            type="text"
            name="bidderMobile"
            value={bidData.bidderMobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.bidderMobile && <p className="error">{errors.bidderMobile}</p>}
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="bidderEmail"
            value={bidData.bidderEmail}
            onChange={handleChange}
            placeholder="Enter valid email address"
          />
          {errors.bidderEmail && <p className="error">{errors.bidderEmail}</p>}
        </label>
        <br />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
}

export default BidForm;
