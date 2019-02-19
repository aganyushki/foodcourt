import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../store/OrderStore";

class ShopOrderStepperItem extends Component {
    render() {
        const {title, completed} = this.props.step;
        return (
            <div>{title}; {completed.toString()}</div>
        )
    }
}

@observer
export default class ShopOrderStepper extends Component {
    render() {
        const order = getOrderStore().order;

        const stepper = [
            {
                title: "Please input your name",
                completed: order.customer !== null,
            },
            {
                title: "Please choose cake",
                completed: order.cake !== null,
            },
            {
                title: "How many <cakes> do you need?",
                completed: order.count > 0,
            },
            {
                title: "Complete and approve you order",
                completed: false,
            }
        ];

        const activeStep = stepper.filter(item => item.completed).length;

        return (
            <div>
                <div><b>active step: {activeStep}</b></div>
                {
                    stepper
                        .map(stepItem => <ShopOrderStepperItem key={stepItem.title} step={stepItem} />)
                }
            </div>
        )
    }
}
