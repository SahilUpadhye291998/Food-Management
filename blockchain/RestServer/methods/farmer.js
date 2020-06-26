const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin,
} = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org3.json");

async function registerFarmer(secretFarmerName, companyOrg) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(companyOrg);

    const userExists = await wallet.exists(secretFarmerName);
    if (userExists) {
      console.log(
        'An identity for the user "user1" already exists in the wallet'
      );
      return;
    }
    const adminExists = await wallet.exists("adminOrg3");
    if (!adminExists) {
      console.log(
        'An identity for the admin user "adminOrg3" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "adminOrg3", //TODO: check if we can change this
      discovery: { enabled: true, asLocalhost: true },
    });
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();

    const secret = await ca.register(
      {
        affiliation: `${companyOrg}.department1`,
        enrollmentID: `${secretFarmerName}`,
        role: "client",
      },
      adminIdentity
    );
    console.log("ok");
    const enrollment = await ca.enroll({
      enrollmentID: `${secretFarmerName}`,
      enrollmentSecret: secret,
    });

    const msp =
      companyOrg.charAt(0).toUpperCase() + companyOrg.slice(1) + "MSP";
    const userIdentity = X509WalletMixin.createIdentity(
      `${msp}`,
      enrollment.certificate,
      enrollment.key.toBytes()
    );

    await wallet.import(secretFarmerName, userIdentity);
    console.log(
      'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
    );
  } catch (error) {
    console.error(error);
    console.log("Some error has occured please contact web Master");
  }
}

async function initFarmer(
  secretUserName,
  companyName,
  companyAddress,
  companyMobile,
  companySecret
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretUserName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretUserName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    await contract.submitTransaction(
      "initFarmer",
      companyName,
      companyAddress,
      companyMobile,
      companySecret
    );

    const json = {
      message: "Successfully Signed Up",
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium",
    };
    console.log("Some error has occured please contact web Master");
  }
}

async function readFarmerByOwnerAndPassword(
  secretFarmerName,
  companyName,
  companyPassword
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretFarmerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretFarmerName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    const result = await contract.evaluateTransaction(
      "queryFarmerByOwnerAndPassword",
      companyName,
      companyPassword
    );

    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readFarmer(secretFarmerName, companyName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretFarmerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretFarmerName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    const result = await contract.evaluateTransaction(
      "queryUserByFarmer",
      companyName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readFarmerHistory(secretFarmerName, companyName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretFarmerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretFarmerName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    const result = await contract.evaluateTransaction(
      "getHistoryForFarmer",
      companyName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readFarmerSupplierData(secretCustomerName, userName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    const result = await contract.evaluateTransaction(
      "readFarmerSupplierData",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function addProductFarmerSupplier(
  farmerID,
  supplierID,
  productName,
  productQuantity,
  productPrice
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = await network.getContract("mycc");

    await contract.submitTransaction(
      "addProductFarmerSupplier",
      farmerID,
      supplierID,
      productName,
      productQuantity,
      productPrice
    );

    const json = {
      message: "Successfully Signed Up",
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium",
    };
    console.log("Some error has occured please contact web Master");
    return json;
  }
}

module.exports = {
  registerFarmer,
  initFarmer,
  readFarmerByOwnerAndPassword,
  readFarmer,
  readFarmerHistory,
  readFarmerSupplierData,
  addProductFarmerSupplier,
};
