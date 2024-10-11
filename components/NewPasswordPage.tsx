"use client";  // This tells Next.js to treat this as a client component

import React, { useState } from 'react';

const NewPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      // Submit the new password logic here
      console.log("Password changed successfully!");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Create New Password</h1>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: '10px', width: '100%', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
