import React, { Component } from "react";

export default class BaseTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return "Base of tranaction";
    }
}
