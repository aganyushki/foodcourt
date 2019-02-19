import React, {Component} from "react";

export default class Cake extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <div>#{this.props.cake.getId()}; {this.props.cake.getName()}; {this.props.cake.getPrice()}</div>
            </div>
        )
    }
}
