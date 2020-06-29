import React, {Component} from 'react';
import {Container, Row, Col} from 'shards-react';
import PageTitle from './../components/common/PageTitle';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Dashboard"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
      </Container>
    );
  }
}
