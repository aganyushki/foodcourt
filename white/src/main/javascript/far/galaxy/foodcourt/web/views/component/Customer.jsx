import React, {Component} from "react";

export default class Customer extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <div>{this.props.customer.getName()}</div>
            </div>
        )
    }
}
