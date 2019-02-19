import React, {Component} from "react";

export default class ConfirmDialog extends Component {

    doYes() {
        this.props.yes && this.props.yes(this.props.value)
    }
    doNo() {
        this.props.no && this.props.no(this.props.value)
    }

    render() {
        return (
            <div>
                {
                    this.props.open
                        ?
                            <div>
                                <div>are you sure?</div>
                                {
                                    this.props.message
                                        ? <div>{this.props.message}</div>
                                        : null
                                }
                                <button onClick={this.doYes.bind(this)}>yes</button>
                                <button onClick={this.doNo.bind(this)}>no</button>
                            </div>
                        : null
                }
            </div>
        )
    }
}
