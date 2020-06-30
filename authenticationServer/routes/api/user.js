const express = require('express');
const router = express.Router();
const User = require('../../model/User');

router.post('/add', (req, res) => {
  const inputBody = {
    name: req.body.name,
    mobileNum: req.body.mobileNum,
    secret: req.body.secret,
    address: req.body.address,
    typeOf: req.body.typeOf,
    customerSecret: req.body.customerSecret,
  };
  const user = new User(inputBody);
  user
    .save()
    .then(data => {
      console.log('Data', data);
      return res.status(200).json({message: 'Record inserted Successfully'});
    })
    .catch(err => {
      console.error('data', err);
      return res
        .status(500)
        .json({message: 'Record not inserted Successfully'});
    });
});

router.post('/update/:id', (req, res) => {
  console.log(`Update will be placed here`);
  User.findById({_id: req.params.id}).then(user => {
    user.isAuthorized = true;
    user
      .save()
      .then(data => {
        console.log(data);
        return res.status(200).json({message: 'Record updated Successfully'});
      })
      .catch(err => {
        console.error(err);
        return res
          .status(500)
          .json({message: 'Record not updated Successfully'});
      });
  });
});

router.delete('/delete/:id', (req, res) => {
  console.log(`Deletion will be placed here`);
  User.findById({_id: req.params.id}).then(user => {
    user
      .remove()
      .then(() => {
        return res.status(200).json({message: 'Record deleted Successfully'});
      })
      .catch(() => {
        return res
          .status(500)
          .json({message: 'Record not deleted Successfully'});
      });
  });
});

router.get('/getAll', (req, res) => {
  console.log(`Get all the Data of customer`);
  User.find()
    .sort({date: -1})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err));
});

router.get('/get/:id', (req, res) => {
  console.log(`Get all ${req.params.id}`);
  User.findOne({_id: req.params.id})
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'No record found'});
    });
});

module.exports = router;
