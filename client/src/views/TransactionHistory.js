import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import { Store } from "../flux";
import DataTable from "react-data-table-component";

export default class TransactionHistory extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [
        {
          name: "Supplier",
          selector: "supplierID",
          sortable: true,
          right: true
        },
        {
          name: "Name",
          selector: "productName",
          sortable: true,
          right: true
        },
        {
          name: "Price",
          selector: "productPrice",
          sortable: true,
          right: true
        },
        {
          name: "Quantity",
          selector: "productQuantity",
          sortable: true,
          right: true
        }
      ]
    };
  }
  componentDidMount() {
    this._isMounted = true;
    console.log("OK");
    const userToLoad = Store.getToLoad();
    let URL = "";
    let user = {};
    if (userToLoad === "customer") {
      if (this._isMounted) {
        const coloumn = [
          {
            name: "Customer",
            selector: "customerID",
            sortable: true
          },
          ...this.state.columns
        ];
        this.setState({ columns: coloumn });
      }
      URL = "http://localhost:5000/api/customer/getCustomerSupplierData";
      user = {
        secretUserName: Store.getUserSecret(),
        userName: Store.getUserName(),
        userMobile: Store.getUserMobile()
      };
      console.log("user", user);
      console.log("URL", URL);
      axios
        .post(URL, user)
        .then(responce => responce.data)
        .then(result => {
          console.log("result", result);
          if (this._isMounted === true) {
            this.setState({ data: result });
          }
        })
        .catch(err => console.log(err));
    } else if (userToLoad === "farmer") {
      if (this._isMounted) {
        const coloumn = [
          {
            name: "Farmer",
            selector: "farmerID",
            sortable: true
          },
          ...this.state.columns
        ];
        this.setState({ columns: coloumn });
      }
      URL = "http://localhost:5000/api/farmer/getFarmerSupplierData";
      user = {
        secretUserName: Store.getUserSecret(),
        userName: Store.getUserName(),
        userMobile: Store.getUserMobile()
      };
      console.log("user", user);
      console.log("URL", URL);
      axios
        .post(URL, user)
        .then(responce => responce.data)
        .then(result => {
          console.log("result", result);
          if (this._isMounted === true) {
            this.setState({ data: result });
          }
        })
        .catch(err => console.log(err));
    }
  }
  render() {
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
              <CardBody className="p-0 pb-3 text-center">
                <DataTable
                  columns={this.state.columns}
                  data={this.state.data}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>{" "}
      </Container>
    );
  }
}
