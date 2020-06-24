// see how we can transfer the amount from the customer to company
// i see the code to be written would be more appropriate if written on comany side
"use strict";
const shim = require("fabric-shim");
const util = require("util");

let Chaincode = class {
  async Init(stub) {
    const ret = stub.getFunctionAndParameters();
    console.info(ret);
    console.info("Sample Chaincode is initalized");
    return shim.success();
  }

  async Invoke(stub) {
    console.info(`Transaction ID is ${stub.getTxID()}`);
    console.info(util.format(`Args ${stub.getArgs()}`));
    const ret = stub.getFunctionAndParameters();
    console.info(ret);
    const method = this[ret.fcn];
    if (!method) {
      console.info(`Received unknow ${ret.fcn} invocation`);
      throw new Error(`Received unknow ${ret.fcn} invocation`);
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (error) {
      console.log(error);
      return shim.error(error);
    }
  }

  async initCustomer(stub, args, thisClass) {
    if (args.length != 6) {
      throw new Error("Incorrect number of arguments. Expecting 4");
    }
    console.info("--- start init customers ---");
    if (args[0].length <= 0) {
      throw new Error("1st argument must be a non-empty string");
    }
    if (args[1].length <= 0) {
      throw new Error("2nd argument must be a non-empty string");
    }
    if (args[2].length <= 0) {
      throw new Error("3rd argument must be a non-empty string");
    }
    if (args[3].length <= 0) {
      throw new Error("4th argument must be a non-empty string");
    }
    if (args[4].length <= 0) {
      throw new Error("5th argument must be a non-empty string");
    }
    if (args[5].length <= 0) {
      throw new Error("5th argument must be a non-empty string");
    }
    let customerName = args[0];
    let customerAddress = args[1];
    let customerMobile = args[2];
    let customerSecret = args[3];
    let customerAmount = parseInt(args[4]);
    if (typeof customerAmount !== "number") {
      throw new Error(`3rd argument should be a numeric type`);
    }
    let customerPremiumAmount = parseFloat(args[5]);
    if (typeof customerPremiumAmount !== "number") {
      throw new Error(`3rd argument should be a numeric type`);
    }

    let customerState = await stub.getState(customerName);
    if (customerState.toString()) {
      throw new Error(`User already exists`);
    }

    let customer = {};
    customer.docType = "customer";
    customer.name = customerName;
    customer.mobile = customerMobile;
    customer.address = customerAddress;
    customer.secret = customerSecret;
    customer.amount = customerAmount;
    customer.premiumAmount = customerPremiumAmount;
    customer.compansatedAmount = 0;

    await stub.putState(customerName, Buffer.from(JSON.stringify(customer)));

    let indexName = `secret~name`;
    let secretNameIndexKey = await stub.createCompositeKey(indexName, [
      customer.secret,
      customer.name,
    ]);
    console.log(secretNameIndexKey);

    await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
    console.info("end of initialzation");
  }

  async readCustomer(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting name of the marble to query"
      );
    }

    let argUser = args[0];
    if (!argUser) {
      throw new Error(`Name cant be blank`);
    }

    let customer = await stub.getState(argUser);
    if (!customer) {
      let jsonResponce = {};
      jsonResponce.Error = `Unable to find customer with given phone number`;
      throw new Error(JSON.stringify(jsonResponce));
    }

    console.log(
      "====================================================================="
    );
    console.log(customer.toString());
    console.log(
      "====================================================================="
    );
    return customer;
  }

  async queryCustomerByOwner(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error("Incorrect number of arguments. Expecting owner name.");
    }

    let owner = args[0];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.docType = "customer";
    queryString.selector.name = owner;
    let method = thisClass["getQueryResultForQueryString"];
    let queryResults = await method(
      stub,
      JSON.stringify(queryString),
      thisClass
    );
    return queryResults; //shim.success(queryResults);
  }


  async queryCustomerByOwnerAndPassword(stub, args, thisClass) {
    //   0
    // 'bob'
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments. Expecting owner name.");
    }

    let owner = args[0];
    let password = args[1];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.docType = "customer";
    queryString.selector.name = owner;
    queryString.selector.secret = password;
    let method = thisClass["getQueryResultForQueryString"];
    let queryResults = await method(
      stub,
      JSON.stringify(queryString),
      thisClass
    );
    return queryResults; //shim.success(queryResults);
  }

  async getHistoryForCustomer(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error("Incorrect number of arguments. Expecting 1");
    }
    let customerName = args[0];
    console.info("- start getHistoryForMarble: %s\n", customerName);

    let resultsIterator = await stub.getHistoryForKey(customerName);
    let method = thisClass["getAllResults"];
    let results = await method(resultsIterator, true);

    return Buffer.from(JSON.stringify(results));
  }

  async getQueryResultForQueryString(stub, queryString, thisClass) {
    console.info("- getQueryResultForQueryString queryString:\n" + queryString);
    let resultsIterator = await stub.getQueryResult(queryString);
    let method = thisClass["getAllResults"];

    let results = await method(resultsIterator, false);

    return Buffer.from(JSON.stringify(results));
  }

  async getAllResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString("utf8"));

        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.tx_id;
          jsonRes.Timestamp = res.value.timestamp;
          jsonRes.IsDelete = res.value.is_delete.toString();
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString("utf8");
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString("utf8");
          }
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log("end of data");
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }
};

shim.start(new Chaincode());
