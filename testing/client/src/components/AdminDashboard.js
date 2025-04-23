import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: token }
  });

  // Get all requests
  const fetchRequests = async () => {
    try {
      const res = await api.get('/reimbursements/all');
      setRequests(res.data);
    } catch (err) {
      alert('Access Denied or Error fetching data');
    }
  };

  // Approve or Reject
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/reimbursements/update/${id}`, { status });
      fetchRequests();
    } catch (err) {
      alert('Update failed');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.employee?.name}</td>
              <td>{req.employee?.email}</td>
              <td>{req.amount}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                {req.status === 'Pending' ? (
                  <>
                    <button onClick={() => updateStatus(req._id, 'Approved')}>Approve</button>
                    <button onClick={() => updateStatus(req._id, 'Rejected')}>Reject</button>
                  </>
                ) : (
                  req.status
                )}
              </td>
              <td>{new Date(req.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
