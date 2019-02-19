import React, {Component} from "react";

export default class Cake extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <div>{this.props.cake.getName()}</div>
            </div>
        )
    }
}
