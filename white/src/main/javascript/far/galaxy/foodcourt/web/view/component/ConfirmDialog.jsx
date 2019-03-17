import React, {Component} from "react";

export default class ConfirmDialog extends Component {

    doYes = () => {
        const {yes, value} = this.props;
        yes && yes(value)
    };
    doNo = () => {
        const {no, value} = this.props;
        no && no(value)
    };

    render() {
        const {open, message} = this.props;
        return (
            <div>
                {
                    open
                        ?
                            <div>
                                <div>are you sure?</div>
                                {
                                    message
                                        ? <div>{message}</div>
                                        : null
                                }
                                <button onClick={this.doYes}>yes</button>
                                <button onClick={this.doNo}>no</button>
                            </div>
                        : null
                }
            </div>
        )
    }
}
