const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('This is a connected bridge');
});

module.exports = router;
