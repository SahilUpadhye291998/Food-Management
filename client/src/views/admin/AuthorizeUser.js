import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'shards-react';

import PageTitle from '../../components/common/PageTitle';
import Constant from '../../Constant';
import axios from 'axios';

export default class AuthorizeUser extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {data: []};
  }
  addToNetwork = (_id, data) => {
    console.log('Add to blockchain network');
    if (data.typeOf === 'supplier') {
      console.log('Supplier will be registered here');
      const userToBeRegistered = {
        secretSupplierName: data.customerSecret,
        orgName: 'org2',
      };
      axios
        .post(
          'http://localhost:5000/api/supplier/registerSupplier',
          userToBeRegistered,
        )
        .then(responce => responce.status)
        .then(result => {
          if (result === 200) {
            const userToBeSignup = {
              secretSupplierName: data.customerSecret,
              supplierName: data.name,
              supplierMobile: data.mobileNum,
              supplierAddress: data.address,
              supplierSecret: data.secret,
              supplierAmount: '100000',
            };
            axios
              .post('http://localhost:5000/api/supplier/signup', userToBeSignup)
              .then(responce => responce.status)
              .then(result => {
                if (result === 200) {
                  alert('Signup successful');
                  this.deleteFromTable(data._id);
                } else {
                  alert('Signup not successful');
                }
              });
          }
        })
        .catch(err => console.log(err));
    } else if (data.typeOf === 'customer') {
      console.log('Customer will be registered here');
      const userToBeRegistered = {
        secretUsername: data.customerSecret,
        orgName: 'org1',
      };
      axios
        .post(
          'http://localhost:5000/api/customer/registerUser',
          userToBeRegistered,
        )
        .then(responce => responce.status)
        .then(result => {
          if (result === 200) {
            const userToBeSignup = {
              secretUsername: data.customerSecret,
              userName: data.name,
              userMobile: data.mobileNum,
              userAddress: data.address,
              userSecret: data.secret,
              userAmount: '100000',
            };
            axios
              .post('http://localhost:5000/api/customer/signup', userToBeSignup)
              .then(responce => responce.status)
              .then(result => {
                if (result === 200) {
                  alert('Signup successful');
                  this.deleteFromTable(data._id);
                } else {
                  alert('Signup not successful');
                }
              });
          }
        })
        .catch(err => console.log(err));
    } else if (data.typeOf === 'farmer') {
      console.log('Farmer will be registered here');
      const userToBeRegistered = {
        secretFarmerName: data.customerSecret,
        orgName: 'org3',
      };
      axios
        .post(
          'http://localhost:5000/api/farmer/registerFarmer',
          userToBeRegistered,
        )
        .then(responce => responce.status)
        .then(result => {
          if (result === 200) {
            const userToBeSignup = {
              secretFarmerName: data.customerSecret,
              farmerName: data.name,
              farmerMobile: data.mobileNum,
              farmerAddress: data.address,
              farmerSecret: data.secret,
              farmerAmount: '100000',
            };
            axios
              .post('http://localhost:5000/api/farmer/signup', userToBeSignup)
              .then(responce => responce.status)
              .then(result => {
                if (result === 200) {
                  alert('Signup successful');
                  this.deleteFromTable(data._id);
                } else {
                  alert('Signup not successful');
                }
              });
          }
        })
        .catch(err => console.log(err));
    }
  };
  deleteFromTable = _id => {
    console.log('Delete from Database');
    axios
      .delete(`http://localhost:8000/api/user/delete/${_id}`)
      .then(responce => responce.data)
      .then(result => {
        if (result.message === 'Record deleted Successfully') {
          alert('Record Deleted successfully');
          this.getRecords();
        } else {
          alert('Some error has occured');
        }
      })
      .catch(err => console.log(err));
  };
  getRecords = () => {
    axios
      .get(`${Constant.getAuthAdminAPI()}/getAll`)
      .then(responce => responce.data)
      .then(data => {
        if (this._isMounted) {
          this.setState({data: data});
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this._isMounted = true;
    this.getRecords();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const DATA = this.state.data.map((data, index) => {
      return (
        <tr key={data._id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.address}</td>
          <td>{data.mobileNum}</td>
          <td>{data.typeOf}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => {
                this.addToNetwork(data._id, data);
              }}>
              Add To Network
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteFromTable(data._id)}>
              Delete Record
            </button>
          </td>
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
                <table className="table mb-0 text-center">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Name
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Mobile Num
                      </th>
                      <th scope="col" className="border-0">
                        Type of user
                      </th>
                      <th scope="col" className="border-0">
                        Update
                      </th>
                      <th scope="col" className="border-0">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">{DATA}</tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>{' '}
      </Container>
    );
  }
}
