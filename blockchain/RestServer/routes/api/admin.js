const express = require("express");
const router = express.Router();
const admin = require("../../methods/enrollAdmin");

//@route    POST api/admin/
//@desc     To generate admin credentials
//@access   PUBLIC
router.post("/", async (req, res) => {
  console.info("Admin route called");
  const json = {};
  admin
    .enrollCustomer()
    .then(() => {
      json.code = 200;
      json.userMessage = "Customer Admin enrolled successfully";
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.userMessage = "Some error has occured";
    });

  admin
    .enrollSupplier()
    .then(() => {
      json.code = 200;
      json.companyMessage = "Supplier Admin enrolled successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occured";
      res.status(500).send(json);
    });

  admin
    .enrollFarmer()
    .then(() => {
      json.code = 200;
      json.companyMessage = "Farmer Admin enrolled successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occured";
      res.status(500).send(json);
    });
});

module.exports = router;
