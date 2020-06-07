const express = require('express');
const router = express.Router();
const User = require('../../model/User');

router.post('/add', (req, res) => {
  console.log(`Adding this to list`);
});

router.delete('/delete', (req, res) => {
  console.log(`Deletion will be placed here`);
});

router.get('/getAll', (req, res) => {
  console.log(`Get all the Data of customer`);
});

router.get('/get/:id', (req, res) => {
  console.log(`Get all ${req.params.id}`);
});

module.exports = router;
