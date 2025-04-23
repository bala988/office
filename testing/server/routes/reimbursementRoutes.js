const express = require('express');
const router = express.Router();
const { submitRequest, getMyRequests, getAllRequests, updateRequestStatus } = require('../controllers/reimbursementController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, submitRequest);
router.get('/my', authMiddleware, getMyRequests);

// Admin only routes
router.get('/all', authMiddleware, getAllRequests);
router.put('/update/:id', authMiddleware, updateRequestStatus);

module.exports = router;
