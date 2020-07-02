import React, { Component } from "react";
import { Store } from "../../flux";
import CustomerAmount from "./CustomerAmount";
import FarmerAmount from "./FarmerAmount";
import SupplierAmount from "./SupplierAmount";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Store.getToLoad()
    };
  }

  render() {
    if (this.state.user === "customer") {
      return <CustomerAmount />;
    } else if (this.state.user === "farmer") {
      return <FarmerAmount />;
    } else if (this.state.user === "supplier") {
      return <SupplierAmount />;
    } else {
      return <p>Somethings wrong!!</p>;
    }
  }
}
