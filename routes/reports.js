const express = require('express');
const agentsModel = require('../models/agents');

const router = express.Router();

router.post('/add-custom-id', async (req, res) => {
  const { id, customId } = req.body;
  await agentsModel.addCustomId(id, customId);
  res.send({ message: 'Custom id added successfully' });
});

module.exports = router;
