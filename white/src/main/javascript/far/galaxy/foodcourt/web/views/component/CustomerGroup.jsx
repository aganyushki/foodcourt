import React, {Component} from "react";

export default class CustomerGroup extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <div>{this.props.group.getTitle()}</div>
            </div>
        )
    }
}
