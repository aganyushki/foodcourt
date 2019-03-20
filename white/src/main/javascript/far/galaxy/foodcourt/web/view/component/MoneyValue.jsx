import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {MoneyValueStyles} from "./MoneyValueStyle";
import {CURRENCY_MARKER} from "../../Constants";

class MoneyValue extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        value: PropTypes.number.isRequired
    };

    render() {
        const {value, classes} = this.props;
        const valueClass = value >= 0 ? classes.positiveValue : classes.negativeValue;
        return (
            <span className={valueClass}>{value} {CURRENCY_MARKER}</span>
        )
    }
}

export default withStyles(MoneyValueStyles)(MoneyValue);
