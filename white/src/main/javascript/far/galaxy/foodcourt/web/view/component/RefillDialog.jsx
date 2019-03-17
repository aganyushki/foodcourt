import React, {Component} from "react";

export default class RefillDialog extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    doYes = () => {
        const {yes, customer} = this.props;
        yes && yes(customer, this.inputRef.current.value)
    };
    doNo = () => {
        const {no, customer} = this.props;
        no && no(customer)
    };

    render() {
        const {open, customer} = this.props;
        return (
            <div>
                {
                    open
                        ?
                            <div>
                                <div>
                                    Customer:
                                    <div>{customer.getName()}</div>
                                </div>

                                <div>
                                    <input type="text" ref={this.inputRef} defaultValue={0} />
                                </div>

                                <button onClick={this.doYes}>yes</button>
                                <button onClick={this.doNo}>no</button>
                            </div>
                        : null
                }
            </div>
        )
    }
}
