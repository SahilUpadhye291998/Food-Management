import React, { Component } from "react";

import { Link } from "react-router-dom";
import Constant from "../Constant";
import axios from "axios";
import "./css/Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            mobile: "",
            password: "",
            user: "admin"
        };
    }
    componentDidMount() {}

    inputHandle = event => {
        console.log("OK");
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    onSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <div className="row d-flex align-items-center justify-content-center h-100 w-100 vertical-center">
                <div className="col-3 col-sm-0" />
                <div className="col-6 col-sm-0">
                    <div className="card p-2">
                        <div className="row d-flex justify-content-center">
                            <img
                                src="https://thrivinggatwork.files.wordpress.com/2019/08/190828_logo_hell-und-dunkelgrc3bcn.png"
                                alt="com logo"
                                height="200"
                                width="200"
                            />
                        </div>
                        <form method="POST">
                            <div className="form-group ml-2 mr-2">
                                <label htmlFor="userName" className="ml-2">
                                    Email address
                                </label>
                                <input
                                    type="userName"
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    onChange={this.inputHandle}
                                    placeholder="Enter userName"
                                />
                            </div>
                            <div className="form-group ml-2 mr-2">
                                <label htmlFor="userName" className="ml-2">
                                    Mobile Number
                                </label>
                                <input
                                    type="mobile"
                                    className="form-control"
                                    id="mobile"
                                    name="mobile"
                                    onChange={this.inputHandle}
                                    placeholder="Enter Mobile number"
                                />
                            </div>
                            <div className="form-group ml-2 mr-2">
                                <label htmlFor="password" className="ml-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={this.inputHandle}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group ml-2 mr-2">
                                <label
                                    htmlFor="exampleFormControlSelect1"
                                    className="ml-2"
                                >
                                    Select User Type
                                </label>
                                <select
                                    name="user"
                                    className="form-control"
                                    onChange={this.inputHandle}
                                    id="exampleFormControlSelect1"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="supplier">Supplier</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    onClick={this.onSubmit}
                                    className="m-2 d-flex justify-content-center btn btn-primary mb-3"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <Link
                            to="/register"
                            className="m-2 d-flex justify-content-center"
                        >
                            Not Registered! Please register
                        </Link>
                    </div>
                </div>
                <div className="col-3 col-sm-0" />
            </div>
        );
    }
}
