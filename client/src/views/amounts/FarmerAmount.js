import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
  Row,
  Col
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import axios from "axios";
import Constant from "../../Constant";
import { Store } from "../../flux";

export default class FarmerAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretUserName: Store.getUserSecret(),
      userName: Store.getUserName(),
      userMobile: Store.getUserMobile(),
      userAmount: 0
    };
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/farmer/addFarmerAmount", this.state)
      .then(responce => responce.status)
      .then(result => {
        if (result === 200) {
          alert("Transaction successful");
        } else {
          alert("Some error has occured");
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col className="col-6">
            <PageTitle
              title="Transaction Customer-Supplier"
              subtitle="Transaction"
              md="10"
              className="ml-sm-auto mr-sm-auto"
            />
          </Col>
        </Row>

        <Row>
          <Col lg="7">
            <Card small className="mb-4 pt-3">
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                  <img
                    className="rounded-circle"
                    src={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAA1VBMVEX////9z4WZVDtgotdkpdlXm9NSmNFnqNtbntVsqt1Plc/tvXdKk89qnMhvrd//14r9zHyWTjOUTTf/0n32x3+4jHuRSDSeWj7+79j/+vOSRieQQB3LlGGnaEbUn2jquXfCiVu1eVH90o7+5cD/9OT92qSiwuDx8/Xl7PPxzIzKwKfE1ONZpN/WxJ9vp9WdutWRt9t/q9Tt39fUuKvFo5m/mIvgzcW2hGuQPBOnbVmvfGrw6OSkZEqtc1fgrnH91pn+37K4wsvexpmpt7uftseyy+KJr8sSdecGAAAETklEQVR4nO2ZbVuiTBSAG0FRMUAkWdR8qwQXNKjWra11XxT+/096ZsB81JQZbA7Ph4f7uqoPwZy7c84cBru4KCgoKCgoKODOw+PTVcK3p6fHxWvO4a3F926309yh031+eXzIz2Dxs9ksfaDZab4s8hGwrrpHBDYWP/IoyOvbKYFYogufiFczzQAD7mCl5iABuCu/0w2aL6AGi2eqQanUgSyF9cZgAJuGxw6LQukZsBuYkkCwoQwYk4C74QpK4Sd9O7wDNSS7zAZQm8KiKujtdjtR+Aaj8NDdxNFPhDdHfUOOf9n8AaOwIN2om73+8Nos6XuUzOtRf2AghNRlrPAGqGDKKlKRMVj2e8PhiDDs9Zc4uqqiGHUUJwVG4QErtJebSCTYBrSH2ift0IRReMW90DYQjSWgAtkR7QFVATILFyZW6KsUA3Wkw/UCOSzoI1oS1GtiYMIYWIbJqqD3bkEUxupQ13ssCvo1QhAGNxpu9vaSSWGAtN/8DawxQgOdviOwQlIti7vCrYaQYbZlqsJIj1OlfeGu8CVRoI4m0jDkp3YDooAG1FYgA3qkAiqwMGj3gLJwy6pgmP1YgX8vkB3B6BB/1wCG0x2rQsKY/6Zkb4YkCfxbAXOXwUGDSEImB+0XjAF7S8JUIYGxJQE25JYbxlJAleGCeT7dwRngYwtTHQBbgbESGmAd8J5gUfgFacC0JyD3A4GhIcewBgxpgE4CQxqAO4FA2RQQ54QPpM4G2JnwjvUfl4GQdngBnUosDrk0QrqDnJ/Ciekg56lwc+zdUs5ZQT58uzTkfBXuSDzjUEDOZyokaHHErUQiIOfwiNqCd8Qm6g7ERwM9s+0y3nTfLpvJkFMpfmu76d8rCciHTB/ZeVYahiHjr70JCfYmtcWmvte1/kwcuPDuRIlaFAPUCiQlCCEscPy5WFOkKcVA+1tTFEWSfJfv/wpt1xcksrRSW1HS0FrH1ymKWJu4vOI7biBKyjvi39Rm0Gbe9tKapPAoiO0GtX/jk3Wj1KPbNKjtXi3VPlsQezLHBdhHXKeUQluLB5dLQvCZejjC4YIE77RDKzp2gxCcbzA/zMAmD9H0aD9o08g7foN/roIvSscRg6/og4SGvs5P3SCE5xm4wokFMV40a+2Vo9WaRd7p68XzerIqpiB44mo2bW2YzlaiJ6RdflYpwlQFDI45j9ar1Tqai0JafEL5nAExpyya/HVVz6vSwp+bBrcscKWSPQ0BXwOhmjkNTpWzglDNmoZ7znUQhPJ9RoVylTvlbAZuhb9CJdvj6h4iC9meVvUyAI0sU9ppQCjUszysfJAsVOYZFNxGvcKdeiNTPzpBo8E5fiPIOpvsEFs06vXPpgOvgNe59M87QNru/bxMFohVzoDcWakG+BD9mVO07bjhJKiWk/WyUK+XL/3Qdbi9VFm247huGE58P7hMIfD9SRi6rus4eX0OWlBQUFBQUFBQUPD/4h/n7o58nTWwSQAAAABJRU5ErkJggg=="
                    }
                    alt={"Some user"}
                    width="110"
                  />
                </div>
                <h4 className="mb-0">{this.state.id}</h4>
                <ListGroup flush>
                  <ListGroupItem className="p-2">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Enter amount to be deposit
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="userAmount"
                          value={this.state.userAmount}
                          onChange={this.handleInput}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
                <Row>
                  <Col md="3" />
                  <Col md="6">
                    <button
                      className="col-md-6 mt-3 btn btn-warning"
                      onClick={this.onSubmit}
                    >
                      Change User
                    </button>
                  </Col>
                  <Col md="3" />
                </Row>
              </CardHeader>
            </Card>
          </Col>
          <Col lg="6" />
        </Row>
      </Container>
    );
  }
}
