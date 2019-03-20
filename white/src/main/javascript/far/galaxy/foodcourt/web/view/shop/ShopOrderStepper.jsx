import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {ShopOrderStepperStyles} from "./Style";
import Text from "../component/Text";

@inject("orderStore")
@observer
class ShopOrderStepper extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        orderStore: PropTypes.object.isRequired,
    };

    stepperData = (order) => {
        return [
            {
                title: order.customer !== null ? order.customer.getName() : <Text>STEPPER_STAGE_1</Text>,
                completed: order.customer !== null,
            },
            {
                title: order.cake !== null ? order.cake.getName() : <Text>STEPPER_STAGE_2</Text>,
                completed: order.cake !== null,
            },
            {
                title: order.count > 0 ? order.count : <Text>STEPPER_STAGE_3</Text>,
                completed: order.count > 0,
            },
            {
                title: <Text>STEPPER_STAGE_4</Text>,
                completed: false,
            }
        ];
    };
    render() {
        const {orderStore, classes} = this.props;
        const stepper = this.stepperData(orderStore.order);
        const activeStep = stepper.filter(item => item.completed).length;
        return (
            <Stepper activeStep={activeStep} className={classes.wrapper}>
                {
                    stepper.map(step => {
                        return (
                            <Step key={step.title} completed={step.completed}>
                                <StepLabel>{step.title}</StepLabel>
                            </Step>
                        );
                    })
                }
            </Stepper>
        )
    }
}

export default withStyles(ShopOrderStepperStyles)(ShopOrderStepper);
