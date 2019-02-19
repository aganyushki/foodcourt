import React, {Component} from "react";

export default class CustomerFullView extends Component {
    render() {
        const {customer} = this.props;

        return (
            <div>
                { `${customer.getId()}; ${customer.getName()}; ${customer.getEmail()}; ${customer.getBalance()}` }
            </div>
        )
    }
}
