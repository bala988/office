import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem('token');

  // Set token on Axios
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: token }
  });

  // Submit reimbursement
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reimbursements', { amount, reason });
      alert('Request submitted!');
      fetchRequests();
      setAmount('');
      setReason('');
    } catch (err) {
      alert('Error submitting request');
    }
  };

  // Fetch all user's requests
  const fetchRequests = async () => {
    try {
      const res = await api.get('/reimbursements/my');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit">Submit Request</button>
      </form>

      <h3>My Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.amount}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>{new Date(req.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
