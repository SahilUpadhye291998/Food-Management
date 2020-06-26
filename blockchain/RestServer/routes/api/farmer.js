const express = require("express");
const router = express.Router();

const user = require("../../methods/farmer");

//@route    POST api/company/registerCompany
//@desc     To generate Company credentials
//@access   PUBLIC
router.post("/registerFarmer", async (req, res) => {
  console.log(req.body.orgName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerOrg = req.body.orgName;
  const json = {};
  user
    .registerFarmer(secretFarmerName, farmerOrg)
    .then(() => {
      json.code = 200;
      json.Message = "Company enrolled successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.Message = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/company/signup
//@desc     To signup Company and initialize in Blockchain
//@access   PUBLIC
router.post("/signup", (req, res) => {
  console.log(req.body.secretCompanyName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerAddress = req.body.farmerAddress;
  const farmerMobile = req.body.farmerMobile;
  const farmerSecret = req.body.farmerSecret;
  const farmerAmount = req.body.farmerAmount;
  const json = {};
  user
    .initFarmer(
      secretFarmerName,
      farmerName,
      farmerAddress,
      farmerMobile,
      farmerSecret,
      farmerAmount
    )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/login
//@desc     To login Company from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;
  const farmerPassword = req.body.farmerSecret;
  const json = {};
  user
    .readFarmerByOwnerAndPassword(
      secretFarmerName,
      farmerName + farmerMobile,
      farmerPassword
    )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/company/readCompany
//@desc     To read company with name in hyperledger
//@access   PUBLIC
router.post("/readCompany", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;

  const json = {};
  user
    .readFarmer(secretFarmerName, farmerName + farmerMobile)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/company/readCompanyHistory
//@desc     Read the history of the company with transaction history
//@access   PUBLIC
router.post("/readCompanyHistory", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;

  const json = {};
  user
    .readFarmerHistory(secretFarmerName, farmerName + farmerMobile)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

module.exports = router;
