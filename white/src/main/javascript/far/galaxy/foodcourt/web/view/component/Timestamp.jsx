import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {TimestampStyles} from "./TimestampStyle";

class Timestamp extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        value: PropTypes.string.isRequired
    };

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    render() {
        const {value, classes} = this.props;
        const date = new Date(value);
        return (
            <span>{
                this.isToday(date)
                    ? date.toLocaleTimeString()
                    : date.toLocaleString()
            }</span>
        )
    }
}

export default withStyles(TimestampStyles)(Timestamp);
