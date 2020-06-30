import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import {Store} from '../flux';
import DataTable, {createTheme} from 'react-data-table-component';

export default class TransactionHistorySupplier extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);

    this.state = {
      dataFarmer: [],
      dataCustomer: [],
      columnsFarmer: [
        {
          name: 'supplier',
          selector: 'supplierID',
          sortable: true,
          center: true,
        },
        {
          name: 'Farmer',
          selector: 'farmerID',
          sortable: true,
        },
        {
          name: 'Name',
          selector: 'productName',
          sortable: true,
          center: true,
        },
        {
          name: 'Price',
          selector: 'productPrice',
          sortable: true,
          center: true,
        },
        {
          name: 'Quantity',
          selector: 'productQuantity',
          sortable: true,
          center: true,
        },
      ],
      columnsCustomer: [
        {
          name: 'supplier',
          selector: 'supplierID',
          sortable: true,
          center: true,
        },
        {
          name: 'Customer',
          selector: 'customerID',
          sortable: true,
        },
        {
          name: 'Name',
          selector: 'productName',
          sortable: true,
          center: true,
        },
        {
          name: 'Price',
          selector: 'productPrice',
          sortable: true,
          center: true,
        },
        {
          name: 'Quantity',
          selector: 'productQuantity',
          sortable: true,
          center: true,
        },
      ],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    console.log('OK');
    let URL = '';
    let user = {};
    URL = 'http://localhost:5000/api/supplier/readSupplierCustomerData';
    user = {
      secretUserName: Store.getUserSecret(),
      userName: Store.getUserName(),
      userMobile: Store.getUserMobile(),
    };
    console.log('user', user);
    console.log('URL', URL);
    axios
      .post(URL, user)
      .then(responce => responce.data)
      .then(result => {
        console.log('result', result);
        if (this._isMounted === true) {
          this.setState({dataCustomer: result});
        }
      })
      .catch(err => console.log(err));

    URL = 'http://localhost:5000/api/supplier/readSupplierFarmerData';
    user = {
      secretUserName: Store.getUserSecret(),
      userName: Store.getUserName(),
      userMobile: Store.getUserMobile(),
    };
    console.log('user', user);
    console.log('URL', URL);
    axios
      .post(URL, user)
      .then(responce => responce.data)
      .then(result => {
        console.log('result', result);
        if (this._isMounted === true) {
          this.setState({dataFarmer: result});
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log('data', this.state.dataFarmer);
    console.log('data', this.state.dataCustomer);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Customer Supplier Data"
            subtitle="Transaction"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 text-center">
                <DataTable
                  columns={this.state.columnsCustomer}
                  data={this.state.dataCustomer}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>{' '}
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Farmer Supplier Data"
            subtitle="Transaction"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 text-center">
                <DataTable
                  columns={this.state.columnsFarmer}
                  data={this.state.dataFarmer}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>{' '}
      </Container>
    );
  }
}
