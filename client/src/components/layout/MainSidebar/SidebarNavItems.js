import React from 'react';
import {Nav} from 'shards-react';

import SidebarNavItem from './SidebarNavItem';
import {Store} from '../../../flux';

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: Store.getSidebarItems(),
      navItemsAdmin: Store.getSidebarAdmin(),
      navItemsSupplier: Store.getSidebarSuppler(),
      navItemsCustomer: Store.getSidebarNavCustomer(),
      navItemsFarmer: Store.getSidebarNavFarmer(),
      user: Store.getToLoad(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems(),
    });
  }

  render() {
    const {
      navItems: items,
      navItemsAdmin: itemsAdmin,
      navItemsSupplier: itemsSupplier,
      navItemsFarmer: itemsFarmer,
      navItemsCustomer: itemsCustomer,
      user: user,
    } = this.state;
    if (user === 'admin') {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {itemsAdmin.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      );
    } else if (user === 'farmer') {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {itemsFarmer.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      );
    } else if (user === 'supplier') {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {itemsSupplier.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      );
    } else if (user === 'customer') {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {itemsCustomer.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      );
    } else {
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {items.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      );
    }
  }
}

export default SidebarNavItems;
