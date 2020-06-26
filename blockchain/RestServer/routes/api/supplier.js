const express = require("express");
const router = express.Router();

const user = require("../../methods/supplier");

//@route    POST api/company/registerCompany
//@desc     To generate Company credentials
//@access   PUBLIC
router.post("/registerSupplier", async (req, res) => {
  console.log(req.body.orgName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierOrg = req.body.orgName;
  const json = {};
  user
    .registerSupplier(secretSupplierName, supplierOrg)
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
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierAddress = req.body.supplierAddress;
  const supplierMobile = req.body.supplierMobile;
  const supplierSecret = req.body.supplierSecret;
  const supplierAmount = req.body.supplierAmount;
  const json = {};
  user
    .initSupplier(
      secretSupplierName,
      supplierName,
      supplierAddress,
      supplierMobile,
      supplierSecret,
      supplierAmount
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

//@route    POST api/company/login
//@desc     To login Company from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUserName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const supplierPassword = req.body.supplierSecret;
  const json = {};
  user
    .readSupplierByOwnerAndPassword(
      secretSupplierName,
      supplierName + supplierMobile,
      supplierPassword
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
router.post("/readSupplier", (req, res) => {
  console.log(req.body.secretUserName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;

  const json = {};
  user
    .readCompany(secretSupplierName, supplierName + supplierMobile)
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
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;

  const json = {};
  user
    .readSupplierHistory(secretSupplierName, supplierName + supplierMobile)
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

//@route    POST api/user/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/readSupplierCustomerData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUsername;
  const userName = req.body.username;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readSupplierCustomerData(secretUserName, userName + userMobile)
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

//@route    POST api/user/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/readSupplierFarmerData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUsername;
  const userName = req.body.username;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readSupplierFarmerData(secretUserName, userName + userMobile)
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

//@route    POST api/user/addProductCustomerSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductCustomerSupplier", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUsername;
  const userName = req.body.username;
  const userMobile = req.body.userMobile;
  const supplierName = req.body.suppliername;
  const supplierMobile = req.body.supplierMobile;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const json = {};
  user
    .addProductCustomerSupplier(
      secretUserName,
      userName + userMobile,
      supplierName + supplierMobile,
      productName,
      productQuantity,
      productPrice
    )
    .then((result) => {
      json.code = 200;
      json.data = result;
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/user/addProductCustomerSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductFarmerSupplier", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUsername;
  const farmerName = req.body.farmername;
  const farmerMobile = req.body.farmerMobile;
  const supplierName = req.body.suppliername;
  const supplierMobile = req.body.supplierMobile;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const json = {};
  user
    .addProductFarmerSupplier(
      secretUserName,
      farmerName + farmerMobile,
      supplierName + supplierMobile,
      productName,
      productQuantity,
      productPrice
    )
    .then((result) => {
      json.code = 200;
      json.data = result;
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

module.exports = router;
