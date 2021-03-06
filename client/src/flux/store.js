import {EventEmitter} from 'events';

import Dispatcher from './dispatcher';
import Constants from './constants';
import getSidebarNavItems from '../data/sidebar-nav-items';
import getSidebarNavAdmin from '../data/sidebar-nav-admin';
import getSidebarNavCustomer from '../data/sidebar-nav-customer';
import getSidebarNavFarmer from '../data/sidebar-nav-farmer';
import getSidebarNavSupplier from '../data/sidebar-nav-supplier';

let _store = {
  menuVisible: false,
  toLoad: 'admin-default',
  userSecret: '',
  userName: '',
  userMobile: '',
  navItemsAdmin: getSidebarNavAdmin(),
  navItemsCustomer: getSidebarNavCustomer(),
  navItemsFarmer: getSidebarNavFarmer(),
  navItemsSupplier: getSidebarNavSupplier(),
  navItems: getSidebarNavItems(),
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({actionType, payload}) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.USER:
        _store.toLoad = payload;
        break;
      case Constants.STORE:
        _store.userSecret = payload.secretUsername;
        _store.userName = payload.userName;
        _store.userMobile = payload.userMobile;
        console.log(_store);
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getSidebarAdmin() {
    return _store.navItemsAdmin;
  }

  getSidebarSuppler() {
    return _store.navItemsSupplier;
  }

  getSidebarNavCustomer() {
    return _store.navItemsCustomer;
  }

  getSidebarNavFarmer() {
    return _store.navItemsFarmer;
  }

  getToLoad() {
    return _store.toLoad;
  }
  getUserSecret() {
    return _store.userSecret;
  }
  getUserName() {
    return _store.userName;
  }
  getUserMobile() {
    return _store.userMobile;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
