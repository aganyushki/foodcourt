import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {ProcessingCoverStyles} from "./ProcessingCoverStyle";
import PropTypes from "prop-types";

class ProcessingCover extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.progressWrapper}>
            </div>
        )
    }
}

export default withStyles(ProcessingCoverStyles)(ProcessingCover);
