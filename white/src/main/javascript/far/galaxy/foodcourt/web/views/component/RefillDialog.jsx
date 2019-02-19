import React, {Component} from "react";

export default class RefillDialog extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    doYes() {
        this.props.yes && this.props.yes(this.props.customer, this.inputRef.current.value)
    }
    doNo() {
        this.props.no && this.props.no(this.props.customer)
    }

    render() {
        return (
            <div>
                {
                    this.props.open
                        ?
                            <div>
                                <div>
                                    Customer:
                                    <div>{this.props.customer.getName()}</div>
                                </div>

                                <div>
                                    <input type="text" ref={this.inputRef} defaultValue={0} />
                                </div>

                                <button onClick={this.doYes.bind(this)}>yes</button>
                                <button onClick={this.doNo.bind(this)}>no</button>
                            </div>
                        : null
                }
            </div>
        )
    }
}
