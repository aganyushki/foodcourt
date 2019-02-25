import React, {Component} from "react";
import {observer} from "mobx-react";
import {getOrderStore} from "../../store/OrderStore";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    wrapper: {
        width: '50%'
    }
});

class ShopOrderStepperItem extends Component {
    render() {
        const {title, completed} = this.props.step;
        return (
            <div>{title}; {completed.toString()}</div>
        )
    }
}

@observer
class ShopOrderStepper extends Component {
    render() {
        const order = getOrderStore().order;
        const {customer, cake, count} = order;

        const stepper = [
            {
                title: customer !== null ? customer.getName() : "Your name",
                completed: customer !== null,
            },
            {
                title: cake !== null ? cake.getName() : "Cake",
                completed: cake !== null,
            },
            {
                title: count > 0 ? count : "Count",
                completed: count > 0,
            },
            {
                title: "Complete",
                completed: false,
            }
        ];

        const activeStep = stepper.filter(item => item.completed).length;

        return (
            <Stepper activeStep={activeStep} className={this.props.classes.wrapper}>
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

ShopOrderStepper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrderStepper);
