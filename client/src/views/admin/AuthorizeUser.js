import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'shards-react';

import PageTitle from '../../components/common/PageTitle';

export default class AuthorizeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Authorize User"
            subtitle="User"
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
                        First Name
                      </th>
                      <th scope="col" className="border-0">
                        Last Name
                      </th>
                      <th scope="col" className="border-0">
                        City
                      </th>
                      <th scope="col" className="border-0">
                        Phone
                      </th>
                      <th scope="col" className="border-0">
                        Authorize
                      </th>
                      <th scope="col" className="border-0">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ali</td>
                      <td>Kerry</td>
                      <td>Gdańsk</td>
                      <td>107-0339</td>
                      <td>
                        <button className="btn btn-warning">Auth</button>
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Clark</td>
                      <td>Angela</td>
                      <td>Borghetto di Vara</td>
                      <td>1-660-850-1647</td>
                      <td>
                        <button className="btn btn-warning">Auth</button>
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Jerry</td>
                      <td>Nathan</td>
                      <td>Braunau am Inn</td>
                      <td>214-4225</td>
                      <td>
                        <button className="btn btn-warning">Auth</button>
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Colt</td>
                      <td>Angela</td>
                      <td>Bad Hersfeld</td>
                      <td>1-848-473-7416</td>
                      <td>
                        <button className="btn btn-warning">Auth</button>
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
