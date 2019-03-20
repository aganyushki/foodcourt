import React, {Component} from 'react';
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core";
import {ManagerEntityEditorCtrlStyles} from "./ManagerEntityEditorCtrlStyle";
import PropTypes from "prop-types";

class ManagerEntityEditorCtrl extends Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        open: PropTypes.bool.isRequired,
    };

    render() {
        const {classes, children, open} = this.props;
        return (
            <Drawer
                open={open}
                anchor="right"
                classes={classes}
            >
                {children}
            </Drawer>
        )
    }
}

export default withStyles(ManagerEntityEditorCtrlStyles)(ManagerEntityEditorCtrl);
