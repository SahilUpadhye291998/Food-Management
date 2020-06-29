import React, {Component} from 'react';
import {Store} from '../../flux';
import CustomerSupplierTransaction from './CustomerSupplierTransaction';
import FarmerSupplerTransaction from './FarmerSupplerTransaction';
import SupplierFarmerTranaction from './SupplierFarmerTranaction';
import SupplierCustomerTransaction from './SupplierCustomerTransaction';

export default class BaseTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Store.getToLoad(),
    };
  }

  render() {
    if (this.state.user === 'customer') {
      return <CustomerSupplierTransaction />;
    } else if (this.state.user === 'farmer') {
      return <FarmerSupplerTransaction />;
    } else if (this.state.user === 'supplier') {
      return (
        <div>
          <SupplierCustomerTransaction />
          <SupplierFarmerTranaction />
        </div>
      );
    } else {
      return <p>Somethings wrong!!</p>;
    }
  }
}
