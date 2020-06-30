import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import {Store} from '../flux';

export default class History extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {data: []};
  }
  componentDidMount() {
    this._isMounted = true;
    console.log('OK');
    const userToLoad = Store.getToLoad();
    let URL = '';
    let user = {};
    if (userToLoad === 'customer') {
      URL = 'http://localhost:5000/api/customer/getUserHistory';
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
            this.setState({data: result.data});
          }
        })
        .catch(err => console.log(err));
    } else if (userToLoad === 'farmer') {
      URL = 'http://localhost:5000/api/farmer/readFarmerHistory';
      user = {
        secretFarmerName: Store.getUserSecret(),
        farmerName: Store.getUserName(),
        farmerMobile: Store.getUserMobile(),
      };
      console.log('user', user);
      console.log('URL', URL);
      axios
        .post(URL, user)
        .then(responce => responce.data)
        .then(result => {
          console.log('result', result);
          if (this._isMounted === true) {
            this.setState({data: result});
          }
        })
        .catch(err => console.log(err));
    } else if (userToLoad === 'supplier') {
      URL = 'http://localhost:5000/api/supplier/readSupplierHistory';
      user = {
        secretSupplierName: Store.getUserSecret(),
        supplierName: Store.getUserName(),
        supplierMobile: Store.getUserMobile(),
      };
      console.log('user', user);
      console.log('URL', URL);
      axios
        .post(URL, user)
        .then(responce => responce.data)
        .then(result => {
          console.log('result', result);
          if (this._isMounted === true) {
            this.setState({data: result});
          }
        })
        .catch(err => console.log(err));
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const DATA = this.state.data.map((data, index) => {
      const {unsigned} = data.Timestamp.seconds;
      console.log(unsigned);
      return (
        <tr key={data.TxId}>
          <td>{index + 1}</td>
          <td>{data.TxId}</td>
          <td>{data.Timestamp.nanos}</td>
          <td>{unsigned.toString()}</td>
          <td>{data.IsDelete}</td>
        </tr>
      );
    });
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Post"
            subtitle="Blog Posts"
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
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Transaction ID
                      </th>
                      <th scope="col" className="border-0">
                        Nanos
                      </th>
                      <th scope="col" className="border-0">
                        Signed
                      </th>
                      <th scope="col" className="border-0">
                        Is Deleted
                      </th>
                    </tr>
                  </thead>
                  <tbody>{DATA}</tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>{' '}
      </Container>
    );
  }
}
