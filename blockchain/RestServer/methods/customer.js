const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin,
} = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org1.json");

async function registerCustomer(secretCustomerName, userOrg) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists(secretCustomerName);
    if (userExists) {
      console.log(
        `An identity for the user ${secretCustomerName} already exists in the wallet`
      );
      return;
    }
    const adminExists = await wallet.exists("adminOrg1");
    if (!adminExists) {
      console.log(
        'An identity for the admin user "adminOrg1" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "adminOrg1", //TODO: check if we can change this
      discovery: { enabled: true, asLocalhost: true },
    });
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();

    const secret = await ca.register(
      {
        affiliation: `${userOrg}.department1`,
        enrollmentID: `${secretCustomerName}`,
        role: "client",
      },
      adminIdentity
    );
    const enrollment = await ca.enroll({
      enrollmentID: `${secretCustomerName}`,
      enrollmentSecret: secret,
    });

    const msp = userOrg.charAt(0).toUpperCase() + userOrg.slice(1) + "MSP";
    const userIdentity = X509WalletMixin.createIdentity(
      `${msp}`,
      enrollment.certificate,
      enrollment.key.toBytes()
    );

    await wallet.import(secretCustomerName, userIdentity);
    console.log(
      'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
    );
  } catch (error) {
    console.error(error);
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomer(secretCustomerName, userName) {
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
      "queryCustomerByOwner",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomerHistory(secretCustomerName, userName) {
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
      "getHistoryForCustomer",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomerByOwnerAndPassword(
  secretCustomerName,
  userName,
  userPassword
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

    const result = await contract.evaluateTransaction(
      "queryCustomerByOwnerAndPassword",
      userName,
      userPassword
    );

    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function initCustomer(
  secretCustomerName,
  userName,
  userAddress,
  userMobile,
  userSecret,
  userAmount,
  userPremiumAmount
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
      "initCustomer",
      userName,
      userAddress,
      userMobile,
      userSecret,
      userAmount,
      userPremiumAmount
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

module.exports = {
  registerCustomer,
  readCustomer,
  readCustomerHistory,
  readCustomerByOwnerAndPassword,
  initCustomer,
};
