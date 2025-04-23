const Reimbursement = require('../models/Reimbursement');

exports.submitRequest = async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const newRequest = new Reimbursement({
      employee: req.user.id,
      amount,
      reason
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Reimbursement.find({ employee: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const requests = await Reimbursement.find().populate('employee', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { status } = req.body;
    const updated = await Reimbursement.findByIdAndUpdate(
      req.params.id,
      { status, decisionBy: req.user.id },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
