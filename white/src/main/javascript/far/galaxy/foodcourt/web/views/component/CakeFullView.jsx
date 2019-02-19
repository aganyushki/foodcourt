import React, {Component} from "react";

export default class CakeFullView extends Component {
    render() {
        const {cake} = this.props;

        return (
            <div>
                { `${cake.getId()}; ${cake.getName()}; ${cake.getPrice()}` }
            </div>
        )
    }
}
